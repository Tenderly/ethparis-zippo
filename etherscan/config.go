package etherscan

import (
	"fmt"

	"github.com/bencicandrej/tenderly-core/src"
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

type CrawlConfig struct {
	EtherScanUrl        string
	BaseUrl             string
	NetworkID           tenderly.NetworkID
	Page                int
	PerPage             int
	Force               bool
	LastCrawledContract *tenderly.Contract
}

func NewConfig(net string) *CrawlConfig {
	baseUrl, ok := netMap[net]
	if !ok {
		panic(fmt.Errorf("unknown net type: %s", net))
	}

	return &CrawlConfig{
		EtherScanUrl:    baseUrl,
		BaseUrl:         fmt.Sprintf("%s%s", baseUrl, "/contractsVerified/%d?ps=%d"),
		NetworkID:       tenderly.NewNetworkID(net),
		Page:            1,
		PerPage:         100,
	}

}

func (c *CrawlConfig) CurrentPage() string {
	return fmt.Sprintf(c.BaseUrl, c.Page, c.PerPage)
}

func (c *CrawlConfig) NextPage() string {
	c.Page++

	return c.CurrentPage()
}

func (c *CrawlConfig) Reset() {
	c.Page = 1
	c.LastCrawledContract = nil
}
