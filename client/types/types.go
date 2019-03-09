package types

import (
	"encoding/json"
	"fmt"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"strconv"

	"github.com/tenderly/solidity-hmr/ethereum/core/vm"
)

// Core Types

type Number int64

func (n *Number) Value() int64 {
	return int64(*n)
}

func (n *Number) Hex() string {
	return fmt.Sprintf("%#x", int64(*n))
}

func (n *Number) UnmarshalJSON(b []byte) error {
	var s string
	if err := json.Unmarshal(b, &s); err != nil {
		return err
	}

	num, err := strconv.ParseInt(s, 0, 64)
	if err != nil {
		return err
	}

	*n = Number(num)

	return nil
}

func (n *Number) MarshalJSON() ([]byte, error) {
	return []byte(fmt.Sprintf("\"%s\"", n.Hex())), nil
}

type Header interface {
	Number() *Number
}

type Block interface {
	Number() *Number
	Hash() hexutil.Bytes
	Transactions() []Transaction
}

type BlockHeader interface {
	Number() *Number
	Hash() *common.Hash
	ParentHash() *common.Hash
	Time() *hexutil.Big
	Difficulty() *hexutil.Big
	GasLimit() *hexutil.Big
	GasPrice() *hexutil.Big
	Coinbase() *common.Address
}

type Transaction interface {
	Hash() *common.Hash
	BlockNumber() *hexutil.Big
	BlockHash() *common.Hash

	From() *common.Address
	To() *common.Address

	Input() hexutil.Bytes
	Value() *hexutil.Big
	Gas() *hexutil.Big
	GasPrice() *hexutil.Big
}

type Log interface {
	Topics() []string
	Data() string
}

type TransactionReceipt interface {
	Hash() string

	GasUsed() *hexutil.Big
	CumulativeGasUsed() *hexutil.Big
	ContractAddress() *common.Address

	Status() string
	SetStatus(trace string)
	Logs() []Log
}

// States Types

type TransactionStates interface {
	States() []EvmState
	ProcessTrace(tx Transaction)
}

type EvmState interface {
	Pc() uint64
	Depth() int
	Op() string
	Stack() *vm.Stack
	Memory() *vm.Memory
}

type CallTraces interface {
	Traces() []Trace
}

type Trace interface {
	Hash() *common.Hash
	ParentHash() *common.Hash
	TransactionHash() *common.Hash
	Type() string
	From() common.Address
	To() common.Address
	Input() hexutil.Bytes
	Output() hexutil.Bytes
	Gas() *hexutil.Uint64
	GasUsed() *hexutil.Uint64
	Value() *hexutil.Big
	Error() string
}

// Subscription Types

type SubscriptionID string

func NewNilSubscriptionID() SubscriptionID {
	return ""
}

func (id SubscriptionID) String() string {
	return string(id)
}

type SubscriptionResult struct {
	Subscription SubscriptionID `json:"subscription"`
	Result       Header         `json:"result"`
}

type UnsubscribeSuccess bool
