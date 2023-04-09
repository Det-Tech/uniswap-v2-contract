import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { BigNumber } from "ethers";

const hardhat =  require("hardhat");

import { expandTo18Decimals, UniswapVersion } from "./shared/utilities";

const TOTAL_SUPPLY = expandTo18Decimals(10000);
const TEST_AMOUNT = expandTo18Decimals(10);

  async function fixture() {
    const factory = await ethers.getContractFactory("ERC20");
    const token = await factory.deploy(TOTAL_SUPPLY);
    token.deployed();

    
  await hardhat.run("verify:verify", {
    address: token.address,
    constructorArguments: [
      TOTAL_SUPPLY
    ],
  })

    // const [wallet, other] = await ethers.getSigners();
    // return { token: token, wallet, other };
  }

  fixture();
