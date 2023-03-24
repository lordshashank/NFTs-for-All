const { assert } = require("chai");
const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Fractional NFT Unit Tests", function () {
      let basicNft, deployer, accounts, TOKEN_URI, fractionalNft;

      beforeEach(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        await deployments.fixture(["fractionalnft"]);
        basicNft = await ethers.getContract("BasicNft");
        fractionalNft = await ethers.getContract("FractionalNft");
        TOKEN_URI = "ipfs://QmZYmH5iDbD6v3U2ixoVAjioSzvWJszDzYdbeCLquGSpVm";
      });

      describe("Constructor", () => {
        it("Initializes the NFT Correctly.", async () => {
          const name = await fractionalNft.name();
          const symbol = await fractionalNft.symbol();
          const tokenCounter = await fractionalNft.getPrice();
          const nftAddress = await fractionalNft.getNftAddress();
          assert.equal(name, "fractional");
          assert.equal(symbol, "NFA");
          assert.equal(tokenCounter.toString(), "100000000000000000");
          assert.equal(nftAddress, basicNft.address);
        });
      });
      //test02
      //   describe("Mint NFT", () => {
      //     beforeEach(async () => {
      //       const txResponse = await fractionalNft.mintNft(TOKEN_URI);
      //       await txResponse.wait(1);
      //     });
      //     it("Allows users to mint an NFT, and updates appropriately", async function () {
      //       const tokenURI = await fractionalNft.tokenURI("1");
      //       const tokenCounter = await fractionalNft.getTokenCounter();
      //       console.log("tokenCounter", tokenCounter.toString());
      //       assert.equal(tokenCounter.toString(), "1");
      //       assert.equal(tokenURI, TOKEN_URI);
      //     });
      //   });
    });
