package etherscan

import (
	"fmt"
	"strings"
	"unicode"

	"github.com/gocolly/colly"
)

type ContractSource struct {
	Name             string
	Version          string
	Source           string
	Runs             int
	Bytecode         string
	OptimizationUsed bool
}


func GetContract(address string, config *CrawlConfig) string {
	contractSource := getContractSource(address, config)

	return contractSource.Bytecode
}

func getContractSource(address string, config *CrawlConfig) *ContractSource {
	source := &ContractSource{
		OptimizationUsed: false,
	}

	c := colly.NewCollector(
		colly.Async(true),
	)

	c.OnHTML("#verifiedbytecode2", func(e *colly.HTMLElement) {
		elementText := removeSpaces(e.Text)
		source.Bytecode = elementText
	})

	url := fmt.Sprintf("%s/address/%s#code", config.EtherScanUrl, address)

	c.Visit(url)

	c.Wait()

	return source
}

func removeSpaces(s string) string {
	return strings.Map(func(r rune) rune {
		if unicode.IsSpace(r) {
			return -1
		}
		return r
	}, s)
}
