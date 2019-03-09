package main

import (
	"fmt"
	"github.com/fsnotify/fsnotify"
	"github.com/gorilla/mux"
	"github.com/tenderly/solidity-hmr/truffle"
	"net/http"
	"os"
	"path/filepath"
)

var config *truffle.Config
func main() {
	root, err := os.Getwd()
	if err != nil {
		panic("unable to get project root")
	}

	config, err = truffle.GetTruffleConfig(filepath.Join(root, "solidity"))
	if err != nil {
		panic(fmt.Sprintf("unable to find truffle config: %s", err))
	}

	initializeWatcher()

	port := 8080
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
}