import React, {Component} from 'react';

import './Debugger.scss';

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

    render() {
        const {initiallyLoaded, contracts, methods, selectedContract, selectedContractMethods, selectedMethod} = this.state;

        return (
            <div className="Debugger">
                {!initiallyLoaded && <div>Loading...</div>}
                {initiallyLoaded && <div>qwe</div>}
            </div>
        );
    }
}

export default Debugger;
