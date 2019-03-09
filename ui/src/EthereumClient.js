import Web3 from 'web3';
import {RPC_URI} from "./Common/constants";

let web3;
let web3Account = '0x25f5dc546ef27666c6e4ce75f470ab2b8c092a8f';
// let web3AccountPrivKey = '0xe3eabffdf23cb34ea60612dd31ed79fcb2acb15833f3064c654d54a791a0e8e1';
// let web3AccountPasswor   d = 'zippodev';

class EthereumClient {
    static initialize() {
        web3 = new Web3(RPC_URI);
        // web3.eth.personal.newAccount(web3AccountPassword).then(account => {
        //     web3Account = account;
        //     console.log(account);
        // });
    }

    static getAccounts() {
        if (web3) {
            console.log(web3.eth.accounts);
        }
    }

    /**
     *
     * @param {Function} method
     * @param {array} params
     * @param {Function} callback
     */
    static sendTransaction(method, params, callback = () => {}) {
        if (web3) {
            if (params && !!params.length) {
                method(...params)
                    .send({
                        from: web3Account,
                    }, callback)
                    .on('transactionHash', (hash) => {
                        console.log('transactionHash', hash);
                    })
                    .on('confirmation', (confirmationNumber, receipt) => {
                        console.log('confirmation', confirmationNumber, receipt);
                    })
                    .on('receipt', (receipt) => {
                        console.log('receipt', receipt);
                    })
                    .on('error', console.error);
            } else {
                method()
                    .send({
                        from: web3Account,
                    }, callback)
                    .on('transactionHash', (hash) => {
                        console.log('transactionHash', hash);
                    })
                    .on('confirmation', (confirmationNumber, receipt) => {
                        console.log('confirmation', confirmationNumber, receipt);
                    })
                    .on('receipt', (receipt) => {
                        console.log('receipt', receipt);
                    })
                    .on('error', console.error);
                // web3.eth.personal.unlockAccount(web3Account, web3AccountPassword, 600)
                //     .then(() => {
                //         method(...params).send({
                //             from: web3Account,
                //         }, callback);
                //     });
            }
        }
    }

    static getContract(contractAbi, address) {
        if (!web3) {
            return null;
        }

        return web3.eth.Contract(contractAbi, address);
    }
}

export default EthereumClient;
