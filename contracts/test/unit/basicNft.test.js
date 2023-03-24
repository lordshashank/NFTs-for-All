const { assert } = require("chai");
const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Basic NFT Unit Tests", function () {
      let basicNft, deployer, accounts, TOKEN_URI;

      beforeEach(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        await deployments.fixture(["basicnft"]);
        basicNft = await ethers.getContract("BasicNft");
        TOKEN_URI = "ipfs://QmZYmH5iDbD6v3U2ixoVAjioSzvWJszDzYdbeCLquGSpVm";
      });

      describe("Constructor", () => {
        it("Initializes the NFT Correctly.", async () => {
          const name = await basicNft.name();
          const symbol = await basicNft.symbol();
          const tokenCounter = await basicNft.getTokenCounter();
          assert.equal(name, "NFTS");
          assert.equal(symbol, "NFA");
          assert.equal(tokenCounter.toString(), "0");
        });
      });
      //test02
      describe("Mint NFT", () => {
        beforeEach(async () => {
          const txResponse = await basicNft.mintNft(TOKEN_URI);
          await txResponse.wait(1);
        });
        it("Allows users to mint an NFT, and updates appropriately", async function () {
          const tokenURI = await basicNft.tokenURI("1");
          const tokenCounter = await basicNft.getTokenCounter();
          console.log("tokenCounter", tokenCounter.toString());
          assert.equal(tokenCounter.toString(), "1");
          assert.equal(tokenURI, TOKEN_URI);
        });
      });
    });
