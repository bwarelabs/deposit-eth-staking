require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require('@openzeppelin/hardhat-upgrades');
require('hardhat-gas-reporter');
require('hardhat-abi-exporter');
require('hardhat-docgen');
require('hardhat-contract-sizer');
require('dotenv').config();
require('solidity-coverage');
var requireDir = require('require-dir');
requireDir('./tasks/');

const ethers = require("ethers");
let deployerPK = process.env.CALLER_PRIVATE_KEY;
if (!deployerPK) {
  deployerPK = ethers.Wallet.createRandom()._signingKey().privateKey;
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      evmVersion: "london",
      optimizer: {
        enabled: true,
        runs: 100,
      },
      outputSelection: {
        "*": {
          "*": ["storageLayout"],
        },
      },
    },
  },
  abiExporter: {
    path: './abis',
    runOnCompile: true,
    flat: true,
    only: [':(DepositETH|IERC20Metadata)$'],
    clear: true,
    pretty: false,
  },
  docgen: {
    path: './docgen',
    clear: true,
    runOnCompile: false,
    only: [':(DepositETH)$'],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      accounts: {
        count: 20,
        balance: '2000000000000000000000'
      },
    },
    ganache: {
      url: process.env.GANACHE_ENDPOINT,
      accounts: ["8b194d9bc1ece00804b812281c807ffd4f1668bf7db1f46538d2e070e35a0829"],
    },
    goerli: {
      url: process.env.URL,
      accounts: [`${deployerPK}`],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};