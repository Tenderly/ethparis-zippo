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
            constant: func.constant,
            name: func.constant ? `[constant] ${func.name}` : `${func.name}()`,
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

        this.meta = {
            contracts,
        };
    }
}

class TransactionMessage extends Message {
    constructor(message) {
        super({
            level: message.level,
            type: 'contract_transaction',
        });

        let messageText;

        if (message.level === 'info') {
            messageText = `Called ${message.method} in ${message.contract}`
        } else {
            messageText = `Transaction revert calling ${message.method} in ${message.contract}`
        }

        this.data = {
            message: messageText,
            description: '',
        };

        this.meta = {
            result: message.result,
            inputs: message.methodInputs,
        };
    }

}

class CompilingMessage extends Message {
    constructor(data) {
        super({
            level: 'info',
            type: 'compiling_contracts',
        });

        const contractsChanged = `[${data.contracts.map(c => `${c.name}.sol`).join(', ')}]`;

        this.data = {
            message: `Changes detected in the following contracts: ${contractsChanged}`,
            description: '',
        };

        this.meta = {
            contracts: data.contracts,
        };
    }
}

class CompileFailureMessage extends Message {
    constructor(data) {
        super({
            level: 'error',
            type: 'compiler_failure',
        });

        console.log(data);

        this.data = {
            message: `Compiling contracts failed with message: ${data.err}`,
            description: '',
        };

        this.meta = {
            error: data.err,
        };
    }

}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logs: [],
            contracts: [],
            contractsAbi: {},
            connectionInfo: null,
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

    setConnectionInfo = message => {
        this.setState({
            connectionInfo: {
                id: message.network_id,
                name: message.network_name,
                url: message.network_url,
            },
        });
    };

    pushTransactionMessage = (messageData) => {
        const message = new TransactionMessage(messageData);

        this.addMessage(message);
    };

    handleWebSocketMessage = (data) => {
        const messageData = JSON.parse(data);

        switch (messageData.type) {
            case 'initial_message':
                const message = new InitialMessage(messageData);
                this.addMessage(message);
                this.addMessageContracts(message);
                this.setContractAbi(messageData.data);
                this.setConnectionInfo(messageData);
                return;
            case 'compiling':
                this.addMessage(new CompilingMessage(messageData));
                return;
            case 'compile_failed':
                this.addMessage(new CompileFailureMessage(messageData));
                return;
            default:
                console.log('unparsed message', messageData);
                return;
        }
    };

    render() {
        const {contracts, logs, contractsAbi, connectionInfo} = this.state;

        return (
            <div className="App">
                <Debugger contracts={contracts} abi={contractsAbi} onTransaction={this.pushTransactionMessage}/>
                <ActionLogs logs={logs} connection={connectionInfo}/>
                <Websocket url={WS_URL}
                           onMessage={this.handleWebSocketMessage}/>
            </div>
        );
    }
}

export default App;
