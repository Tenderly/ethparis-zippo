package geth

import (
	"encoding/json"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/tenderly/solidity-hmr/client/types"
	"github.com/tenderly/solidity-hmr/ethereum/core/vm"
)

// Core Types

type Header struct {
	HNumber *types.Number `json:"number"`
}

func (h *Header) Number() *types.Number {
	return h.HNumber
}

type Block struct {
	ValuesNumber       *types.Number  `json:"number"`
	ValuesHash         hexutil.Bytes  `json:"hash"`
	ValuesTransactions []*Transaction `json:"transactions"`
}

func (b Block) Number() *types.Number {
	return b.ValuesNumber
}

func (b Block) Hash() hexutil.Bytes {
	return b.ValuesHash
}

func (b Block) Transactions() []types.Transaction {
	transactions := make([]types.Transaction, len(b.ValuesTransactions))
	for k, v := range b.ValuesTransactions {
		transactions[k] = v
	}

	return transactions
}

type BlockHeader struct {
	ValueNumber     *types.Number   `json:"number"`
	ValueBlockHash  *common.Hash    `json:"hash"`
	ValueParentHash *common.Hash    `json:"parentHash"`
	ValueTime       *hexutil.Big    `json:"timestamp"`
	ValueDifficulty *hexutil.Big    `json:"difficulty"`
	ValueGasLimit   *hexutil.Big    `json:"gasLimit"`
	ValueGasPrice   *hexutil.Big    `json:"gasPrice"`
	ValueCoinbase   *common.Address `json:"miner"`
}

func (b *BlockHeader) Number() *types.Number {
	return b.ValueNumber
}

func (b *BlockHeader) Hash() *common.Hash {
	return b.ValueBlockHash
}

func (b *BlockHeader) ParentHash() *common.Hash {
	return b.ValueParentHash
}

func (b *BlockHeader) Time() *hexutil.Big {
	return b.ValueTime
}

func (b *BlockHeader) Difficulty() *hexutil.Big {
	return b.ValueDifficulty
}

func (b *BlockHeader) GasLimit() *hexutil.Big {
	return b.ValueGasLimit
}

func (b *BlockHeader) GasPrice() *hexutil.Big {
	return b.ValueGasPrice
}

func (b *BlockHeader) Coinbase() *common.Address {
	return b.ValueCoinbase
}

type Transaction struct {
	ValueHash        *common.Hash    `json:"hash"`
	ValueFrom        *common.Address `json:"from"`
	ValueTo          *common.Address `json:"to"`
	ValueInput       hexutil.Bytes   `json:"input"`
	ValueValue       *hexutil.Big    `json:"value"`
	ValueGas         *hexutil.Big    `json:"gas"`
	ValueGasPrice    *hexutil.Big    `json:"gasPrice"`
	ValueBlockNumber *hexutil.Big    `json:"blockNumber"`
	ValueBlockHash   *common.Hash    `json:"blockHash"`
}

func (t *Transaction) Hash() *common.Hash {
	return t.ValueHash
}

func (t *Transaction) From() *common.Address {
	return t.ValueFrom
}

func (t *Transaction) To() *common.Address {
	return t.ValueTo
}

func (t *Transaction) Input() hexutil.Bytes {
	return t.ValueInput
}

func (t *Transaction) Value() *hexutil.Big {
	return t.ValueValue
}

func (t *Transaction) Gas() *hexutil.Big {
	return t.ValueGas
}

func (t *Transaction) GasPrice() *hexutil.Big {
	return t.ValueGasPrice
}

func (t *Transaction) BlockNumber() *hexutil.Big {
	return t.ValueBlockNumber
}

func (t *Transaction) BlockHash() *common.Hash {
	return t.ValueBlockHash
}

type Log struct {
	ValueAddress             string   `json:"address"`
	ValueBlockHash           string   `json:"blockHash"`
	ValueBlockNumber         string   `json:"blockNumber"`
	ValueData                string   `json:"data"`
	ValueLogIndex            string   `json:"logIndex"`
	ValueRemoved             bool     `json:"removed"`
	ValueTopics              []string `json:"topics"`
	ValueTransactionHash     string   `json:"transactionHash"`
	ValueTransactionIndex    string   `json:"transactionIndex"`
	ValueTransactionLogIndex string   `json:"transactionLogIndex"`
	ValueType                string   `json:"type"`
}

func (l *Log) Data() string {
	return l.ValueData
}

func (l *Log) Topics() []string {
	return l.ValueTopics
}

type TransactionReceipt struct {
	TTransactionHash  string `json:"transactionHash"`
	TTransactionIndex string `json:"transactionIndex"`
	TBlockHash        string `json:"blockHash"`
	TBlockNumber      string `json:"blockNumber"`

	TGasUsed           *hexutil.Big    `json:"gasUsed"`
	TCumulativeGasUsed *hexutil.Big    `json:"cumulativeGasUsed"`
	TContractAddress   *common.Address `json:"contractAddress"`

	TStatus    string  `json:"status"` // Can be null, if null do a check anyways. 0x0 fail, 0x1 success
	TLogs      []*Log  `json:"logs"`
	TLogsBloom string  `json:"logsBloom"`
	TRoot      *string `json:"root"`
}

