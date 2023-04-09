import { HardhatUserConfig } from "hardhat/config";

import "@nomicfoundation/hardhat-toolbox";

import * as dotenv from "dotenv";
dotenv.config();

// tasks
// const accounts = require("./src/tasks/accounts");

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      blockGasLimit: 30000000,
    },
    hashtest: {
      url: process.env.HASHTEST_RPC || "https://testnet-rpc.hashbit.org",
      chainId: 11120,
      accounts: ["766a604d6f6e73d099d3c7a0c53f90d472661b088946ffb4e37c5db0b804efdc"],
    },
    hash: {
      url: process.env.HASH_RPC || "https://mainnet-rpc.hashbit.org",
      chainId: 11119,
      accounts: ["766a604d6f6e73d099d3c7a0c53f90d472661b088946ffb4e37c5db0b804efdc"],
    }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 9999,
      },
      metadata: {
        bytecodeHash: "none",
      },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v5",
  },
  paths: {
    tests: "./src/test",
  },
  etherscan: {
    apiKey: {
      mainnet: "2RMKQCG5XPD31FQM7JX6KQ95SJ1SUX1ZYV",
      hashtest: "2RMKQCG5XPD31FQM7JX6KQ95SJ1SUX1ZYV",
      hash: "2RMKQCG5XPD31FQM7JX6KQ95SJ1SUX1ZYV",
  }
  }
};

export default config;
