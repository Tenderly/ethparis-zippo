package main

import (
	"encoding/json"
	"fmt"
	"github.com/fsnotify/fsnotify"
	"github.com/gorilla/mux"
	"github.com/tenderly/solidity-hmr/etherscan"
	"github.com/tenderly/solidity-hmr/truffle"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

var config *truffle.Config

const (
	port         = 8080
	frontendPort = 9476
	networkID    = "1337"
)

func main() {
	root, err := os.Getwd()
	if err != nil {
		panic("unable to get project root")
	}

	configInit()
	config, err = truffle.GetTruffleConfig(filepath.Join(root, "../../solidity"))
	if err != nil {
		panic(fmt.Sprintf("unable to find truffle config: %s", err))
	}

	//buildFrontend() // it's hackathon, build folder is commited :)
	go serverFrontend()
	//open.Start("http://127.0.0.1:3000")
	go initializeWatcher()

	r := mux.NewRouter()
	r.HandleFunc("/ws", serveWs)

	fmt.Println(fmt.Sprintf("starting server on port %d", port))
	address := fmt.Sprintf(":%v", port)
	panic(http.ListenAndServe(address, r))
}

func buildFrontend() {
	cmd := exec.Command("yarn", "build")
	cmd.Dir = filepath.Join(config.ProjectDirectory, "../ui")
	fmt.Println("building frontend...")
	err := cmd.Run()

	if err != nil {
		panic("unable to run frontend")
	}
	fmt.Println("finished building frontend")
}

func serverFrontend() {
	http.Handle("/", http.FileServer(http.Dir(filepath.Join(config.ProjectDirectory, "../ui/build"))))
	fmt.Println(fmt.Sprintf("starting server on port %d", frontendPort))
	panic(http.ListenAndServe(fmt.Sprintf(":%d", frontendPort), nil))
}

func initializeWatcher() {
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		panic(fmt.Sprintf("unable to initiate file watcher: %s", err))
	}

	err = watcher.Add(filepath.Join(config.ProjectDirectory, "contracts"))
	if err != nil {
		panic(fmt.Sprintf("unable to add truffle build directory to watcher: %s", err))
	}

	for {
		select {
		case event := <-watcher.Events:
			{
				if event.Op != fsnotify.Write {
					continue
				}

				configInit()
				contractsConfig := GetConfig()

				var changedContracts []*DeploymentInformation
				changedContracts = append(changedContracts, contractsConfig[strings.ToLower(event.Name[strings.LastIndex(event.Name, "/")+1:len(event.Name)-4])])
				var otherNetworkContracts []*DeploymentInformation

				for k, contract := range contractsConfig {
					if contract.NetworkID != "1337" {

						conf := etherscan.NewConfig(contract.NetworkID)

						contractSource := etherscan.GetContract(contract.Address, conf)

						contract.Code = "0x" + contractSource.Bytecode
						contractsConfig[k] = contract

						otherNetworkContract := &DeploymentInformation{
							Name:      contractSource.Name,
							NetworkID: contract.NetworkID,
							Address:   contract.Address,
						}
						changedContracts = append(changedContracts, otherNetworkContract)
						otherNetworkContracts = append(otherNetworkContracts, otherNetworkContract)

						ioutil.WriteFile(filepath.Join(config.ProjectDirectory, "changedContracts", contractSource.Name+".sol"), []byte(contractSource.Source), 0644)
					}
				}

				if server != nil && server.conn != nil {
					data, _ := json.Marshal(NewCompile(changedContracts))
					server.send <- data
				}

				SaveConfig(contractsConfig)

				cmd := exec.Command("truffle", "migrate --reset")
				cmd.Dir = filepath.Join(config.ProjectDirectory)
				err := cmd.Run()

				if err != nil {
					fmt.Println(fmt.Sprintf("compile failed: %s", err))

					if server.conn != nil {
						data, _ := json.Marshal(NewCompileFailed(err))

						server.send <- data
					}
				} else {
					fmt.Println("compile successful")

					if server != nil && server.conn != nil {
						contracts, _ := truffle.GetTruffleContracts(filepath.Join(config.ProjectDirectory, config.BuildDirectory), networkID)

						for _, contract := range contracts {
							contractsConfig[strings.ToLower(contract.Name)] = &DeploymentInformation{
								NetworkID: networkID,
								Address:   contract.Networks[networkID].Address,
								Name:      contract.Name,
								Code:      "",
							}
						}

						for _, contract := range otherNetworkContracts {
							contractsConfig[strings.ToLower(contract.Name)] = &DeploymentInformation{
								NetworkID: networkID,
								Address:   contract.Address,
								Name:      contract.Name,
								Code:      contract.Code,
							}
						}

						SaveConfig(contractsConfig)

						contractsJson, _ := json.Marshal(contracts)

						data, _ := json.Marshal(NewNewVersion(contractsJson))

						server.send <- data
					}
				}

			}
		case err := <-watcher.Errors:
			{
				if server.conn != nil {
					data, _ := json.Marshal(NewServerError(err))

					server.send <- data
				}

				panic(fmt.Sprintf("watcher crashed: %s", err))
			}
		}
	}
}
