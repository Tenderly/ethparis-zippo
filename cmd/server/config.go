package main

import (
	"fmt"
	"github.com/spf13/viper"
)

const (
	Contracts = "Contracts"
)

type DeploymentInformation struct {
	Name      string `json:"name" yaml:"name"`
	NetworkID string `json:"network_id" yaml:"network_id"`
	Address   string `json:"address" yaml:"address"`
	Code      string `json:"code" yaml:"code"`
}

var defaults = map[string]interface{}{
	Contracts: make(map[string]DeploymentInformation),
}

var configName string
var configPaths = []string{
	"solidity",
}

func init() {
	//flag.StringVar(&configName, "config", "config", "Configuration file name (without the extension)")
}

func configInit() {
	viper.SetConfigName("zippo")
	for _, path := range configPaths {
		viper.AddConfigPath(path)
	}

	for k, v := range defaults {
		viper.SetDefault(k, v)
	}

	err := viper.ReadInConfig()
	if err != nil {
		panic(fmt.Errorf("Fatal error config file: %s \n", err))
	}
}

func SaveConfig(contracts map[string]*DeploymentInformation) {
	viper.Set("contracts", contracts)
	viper.WriteConfig()
}

func GetConfig() map[string]*DeploymentInformation {
	key := "contracts"
	check(key)

	stringMap := viper.GetStringMap(key)

	deploymentInformations := make(map[string]*DeploymentInformation)
	for k, v := range stringMap {
		values := v.(map[string]interface{})
		deploymentInformations[k] = &DeploymentInformation{}
		if value, ok := values["network_id"]; ok {
			deploymentInformations[k].NetworkID = value.(string)
		}
		if value, ok := values["code"]; ok {
			deploymentInformations[k].Code = value.(string)
		}
		if value, ok := values["address"]; ok {
			deploymentInformations[k].Address = value.(string)
		}
		if value, ok := values["name"]; ok {
			deploymentInformations[k].Name = value.(string)
		}
	}

	return deploymentInformations
}

func check(key string) {
	if !viper.IsSet(key) {
		panic(fmt.Errorf("missing config for key %s", key))
	}
}
