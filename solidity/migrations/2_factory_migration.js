const Factory = artifacts.require("Factory");

let config = require('../zippo.json');

module.exports = async (deployer) => {
  await deployer.deploy(Factory);
  let factoryInstance = await Factory.deployed();

  const contracts = config.contracts;
  for (const contractKey in contracts) {
    if (!contracts.hasOwnProperty(contractKey)) {
      continue;
    }

    const contract = contracts[contractKey];

    // console.log(contract)
    if (contract.code !== undefined && contract.code !== "") {
      console.log("DEPLOYING CONTRACT CODE: %s", contract.code);
      await factoryInstance.deploy(contract.code, contract.address)
    } else {
      console.log("DEPLOYING CONTRACT NAME: %s", contract.name);
      let contractForDeployment = artifacts.require(contract.name);
      await deployer.deploy(contractForDeployment);
    }
  }
};