package etherscan

type SearchResult struct {
	ContractName    string `json:"contract_name"`
	ContractAddress string `json:"contract_address"`
}
