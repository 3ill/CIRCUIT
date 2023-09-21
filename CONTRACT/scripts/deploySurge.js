const { ethers } = require('hardhat');

const main = async () => {
  let name = 'surge';
  let symbol = 'srg';
  const Surge = await ethers.getContractFactory('token');
  const surge = await Surge.deploy(name, symbol);

  const contractAddress = await surge.getAddress();
  console.log(contractAddress);
};

main().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
