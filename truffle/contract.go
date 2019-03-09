package truffle

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"path/filepath"
	"strings"
	"time"
)

type Contract struct {
	Name              string                     `json:"contractName"`
	Abi               interface{}                `json:"abi"`
	Bytecode          string                     `json:"bytecode"`
	DeployedBytecode  string                     `json:"deployedBytecode"`
	SourceMap         string                     `json:"sourceMap"`
	DeployedSourceMap string                     `json:"deployedSourceMap"`
	Source            string                     `json:"source"`
	SourcePath        string                     `json:"sourcePath"`
	Ast               interface{}                `json:"legacyAST"`
	Compiler          ContractCompiler           `json:"compiler"`
	Networks          map[string]ContractNetwork `json:"networks"`

	SchemaVersion string    `json:"schemaVersion"`
	UpdatedAt     time.Time `json:"updatedAt"`
}

type ContractCompiler struct {
	Name    string `json:"name"`
	Version string `json:"version"`
}

type ContractNetwork struct {
	Events          interface{} `json:"events"`
	Links           interface{} `json:"links"`
	Address         string      `json:"address"`
	TransactionHash string      `json:"transactionHash"`
}

func GetTruffleContracts(buildDir string, networkId string) (map[string]*Contract, error) {
	files, err := ioutil.ReadDir(buildDir)
	if err != nil {
		return nil, fmt.Errorf("failed listing truffle build files: %s", err)
	}

	var contracts []*Contract
	for _, file := range files {
		if file.IsDir() || !strings.HasSuffix(file.Name(), ".json") {
			continue
		}

		data, err := ioutil.ReadFile(filepath.Join(buildDir, file.Name()))
		if err != nil {
			return nil, fmt.Errorf("failed reading truffle build files: %s", err)
		}

		var contract Contract
		err = json.Unmarshal(data, &contract)
		if err != nil {
			return nil, fmt.Errorf("failed parsing truffle build files: %s", err)
		}

		contracts = append(contracts, &contract)
	}

	mappedContracts := make(map[string]*Contract)
	for _, truffleContract := range contracts {
		network, ok := truffleContract.Networks[networkId]
		if !ok {
			continue
		}

		mappedContracts[strings.ToLower(network.Address)] = truffleContract
	}

	return mappedContracts, nil
}