func (t *TransactionReceipt) SetStatus(trace string) {
	t.TStatus = "0x0 " + trace
}

func (t *TransactionReceipt) Hash() string {
	return t.TTransactionHash
}

func (t *TransactionReceipt) GasUsed() *hexutil.Big {
	return t.TGasUsed
}

func (t *TransactionReceipt) CumulativeGasUsed() *hexutil.Big {
	return t.TCumulativeGasUsed
}

func (t *TransactionReceipt) ContractAddress() *common.Address {
	return t.TContractAddress
}

func (t *TransactionReceipt) Status() string {
	return t.TStatus
}

func (t *TransactionReceipt) Logs() []types.Log {
	var logs []types.Log

	for _, log := range t.TLogs {
		logs = append(logs, log)
	}

	return logs
}

// States Types

type EvmState struct {
	ValuePc      uint64             `json:"pc"`
	ValueOp      string             `json:"op"`
	ValueGas     uint64             `json:"gas"`
	ValueGasCost int64              `json:"gasCost"`
	ValueDepth   int                `json:"depth"`
	ValueError   json.RawMessage    `json:"error,omitempty"`
	ValueStack   *vm.Stack          `json:"stack,omitempty"`
	ValueMemory  *vm.Memory         `json:"memory,omitempty"`
	ValueStorage *map[string]string `json:"storage,omitempty"`
}

func (s *EvmState) Pc() uint64 {
	return s.ValuePc
}

func (s *EvmState) Depth() int {
	return s.ValueDepth
}

func (s *EvmState) Op() string {
	return s.ValueOp
}

func (s *EvmState) Stack() *vm.Stack {
	return s.ValueStack
}

func (s *EvmState) Memory() *vm.Memory {
	return s.ValueMemory
}

type TraceResult struct {
	Gas         uint64      `json:"gas"`
	Failed      bool        `json:"failed"`
	ReturnValue string      `json:"returnValue"`
	StructLogs  []*EvmState `json:"structLogs"`
}

type CallTrace struct {
	ValueHash            *common.Hash    `json:"hash"`
	ValueParentHash      *common.Hash    `json:"parentHash"`
	ValueTransactionHash *common.Hash    `json:"transactionHash"`
	ValueType            string          `json:"type"`
	ValueFrom            common.Address  `json:"from"`
	ValueTo              common.Address  `json:"to"`
	ValueInput           hexutil.Bytes   `json:"input"`
	ValueOutput          hexutil.Bytes   `json:"output"`
	ValueGas             *hexutil.Uint64 `json:"gas,omitempty"`
	ValueGasUsed         *hexutil.Uint64 `json:"gasUsed,omitempty"`
	ValueValue           *hexutil.Big    `json:"value,omitempty"`
	ValueError           string          `json:"error,omitempty"`
	ValueCalls           []CallTrace     `json:"calls,omitempty"`
}

func (c *CallTrace) Hash() *common.Hash {
	return c.ValueHash
}

func (c *CallTrace) ParentHash() *common.Hash {
	return c.ValueParentHash
}

func (c *CallTrace) TransactionHash() *common.Hash {
	return c.ValueTransactionHash
}

func (c *CallTrace) Type() string {
	return c.ValueType
}

func (c *CallTrace) From() common.Address {
	return c.ValueFrom
}

func (c *CallTrace) To() common.Address {
	return c.ValueTo
}

func (c *CallTrace) Input() hexutil.Bytes {
	return c.ValueInput
}

func (c *CallTrace) Output() hexutil.Bytes {
	return c.ValueOutput
}

func (c *CallTrace) Gas() *hexutil.Uint64 {
	return c.ValueGas
}

func (c *CallTrace) GasUsed() *hexutil.Uint64 {
	return c.ValueGasUsed
}

func (c *CallTrace) Value() *hexutil.Big {
	return c.ValueValue
}

func (c *CallTrace) Error() string {
	return c.ValueError
}

func (c *CallTrace) Traces() []types.Trace {
	ch := make(chan *CallTrace)
	Walk(c, ch)

	var traces []types.Trace
	for callTrace := range ch {
		traces = append(traces, callTrace)
	}

	return traces
}

func Walk(c *CallTrace, ch chan *CallTrace) {
	if c == nil {
		return
	}
	ch <- c
	for _, callTrace := range c.ValueCalls {
		Walk(&callTrace, ch)
	}
}

func (gtr *TraceResult) States() []types.EvmState {
	traces := make([]types.EvmState, len(gtr.StructLogs))
	for k, v := range gtr.StructLogs {
		traces[k] = v
	}

	return traces
}

func (gtr *TraceResult) ProcessTrace(tx types.Transaction) {
}

type SubscriptionResult struct {
	Subscription types.SubscriptionID `json:"subscription"`
	Result       types.Header         `json:"result"`
}
