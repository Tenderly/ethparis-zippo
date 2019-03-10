package main

import (
	"encoding/json"
	"time"
)

type InitialMessage struct {
	Level       string          `json:"level"`
	Time        time.Time       `json:"time"`
	Type        string          `json:"type"`
	Ok          bool            `json:"ok"`
	NetworkName string          `json:"network_name"`
	NetworkId   string          `json:"network_id"`
	NetworkUrl  string          `json:"network_url"`
	Data        json.RawMessage `json:"data"`
}

func NewInitialMessage(ok bool, data ...json.RawMessage) InitialMessage {
	return InitialMessage{
		Level:       "info",
		Time:        time.Now(),
		Type:        "initial_message",
		Ok:          ok,
		Data:        data[0],
		NetworkName: "Geth/v1.9.0-unstable/darwin-amd64/go1.11.5",
		NetworkId:   "1337",
		NetworkUrl:  "127.0.0.1:8545",
	}
}

type Compile struct {
	Type string `json:"type"`
	Contracts []DeploymentInformation `json:"contracts"`
}

func NewCompile(deploymentInformation []*DeploymentInformation) Compile {
	var contracts []DeploymentInformation
	for _, v := range deploymentInformation{
		contracts = append(contracts, *v)
	}
	return Compile{
		Type: "compiling",
		Contracts: contracts,
	}
}

type NewVersion struct {
	Level string          `json:"level"`
	Time  time.Time       `json:"time"`
	Type  string          `json:"type"`
	Data  json.RawMessage `json:"data"`
}

func NewNewVersion(data json.RawMessage) NewVersion {
	return NewVersion{
		Level: "info",
		Time:  time.Now(),
		Type:  "new_version",
		Data:  data,
	}
}

type CompileFailed struct {
	Level string    `json:"level"`
	Time  time.Time `json:"time"`
	Type  string    `json:"type"`
	Err   string    `json:"err"`
}

func NewCompileFailed(err error) CompileFailed {
	return CompileFailed{
		Level: "error",
		Time:  time.Now(),
		Type:  "compile_failed",
		Err:   err.Error(),
	}
}

type ServerError struct {
	Level string    `json:"level"`
	Time  time.Time `json:"time"`
	Type  string    `json:"type"`
	Err   string    `json:"err"`
}

func NewServerError(err error) ServerError {
	return ServerError{
		Level: "error",
		Time:  time.Now(),
		Type:  "server_error",
		Err:   err.Error(),
	}
}
