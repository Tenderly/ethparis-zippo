import React, {Component} from 'react';

import './Debugger.scss';
import Loader from "../Loader/Loader";
import Select from "../Select/Select";
import Button from "../Button/Button";

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
            selectedMethodInputs: null,
            methodInputs: {},
        };
    }

    componentDidMount() {
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
                                    name: "a",
                                    type: "int36"
                                },
                                {
                                    name: "b",
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
        this.setState({
            methodInputs: {
                [field]: value,
            },
        });
    };

    handleSelectContract = (value, field) => {
        const {methods} = this.state;

        this.setState({
            selectedContractMethods: methods[value],
        });

        this.handleInputChange(value, field);
    };

    handleSelectContractMethod = (value, field) => {
        const {selectedContractMethods} = this.state;

        const selectMethod = selectedContractMethods.find(method => method.name === value);

        this.setState({
            selectedMethodInputs: selectMethod.inputs,
        });

        this.handleInputChange(value, field);
    };

    sendTransaction = () => {
        console.log(this.state);
    };

    render() {
        const {initiallyLoaded, contracts, selectedContract, selectedContractMethods, selectedMethod} = this.state;

        return (
            <div className="Debugger">
                {!initiallyLoaded && <div>
                    <Loader/>
                </div>}
                {initiallyLoaded && <div>
                    <Select value={selectedContract} options={contracts} field="selectedContract" onChange={this.handleSelectContract} label="Contract" placeholder="Select contract"/>
                    <Select value={selectedMethod} options={selectedContractMethods} field="selectedMethod" onChange={this.handleSelectContractMethod} label="Method" placeholder="Select contract method" disabled={!!selectedContract}/>
                    <Button disabled={true} color="orange" onClick={this.sendTransaction}>
                        <span>Send Transaction</span>
                    </Button>
                </div>}
            </div>
        );
    }
}

export default Debugger;
