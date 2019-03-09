package etherscan

import (
	"fmt"
)

const (
	mainnetBaseUrl = "https://etherscan.io"
	ropstenBaseUrl = "https://ropsten.etherscan.io"
	rinkebyBaseUrl = "https://rinkeby.etherscan.io"
	kovanBaseUrl   = "https://kovan.etherscan.io"
)

var netMap = map[string]string{
	"1":  mainnetBaseUrl,
	"3":  ropstenBaseUrl,
	"4":  rinkebyBaseUrl,
	"42": kovanBaseUrl,
}

type NetworkID string

func NewNetworkID(id string) NetworkID {
	return NetworkID(id)
}

func (id NetworkID) String() string {
	return string(id)
}

type CrawlConfig struct {
	EtherScanUrl        string
	BaseUrl             string
	NetworkID           NetworkID
}

func NewConfig(net string) *CrawlConfig {
	baseUrl, ok := netMap[net]
	if !ok {
		panic(fmt.Errorf("unknown net type: %s", net))
	}

	return &CrawlConfig{
		EtherScanUrl:    baseUrl,
		BaseUrl:         fmt.Sprintf("%s%s", baseUrl, "/contractsVerified/%d?ps=%d"),
		NetworkID:       NewNetworkID(net),
	}
}
