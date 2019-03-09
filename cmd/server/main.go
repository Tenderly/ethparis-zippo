package main

import (
	"encoding/json"
	"fmt"
	"github.com/fsnotify/fsnotify"
	"github.com/gorilla/mux"
	"github.com/tenderly/solidity-hmr/etherscan"
	"github.com/tenderly/solidity-hmr/truffle"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
)

var config *truffle.Config

const (
	port      = 8080
	networkID = "1337"
)


func main() {
	root, err := os.Getwd()
	if err != nil {
		panic("unable to get project root")
	}

	configInit()
	config, err = truffle.GetTruffleConfig(filepath.Join(root, "solidity"))
	if err != nil {
		panic(fmt.Sprintf("unable to find truffle config: %s", err))
	}

	go initializeWatcher()

	r := mux.NewRouter()
	r.HandleFunc("/ws", serveWs)

	fmt.Println(fmt.Sprintf("starting server on port %d", port))
	address := fmt.Sprintf(":%v", port)
	panic(http.ListenAndServe(address, r))
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

				for k, contract := range contractsConfig {
					if contract.NetworkID != "1337" {

						conf := etherscan.NewConfig(contract.NetworkID)

						bytecode := etherscan.GetContract(contract.Address, conf)

						contract.Code = "0x" + bytecode
						contractsConfig[k] = contract
					}
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
							contractsConfig[contract.Name] = &DeploymentInformation{
								NetworkID: networkID,
								Address:   contract.Networks[networkID].Address,
								Local:     true,
								Code:      "",
							}
						}

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
