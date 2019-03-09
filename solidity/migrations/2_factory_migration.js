const Factory = artifacts.require("Factory");

let yaml = require('js-yaml');
let fs   = require('fs');

let config = yaml.safeLoad(fs.readFileSync(__dirname + '/../zippo.yaml', 'utf8'));

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