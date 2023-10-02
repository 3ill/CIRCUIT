const { ethers } = require('hardhat');

const main = async () => {
  const Ballot = await ethers.getContractFactory('Ballot');
  const vot3 = await Ballot.deploy();

  const contractAddress = await vot3.getAddress();
  console.log(
    `Contract deployed on the goerli testnet at => ${contractAddress}`
  );
};

main().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
