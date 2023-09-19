require('@nomicfoundation/hardhat-toolbox');
require('solidity-coverage');
require('dotenv').config();
const { RPC, KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.19',
  networks: {
    goerli: {
      url: RPC,
      accounts: [`0x${KEY}`],
      chainId: 5,
      blockConfirmations: 1,
    },
  },
};
