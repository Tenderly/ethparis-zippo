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


func GetContract(address string, config *CrawlConfig) *ContractSource {
	contractSource := getContractSource(address, config)

	return contractSource
}

func getContractSource(address string, config *CrawlConfig) *ContractSource {
	source := &ContractSource{
		OptimizationUsed: false,
	}

	c := colly.NewCollector(
		colly.Async(true),
	)

	c.OnHTML(".js-sourcecopyarea", func(e *colly.HTMLElement) {
		source.Source = e.Text
	})

	c.OnHTML("#ContentPlaceHolder1_contractCodeDiv table tr", func(e *colly.HTMLElement) {
		elementText := removeSpaces(e.Text)

		if strings.HasPrefix(elementText, "ContractName:") {
			fmt.Sscanf(elementText, "ContractName:%s", &source.Name)
		}

		if strings.HasPrefix(elementText, "CompilerVersion:") {
			fmt.Sscanf(elementText, "CompilerVersion:%s", &source.Version)
			source.Version = source.Version[1:]

			if i := strings.Index(source.Version, "+"); i > -1 {
				source.Version = source.Version[:i]
			}
		}

		if strings.HasPrefix(elementText, "verifiedbytecode2") {
			fmt.Sscanf(elementText, "verifiedbytecode2:%s", &source.Bytecode)
		}

		if strings.HasPrefix(elementText, "Runs(Optimiser):") {
			fmt.Sscanf(elementText, "Runs(Optimiser):%d", &source.Runs)
		}

		if strings.HasPrefix(elementText, "Runs(Optimizer):") {
			fmt.Sscanf(elementText, "Runs(Optimizer):%d", &source.Runs)
		}

		if elementText == "OptimizationEnabled:Yes" {
			source.OptimizationUsed = true
		}
	})

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
