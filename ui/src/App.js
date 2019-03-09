import React, {Component} from 'react';
import Websocket from 'react-websocket';
import Moment from 'moment';
import _ from 'lodash';

import './App.scss';
import ActionLogs from "./Components/ActionLogs/ActionLogs";
import Debugger from "./Components/Debugger/Debugger";
import {WS_URL} from "./Common/constants";
import EthereumClient from "./EthereumClient";

function extractMethodsFromAbi(abi) {
    return abi.filter(data => data.type === 'function').map(func => {
        return {
            ...func,
            name: `${func.name}()`
        };
    });
}

class Message {
    constructor(data) {
        this.level = data.level || 'info';
        this.type = data.type || 'unknown';
        this.data = {};
        this.timestamp = data.timestamp || new Moment();
    }
}

class InitialMessage extends Message {
    constructor(message) {
        super(message);
        const contracts = Object.values(message.data).map(contract => {
            const networkId = Object.keys(contract.networks)[0];
            const networkInfo = Object.values(contract.networks)[0];

            return {
                contractName: contract.contractName,
                fileName: `${contract.contractName}.sol`,
                name: `${contract.contractName}.sol`,
                networkId,
                address: networkInfo.address.toLowerCase(),
                creatorTx: networkInfo.transactionHash,
                methods: extractMethodsFromAbi(contract.abi),
            }
        });

        const contractsDeployed = `[${contracts.map(c => c.name).join(', ')}]`;

        this.data = {
            message: `Initial deployment of ${contractsDeployed}`,
            description: '',
            contracts,
        };
    }
}

// class TransactionMessage extends Message {
//     constructor(message) {
//         super(message);
//
//     }
//
// }

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logs: [],
            contracts: [],
            contractsAbi: {},
        };

        EthereumClient.initialize();
    }

    addMessage = message => {
        const {logs} = this.state;

        this.setState({
            logs: [
                ...logs,
                message,
            ]
        })
    };

    addMessageContracts = message => {
        const {contracts} = this.state;

        this.setState({
            contracts: [
                ...contracts,
                ...message.data.contracts,
            ]
        })
    };

    setContractAbi = abi => {
        const {contractsAbi} = this.state;

        const contractAbi = {};
        _.forEach(abi, (contract, address) => {
            contractAbi[address.toLowerCase()] = contract.abi;
        });

        this.setState({
            contractsAbi: {
                ...contractsAbi,
                ...contractAbi,
            },
        });
    };

    handleWebSocketMessage = (data) => {
        const messageData = JSON.parse(data);

        switch (messageData.type) {
            case 'initial_message':
                const message = new InitialMessage(messageData);
                this.addMessage(message);
                this.addMessageContracts(message);
                this.setContractAbi(messageData.data);
                return;
            default:
                console.log('unparsed message', messageData);
                return;
        }
    };

    render() {
        const {contracts, logs, contractsAbi} = this.state;

        return (
            <div className="App">
                <Debugger contracts={contracts} abi={contractsAbi}/>
                <ActionLogs logs={logs}/>
                <Websocket url={WS_URL}
                           onMessage={this.handleWebSocketMessage}/>
            </div>
        );
    }
}

export default App;
