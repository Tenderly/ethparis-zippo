package truffle

import (
	"encoding/json"
	"fmt"
	"os/exec"
	"path/filepath"
)

type NetworkConfig struct {
	Host      string `json:"host"`
	Port      int    `json:"port"`
	NetworkID string `json:"network_id"`
}

type Config struct {
	ProjectDirectory string                   `json:"project_directory"`
	BuildDirectory   string                   `json:"contracts_build_directory"`
	Networks         map[string]NetworkConfig `json:"networks"`
}

func GetTruffleConfig(projectDir string) (*Config, error) {
	trufflePath := filepath.Join(projectDir, "truffle-config.js")
	data, err := exec.Command("node", "-e", fmt.Sprintf(`
		var config = require('%s');

		console.log(JSON.stringify(config));
	`, trufflePath)).CombinedOutput()
	if err != nil {
		return nil, fmt.Errorf("cannot find truffle-config.js, tried path: %s", trufflePath)
	}

	var truffleConfig Config
	err = json.Unmarshal(data, &truffleConfig)
	if err != nil {
		return nil, fmt.Errorf("cannot read truffle-config.js")
	}

	if truffleConfig.BuildDirectory == "" {
		truffleConfig.BuildDirectory = "./build/contracts"
	}

	truffleConfig.ProjectDirectory = projectDir

	return &truffleConfig, nil
}

func (c *Config) AbsoluteBuildDirectoryPath() string {
	if c.BuildDirectory == "" {
		c.BuildDirectory = filepath.Join(".", "build", "contracts")
	}

	switch c.BuildDirectory[0] {
	case '.':
		return filepath.Join(c.ProjectDirectory, c.BuildDirectory)
	default:
		return c.BuildDirectory
	}

}
