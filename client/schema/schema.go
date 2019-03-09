package schema

import (
	"github.com/ethereum/go-ethereum/common"
	"github.com/tenderly/solidity-hmr/client/jsonrpc2"
)

type Schema interface {
	Eth() EthSchema
	Net() NetSchema
}

// Eth

type EthSchema interface {
	GetCode(address string) (*jsonrpc2.Request, *string)
	GetStorage(address string, offset common.Hash) (*jsonrpc2.Request, *string)
}

// Net

type NetSchema interface {
	Version() (*jsonrpc2.Request, *string)
}
