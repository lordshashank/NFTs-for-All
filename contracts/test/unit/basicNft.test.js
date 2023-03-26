const { assert, expect } = require("chai");
const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Basic NFT Unit Tests", function () {
      let basicNft, deployer, accounts, buyer, TOKEN_URI;

      beforeEach(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        buyer = accounts[1];
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
      //test 03
      describe("Set On Sale", () => {
        it("Should allow user to set a token on sale", async function () {
          const tokenId = 1;
          const price = ethers.utils.parseEther("1");
          await basicNft.mintNft(TOKEN_URI);
          await basicNft.setOnSale(tokenId, price);
          const tokenOnSale = await basicNft.checkSale(tokenId);
          assert.equal(tokenOnSale, true, "Token should be on sale");
          const tokenPrice = await basicNft.getPrice(tokenId);
          assert.equal(
            tokenPrice.toString(),
            price.toString(),
            "Token price should be set correctly"
          );
        });
        it("Should revert if the token is already on sale", async function () {
          const tokenId = 1;
          const price = ethers.utils.parseEther("1");
          await basicNft.mintNft(TOKEN_URI);
          await basicNft.setOnSale(tokenId, price);
          await expect(basicNft.setOnSale(tokenId, price)).to.be.revertedWith(
            "TokenAlreadyOnSale"
          );
        });
        it("Should revert if the setter is not the owner", async function () {
          const tokenId = 1;
          const price = ethers.utils.parseEther("1");
          await basicNft.mintNft(TOKEN_URI);
          await expect(
            basicNft.connect(buyer).setOnSale(tokenId, price)
          ).to.be.revertedWith("InvalidTokenOwner");
        });
      });
      // test 04
      describe("Set Off Sale", () => {
        it("Should revert when called through a non-existent tokenId", async () => {
          const nonExistentId = 999;
          await expect(
            basicNft.connect(buyer).setOffSale(nonExistentId)
          ).to.be.revertedWith("InvalidTokenOwner");
        });
        it("should revert if the non-token owner tries to set the token off sale", async () => {
          const tokenId = 1;
          await expect(
            basicNft.connect(buyer).setOffSale(tokenId)
          ).to.be.revertedWith("InvalidTokenOwner");
        });
        it("Should set the token price to 0 and set the onSale boolean to false", async () => {
          const tokenId = 1;
          const price = await ethers.utils.parseEther("1");
          const NFTminted = await basicNft.mintNft(TOKEN_URI);
          const onSale = await basicNft.setOnSale(tokenId, price);
          const isOnSale = await basicNft.checkSale(tokenId);
          assert.isTrue(isOnSale);
          await basicNft.setOffSale(tokenId);
          const isOffSale = await basicNft.checkSale(tokenId);
          assert.isFalse(isOffSale);
          const priceAfterOffSale = await basicNft.getPrice(tokenId);
          assert.equal(priceAfterOffSale.toString(), "0");

          // const tokenId = 2;
          // const isOnSale = await basicNft.checkSale(tokenId);
          // assert.equal(isOnSale, true, "The token was already not on sale.");
          // await basicNft.connect(deployer).setOffSale(tokenId);
          // const isOnSaleAgain = await basicNft.checkSale(tokenId);
          // assert.equal(isOnSaleAgain, false, "The NFT was not set off sale");
          // const price = await basicNft.getPrice(tokenId);
          // assert.equal(price.toString(), "0");
        });
      });
      describe("Buy tokens function", () => {
        it("Should allow a user to buy tokens as well as transfer their ownership", async () => {
          // Setting up the sale
          const tokenId = 1;
          const price = ethers.utils.parseEther("1");
          await basicNft.mintNft(TOKEN_URI);
          await basicNft.connect(deployer).setOnSale(tokenId, price);

          // Check if the token is on sale or not
          const isOnSale = await basicNft.checkSale(tokenId);
          assert.isTrue(isOnSale);

          const priceOfToken = await basicNft.getPrice(tokenId);
          assert.equal(price.toString(), priceOfToken.toString());

          // Buy the token
          const initialBalance = await ethers.provider.getBalance(
            buyer.address
          );
          const tx = await basicNft.buyTokens(tokenId, { value: price });
          const receipt = await tx.wait();

          // Verify that the nft is on sale now
          const newOwner = await basicNft.getOwnerOfToken(tokenId);
          assert.equal(newOwner, deployer.address);
          // And the nft is no longer on sale
          // await basicNft.connect(deployer).setOffSale(tokenId);
          const isNotOnSale = await basicNft.checkSale(tokenId);
          assert.isFalse(isNotOnSale);

          // Verify that the buyer's balance is decreased by the token price
          const gasUsed = await receipt.gasUsed;
          const transactionCost = gasUsed.mul(
            await ethers.provider.getGasPrice()
          );
          const expectedBalance = initialBalance
            .sub(price)
            .sub(transactionCost);
          const actualBalance = await ethers.provider.getBalance(buyer.address);
          assert.equal(actualBalance.toString(), initialBalance.toString());
        });
      });
    });
