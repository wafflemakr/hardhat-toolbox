import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-deploy';
import env from './config';
import './tasks';

const { POLYGON_PRIVKEY, POLYGON_NODE_URL, POLYGON_ETHERSCAN_API } = env;
let accounts;

if (POLYGON_PRIVKEY) {
  accounts = [POLYGON_PRIVKEY];
} else {
  accounts = {
    mnemonic: 'test test test test test test test test test test test test',
  };
}

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      // forking: {
      //   url: POLYGON_NODE_URL || 'https://polygon-rpc.com/',
      //   blockNumber: 41_000_000,
      // },
    },
    polygon: {
      url: POLYGON_NODE_URL || 'https://polygon-rpc.com/',
      chainId: 137,
      accounts,
    },
  },
  namedAccounts: {
    deployer: 0,
    owner: {
      default: 0,
      polygon: 1,
    },
  },
  etherscan: {
    apiKey: {
      polygon: POLYGON_ETHERSCAN_API,
    },
  },
  solidity: {
    version: '0.8.18',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;
