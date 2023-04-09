import { expect } from "chai";
import { BigNumber, constants as ethconst } from "ethers";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

import { expandTo18Decimals, encodePrice } from "./shared/utilities";
import { UniswapV2Pair, ERC20 } from "../../typechain-types";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const MINIMUM_LIQUIDITY = BigNumber.from(10).pow(3);

  async function fixture() {
    const [wallet, other] = await ethers.getSigners();

    console.log(wallet.address)
    
    const factory = await (
      await ethers.getContractFactory("UniswapV2Factory")
    ).deploy(wallet.address);
    await factory.deployed();

    console.log("factory: ",factory.address)
    const tokenA = (await (
      await ethers.getContractFactory("ERC20")
    ).deploy(expandTo18Decimals(10000))) as ERC20;
    await tokenA.deployed();

    console.log("tokenA: ", tokenA.address)

    const tokenB = (await (
      await ethers.getContractFactory("ERC20")
    ).deploy(expandTo18Decimals(10000))) as ERC20;
    await tokenB.deployed();
    console.log("tokenB: ", tokenB.address)

    const tx = await factory.createPair(tokenA.address, tokenB.address);
    tx.wait();
    console.log("tx: ", tx.hash);

    console.log(await factory.getPair(tokenA.address, tokenB.address))
    const pairAddress = await factory.getPair(tokenA.address, tokenB.address)
    
    const pair = await  ethers.getContractAt(
      "UniswapV2Pair",
      pairAddress,
      wallet
    );

    console.log("pair Address: ", pair.address)
    const token0Address = await pair.token0();
    console.log("token0Address")
    const token0 = tokenA.address === token0Address ? tokenA : tokenB;
    const token1 = tokenA.address === token0Address ? tokenB : tokenA;
    console.log("token0: ", token0.address)
    console.log("token1: ", token1.address)

    const token0Amount = expandTo18Decimals(1);
    const token1Amount = expandTo18Decimals(4);
    console.log("tx start...")
    const tx3 = await token0.transfer(pair.address, token0Amount);
    tx3.wait();
    console.log("tx", tx.hash)
    const tx4 = await token1.transfer(pair.address, token1Amount);
    tx4.wait()
    console.log("tx1", tx4.hash)

    await (await pair.mint(wallet.address)).wait().then(data=>{
      console.log("tx3")
    }).catch(err=>console.log(err));

    // const pair = await(await ethers.getContractFactory("UniswapV2Pair")).attach(
    //   await factory.getPair(tokenA.address, tokenB.address)
    // ).deployed();

    // .attach(
    //   await factory.getPair(tokenA.address, tokenB.address)
    // );
    // await pair.deployed();
    
    // await (await pair().then(async(data)=>{
    //   console.log("pair Address: ", data.address)
    //   const token0Address = await data.token0();
    //   console.log("token0Address")
    //   const token0 = tokenA.address === token0Address ? tokenA : tokenB;
    //   const token1 = tokenA.address === token0Address ? tokenB : tokenA;
    //   console.log("token0: ", token0.address)
    //   console.log("token1: ", token1.address)

    //   const token0Amount = expandTo18Decimals(1);
    //   const token1Amount = expandTo18Decimals(4);
    //   // console.log("tx start...")
    //   // const tx = await token0.transfer(data.address, token0Amount);
    //   // tx.wait();
    //   // console.log("tx", tx.hash)
    //   // const tx1 = await token1.transfer(data.address, token1Amount);
    //   // tx1.wait()
    //   // console.log("tx1", tx1.hash)
    //   await (await data.mint(wallet.address)).wait().then(data=>{
    //     console.log("tx3")
    //   }).catch(err=>console.log(err));
    //   console.log("Here End!")
    // })

  }

  fixture()
