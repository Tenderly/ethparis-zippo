import React, {Component} from 'react';

import './Debugger.scss';
import Loader from "../Loader/Loader";
import Select from "../Select/Select";
import Button from "../Button/Button";
import Input from "../Input/Input";
import {WS_URL} from "../../Common/constants";

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

    componentDidMount() {
        console.log(WS_URL);
        setTimeout(() => {
            this.setState({
                initiallyLoaded: true,
                contracts: [
                    {
                        name: "Calculator.sol",
                        address: "0x6B6220677b93E8fc9dC3ffE582E481B7A56c79a9",
                    },
                    {
                        name: "SafeMath.sol",
                        address: "0x6B6220677b93E8fc9dC3ffE582E481B7A56c79a9",
                    },
                ],
                methods: {
                    "Calculator.sol": [
                        {
                            name: "sum()",
                            inputs: [
                                {
                                    name: "a",
                                    type: "int36"
                                },
                                {
                                    name: "b",
                                    type: "int36"
                                },
                            ],
                        },
                        {
                            name: "multiply()",
                            inputs: [
                                {
                                    name: "ma",
                                    type: "int36"
                                },
                                {
                                    name: "mb",
                                    type: "int36"
                                },
                            ],
                        },
                    ],
                    "SafeMath.sol": [
                        {
                            name: "toBigNumber()",
                            inputs: [
                                {
                                    name: "number",
                                    type: "int36"
                                },
                            ],
                        },
                    ]
                },
            });
        }, 1000);
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
        const {methods} = this.state;

        this.setState({
            selectedContractMethods: methods[value],
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
        console.log(this.state);
        this.setState({
            sendingTransaction: true,
            transactionResult: null,
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
                {!initiallyLoaded && <div>
                    <Loader/>
                </div>}
                {initiallyLoaded && <div>
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
                    {(!!selectedMethod && selectedMethodInputs.length) && <div>
                        {selectedMethodInputs.map(methodInput => <div key={methodInput.name}>
                            <div>{methodInput.name}</div>
                            <div>
                                <Input value={methodInputs[methodInput.name]}
                                       field={methodInput.name}
                                       onChange={this.handleMethodInputChange}
                                       placeholder={methodInput.type}/>
                            </div>
                        </div>)}
                    </div>}
                    <Button disabled={!this.isFormValid()} color="orange" onClick={this.sendTransaction}>
                        <span>Send Transaction</span>
                    </Button>
                    {(sendingTransaction || !!transactionResult) && <div>
                        {sendingTransaction && <div>
                            <Loader/>
                        </div>}
                        {!sendingTransaction && <div>
                            <pre>{JSON.stringify(transactionResult)}</pre>
                        </div>}
                    </div>}
                </div>}
            </div>
        );
    }
}

export default Debugger;
