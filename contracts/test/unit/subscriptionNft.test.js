const { assert, expect } = require("chai");
const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Subscription NFT Unit Tests", function () {
      let subscriptionNft, deployer, accounts, TOKEN_URI;

      beforeEach(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        buyer = accounts[1];
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

      // test 02
      describe("Subscribe", () => {
        let subscriptionPrice, nftCount;
        beforeEach(async function () {
          subscriptionPrice = ethers.utils.parseEther("1");
          nftCount = 10;
          subscriptionDuration = 60 * 60 * 24 * 10; // 30 days in seconds
        });
        it("reverts if sent value is less than the price", async () => {
          expect(
            subscriptionNft.subscribe({ value: subscriptionPrice - 1 })
          ).to.be.revertedWith("InsufficientBalance");
        });
        it("Should revert if the subscription is already active", async () => {
          // await subscriptionNft.subscribe({ value: subscriptionPrice });
          expect(
            await subscriptionNft.subscribe({ value: subscriptionPrice })
          ).to.be.revertedWith("SubscriptionAlreadyActive");
        });
        // it("Should mint a NFT and update user's subscription expiry time", async () => {
        //   await subscriptionNft.subscribe({ value: subscriptionPrice });
        //   const subscriptionExpiry = await subscriptionNft.subscriptionExpiry(
        //     deployer.address
        //   );
        //   const expectedExpiry =
        //     (await ethers.provider.getBlock().timestamp) + subscriptionDuration;
        //   // expect(subscriptionExpiry).to.equal(expectedExpiry);
        //   const owner = await subscriptionNft.ownerOf(1);
        //   expect(owner.toString()).to.equal(deployer.address.toString());
        // });
      });
      describe("TransferSubscription", () => {
        let subscriptionPrice, nftCount;
        beforeEach(async function () {
          subscriptionPrice = ethers.utils.parseEther("1");
          nftCount = 10;
          subscriptionDuration = 60 * 60 * 24 * 10; // 30 days in seconds
        });
        it("should transfer a subscription from one address to another", async function () {
          // Subscribe from the first account
          await subscriptionNft.subscribe({ value: subscriptionPrice });
          const subscriptionExpiry1 = await subscriptionNft.subscriptionExpiry(
            accounts[0].address
          );
          const subscriptionExpiry2 = await subscriptionNft.subscriptionExpiry(
            accounts[1].address
          );

          // Transfer the subscription from the first account to the second account
          await subscriptionNft
            .connect(accounts[0])
            .transferSubscription(accounts[1].address);

          // Check that the subscription is now active on the second account
          const isSubscribed1 = await subscriptionNft.isSubscribed(
            accounts[0].address
          );
          const isSubscribed2 = await subscriptionNft.isSubscribed(
            accounts[1].address
          );
          const subscriptionExpiry1New =
            await subscriptionNft.subscriptionExpiry(accounts[0].address);
          const subscriptionExpiry2New =
            await subscriptionNft.subscriptionExpiry(accounts[1].address);
          expect(isSubscribed1).to.be.false;
          expect(isSubscribed2).to.be.true;
          expect(subscriptionExpiry2New).to.equal(subscriptionExpiry1);
          expect(subscriptionExpiry1New).to.equal(0);
        });
      });
      describe("Change Subscription Price", () => {
        it("", async () => {
          const newPrice = 2000;

          await subscriptionNft
            .connect(deployer)
            .changeSubscriptionPrice(newPrice);
          const price = await subscriptionNft.subscriptionPrice();

          expect(price).to.equal(newPrice);
        });

        it("should not allow a non-owner to change the subscription price", async function () {
          const newPrice = 2000;

          await expect(
            subscriptionNft.connect(buyer).changeSubscriptionPrice(newPrice)
          ).to.be.revertedWith("Ownable: caller is not the owner");
        });

        it("should not allow the owner to set a subscription price of zero", async function () {
          const newPrice = 0;

          await expect(
            subscriptionNft.connect(deployer).changeSubscriptionPrice(newPrice)
          ).to.be.revertedWith("InsufficientBalance");
        });
      });
    });
