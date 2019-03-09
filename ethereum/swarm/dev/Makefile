.PHONY: build cluster test

default: build

build:
	go build -o bin/swarm    github.com/tenderly/solidity-hmr/ethereum/cmd/swarm
	go build -o bin/geth     github.com/tenderly/solidity-hmr/ethereum/cmd/geth
	go build -o bin/bootnode github.com/tenderly/solidity-hmr/ethereum/cmd/bootnode

cluster: build
	scripts/boot-cluster.sh

test:
	go test -v github.com/tenderly/solidity-hmr/ethereum/swarm/...
