# <img src='./WhiteLogo.svg' height='100' alt='Zippo Logo' aria-label='Zippo' />

![](https://img.shields.io/badge/Version-0.1-blue.svg?style=flat-square)
![](https://img.shields.io/badge/Open%20Source-PRs%20Welcome-green.svg?style=flat-square&logo=ethereum)
[![zippo channel on discord](https://img.shields.io/badge/Discord-Say%20Hi-blueviolet.svg?style=flat-square&logo=discord)](https://discord.gg/ZT4sRqc)

Hot Module Replacement (HMR) for Solidity smart contract development. Originally developed on the EthParis 2019 Hackathon.

## Installation

```
brew update && brew install zippo
```

```yaml
apt-get 
```

## Usage

Before starting the geth server you will need to setup the `zippo.yaml` configuration file.

```yaml

```

To read more about the the Zippo config file read the [configuration](#configuration) section.

```
zippo start
```

After the server has the started you can the view debugging and loggin panel at [http://localhost:9476](http://localhost:9476).

## Configuration

```yaml
# Defaults

rpc_host: 127.0.0.1
rpc_port: 8545
ws_port:  8546
```

## Contributing

This tool is intended to speed up and boost the development process for Solidity smart contracts. So everything is 100% Open Source and we welcome all Pull Requests.

If you want you can join us at the [Zippo Discord](https://discord.gg/ZT4sRqc) channel.
