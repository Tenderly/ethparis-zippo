package client

import (
	"encoding/json"
	"fmt"
	"github.com/ethereum/go-ethereum/common"
	"github.com/tenderly/solidity-hmr/client/jsonrpc2"
	"github.com/tenderly/solidity-hmr/client/node/geth"
	"github.com/tenderly/solidity-hmr/client/schema"
)

// Client represents an implementation agnostic interface to the Ethereum node.
// It is able connect to both different protocols (http, ws) and implementations (geth, parity).
type Client struct {
	rpc    *jsonrpc2.Client
	schema schema.Schema

	openChannels []chan int64
}

func Dial(target string) (*Client, error) {
	rpcClient, err := jsonrpc2.DiscoverAndDial(target)
	if err != nil {
		return nil, fmt.Errorf("dial ethereum rpc: %s", err)
	}

	return &Client{
		rpc:    rpcClient,
		schema: &geth.DefaultSchema,
	}, nil
}

func (c *Client) Call(message *jsonrpc2.Message) error {
	var params []interface{}
	if message.Params != nil {
		err := json.Unmarshal(message.Params, &params)
		if err != nil {
			return err
		}
	}

	req := jsonrpc2.NewRequest(message.Method, params...)

	resMsg, err := c.rpc.SendRawRequest(req)
	if err != nil {
		return fmt.Errorf("proxy calling failed method: [%s], parameters [%s], error: %s",
			req.Method,
			req.Params,
			err)
	}

	message.Result = resMsg.Result
	message.Error = resMsg.Error
	return nil
}

func (c *Client) GetCode(address string) (*string, error) {
	req, resp := c.schema.Eth().GetCode(address)

	if err := c.rpc.CallRequest(resp, req); err != nil {
		return nil, fmt.Errorf("get code [%s]: %s", address, err)
	}

	return resp, nil
}

func (c *Client) GetStorageAt(hash string, offset common.Hash) (*common.Hash, error) {
	req, resp := c.schema.Eth().GetStorage(hash, offset)

	if err := c.rpc.CallRequest(resp, req); err != nil {
		return nil, fmt.Errorf("get transaction receipt [%s]: %s", hash, err)
	}

	respHash := common.HexToHash(*resp)
	return &respHash, nil
}

