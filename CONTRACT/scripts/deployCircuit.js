const { ethers } = require('hardhat');

const converter = (_price) => {
  const newPrice = _price.toString();
  const price = ethers.parseEther(newPrice);
  return price;
};

const main = async () => {
  const daoRule = 'This is a dao rule';
  const tokenAddress = '0xd9145cce52d386f254917e481eb44e9943f39138';
  const surgeTokenPrice = converter(0.02);

  const Circuit = await ethers.getContractFactory('circuit');
  const circuit = await Circuit.deploy(daoRule, tokenAddress, surgeTokenPrice);

  await circuit.waitForDeployment();

  const contractAddress = circuit.getAddress();

  console.log(contractAddress);
};

main().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
