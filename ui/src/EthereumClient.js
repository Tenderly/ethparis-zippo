import Web3 from 'web3';
import {RPC_URI} from "./Common/constants";

let web3;

class EthereumClient {
    static initialize() {
        console.log(RPC_URI);
        web3 = new Web3(RPC_URI);
    }
}

export default EthereumClient;
