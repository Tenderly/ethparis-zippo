package geth

import (
	"github.com/ethereum/go-ethereum/common"
	"github.com/tenderly/solidity-hmr/client/jsonrpc2"
	"github.com/tenderly/solidity-hmr/client/schema"
)

var DefaultSchema = Schema{
	ValueEth:    ethSchema{},
	ValueNet:    netSchema{},
}

type Schema struct {
	ValueEth    schema.EthSchema
	ValueNet    schema.NetSchema
}

func (s *Schema) Eth() schema.EthSchema {
	return s.ValueEth
}

func (s *Schema) Net() schema.NetSchema {
	return s.ValueNet
}

// Eth

type ethSchema struct {
}

func (ethSchema) GetCode(address string) (*jsonrpc2.Request, *string) {
	var code string

	return jsonrpc2.NewRequest("eth_getCode", address, "latest"), &code
}

func (ethSchema) GetStorage(address string, offset common.Hash) (*jsonrpc2.Request, *string) {
	var data string

	return jsonrpc2.NewRequest("eth_getStorageAt", address, offset, "latest"), &data
}

// Net

type netSchema struct {
}

func (netSchema) Version() (*jsonrpc2.Request, *string) {
	var v string

	return jsonrpc2.NewRequest("net_version"), &v
}