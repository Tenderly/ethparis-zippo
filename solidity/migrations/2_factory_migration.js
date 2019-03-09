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


    if (contract.code !== undefined && contract.code !== "") {
      factoryInstance.deploy(contract.code, contract.address)
    } else {
      let contractForDeployment = artifacts.require(contract.name);
      await deployer.deploy(contractForDeployment);
    }
  }
};