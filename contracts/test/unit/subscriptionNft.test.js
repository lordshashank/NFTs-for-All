const { assert } = require("chai");
const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Subscription NFT Unit Tests", function () {
      let subscriptionNft, deployer, accounts, TOKEN_URI;

      beforeEach(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        await deployments.fixture(["subscriptionnft"]);
        subscriptionNft = await ethers.getContract("SubscriptionNft");
        TOKEN_URI = "ipfs://QmZYmH5iDbD6v3U2ixoVAjioSzvWJszDzYdbeCLquGSpVm";
      });

      describe("Constructor", () => {
        it("Initializes the NFT Correctly.", async () => {
          const name = await subscriptionNft.name();
          const symbol = await subscriptionNft.symbol();
          const subscriptionPrice = await subscriptionNft.subscriptionPrice();
          assert.equal(name, "NFTS");
          assert.equal(symbol, "NFA");
          assert.equal(subscriptionPrice.toString(), "10000000000000000");
        });
      });
      //test02
      //   describe("Mint NFT", () => {
      //     beforeEach(async () => {
      //       const txResponse = await subscriptionNft.mintNft(TOKEN_URI);
      //       await txResponse.wait(1);
      //     });
      //     it("Allows users to mint an NFT, and updates appropriately", async function () {
      //       const tokenURI = await subscriptionNft.tokenURI("1");
      //       const tokenCounter = await subscriptionNft.getTokenCounter();
      //       console.log("tokenCounter", tokenCounter.toString());
      //       assert.equal(tokenCounter.toString(), "1");
      //       assert.equal(tokenURI, TOKEN_URI);
      //     });
      //   });
    });
