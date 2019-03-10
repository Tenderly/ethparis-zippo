import React, {Component} from 'react';

import './Debugger.scss';
import Loader from "../Loader/Loader";
import Select from "../Select/Select";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Header from "../Header/Header";
import EthereumClient from "../../EthereumClient";

class Debugger extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initiallyLoaded: false,
            contracts: [],
            methods: {},
            selectedContract: null,
            selectedContractMethods: [],
            selectedMethod: null,
            selectedMethodInputs: [],
            methodInputs: {},
            sendingTransaction: false,
            transactionResult: null,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.initiallyLoaded && props.contracts && !!props.contracts.length) {
            return {
                ...state,
                initiallyLoaded: true,
                contracts: props.contracts
            };
        }

        return null;
    }

    handleInputChange = (value, field) => {
        this.setState({
            [field]: value,
        });
    };

    handleMethodInputChange = (value, field) => {
        const {methodInputs} = this.state;

        this.setState({
            methodInputs: {
                ...methodInputs,
                [field]: value,
            },
        });
    };

    isFormValid = () => {
        const {selectedContract, selectedMethod, methodInputs, selectedMethodInputs, sendingTransaction} = this.state;

        if (!selectedContract || !selectedMethod || sendingTransaction) {
            return false;
        }

        let valid = true;

        selectedMethodInputs.forEach(methodInput => {
            if (!methodInputs[methodInput.name]) {
                valid = false;
            }
        });

        return valid;
    };

    handleSelectContract = (value, field) => {
        const {contracts} = this.state;

        const selectedContract = contracts.find(contract => contract.name === value);

        this.setState({
            selectedContractMethods: selectedContract.methods,
            selectedMethod: null,
            selectedMethodInputs: [],
            methodInputs: {},
            sendingTransaction: false,
            transactionResult: null,
        });

        this.handleInputChange(value, field);
    };

    handleSelectContractMethod = (value, field) => {
        const {selectedContractMethods} = this.state;

        const selectedMethod = selectedContractMethods.find(method => method.name === value);

        this.setState({
            selectedMethodInputs: selectedMethod.inputs,
            methodInputs: {},
            sendingTransaction: false,
            transactionResult: null,
        });

        this.handleInputChange(value, field);
    };

    sendTransaction = () => {
        const {contracts, selectedContract, methodInputs, selectedMethod} = this.state;
        const {abi} = this.props;

        this.setState({
            sendingTransaction: true,
            transactionResult: null,
        });

        const txContract = contracts.find(contract => contract.name === selectedContract);

        const transactionMethod = EthereumClient.getContract(
            abi[txContract.address], txContract.address
        ).methods[selectedMethod.replace('()', '')];


        EthereumClient.sendTransaction(transactionMethod, Object.values(methodInputs), (error, tx) => {
            // console.log(error, tx);
        });

        setTimeout(() => {
            this.setState({
                sendingTransaction: false,
                transactionResult: {
                    message: 'something'
                },
            });
        }, 5000);
    };

    render() {
        const {
            initiallyLoaded,
            contracts,
            selectedContract,
            selectedContractMethods,
            selectedMethod,
            selectedMethodInputs,
            methodInputs,
            sendingTransaction,
            transactionResult
        } = this.state;

        return (
            <div className="Debugger">
                <Header/>
                {!initiallyLoaded && <div className="DebuggerLoader">
                    <Loader/>
                </div>}
                {initiallyLoaded && <div className="DebuggerForm">
                    <Select value={selectedContract}
                            options={contracts}
                            field="selectedContract"
                            onChange={this.handleSelectContract}
                            label="Contract"
                            disabled={sendingTransaction}
                            placeholder="Select contract"/>
                    <Select value={selectedMethod}
                            options={selectedContractMethods}
                            field="selectedMethod"
                            onChange={this.handleSelectContractMethod}
                            label="Method" placeholder="Select contract method"
                            disabled={!selectedContract || sendingTransaction}/>
                    {(!!selectedMethod && !!selectedMethodInputs.length) && <div className="MethodInputsWrapper">
                        <div className="InputsHeading">Method Inputs</div>
                        {selectedMethodInputs.map(methodInput => <div key={methodInput.name} className="MethodInputItem">
                            <div className="InputName">{methodInput.name}</div>
                            <div className="InputInput">
                                <Input value={methodInputs[methodInput.name]}
                                       field={methodInput.name}
                                       onChange={this.handleMethodInputChange}
                                       placeholder={methodInput.type}/>
                            </div>
                        </div>)}
                    </div>}
                    <Button size="large" disabled={!this.isFormValid()} color="orange" onClick={this.sendTransaction}>
                        <span>Send Transaction</span>
                    </Button>
                    {(sendingTransaction || !!transactionResult) && <div className="TransactionResultWrapper">
                        {sendingTransaction && <div className="ResultLoader">
                            <Loader/>
                        </div>}
                        {!sendingTransaction && <div className="ResultContent">
                            <pre className="Result">{JSON.stringify(transactionResult)}</pre>
                        </div>}
                    </div>}
                </div>}
            </div>
        );
    }
}

export default Debugger;
