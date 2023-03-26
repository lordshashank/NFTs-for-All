const { assert, expect } = require("chai");
const { BigNumber } = require("ethers");
const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Fractional NFT Unit Tests", function () {
      let basicNft, deployer, accounts, TOKEN_URI, buyer, fractionalNft;

      beforeEach(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        buyer = accounts[1];
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

      // test 02
      describe("Mint tokens", async () => {
        it("should revert if the the number of tokens to be minted is zero", async () => {
          await expect(fractionalNft.mintTokens(0)).to.be.revertedWith(
            "zeroValue"
          );
        });
        it("Should add up the number of minted tokens to the user's account", async () => {
          const initialBalance = await fractionalNft.balanceOf(
            deployer.address
          );
          const amount = 1000;
          await fractionalNft.connect(deployer).mintTokens(amount);
          const finalBalance = await fractionalNft.balanceOf(deployer.address);
          expect(finalBalance.sub(initialBalance)).to.equal(amount);
        });
      });
      // test 03
      describe("Change Price", async () => {
        it("reverts if the user tries to change price to zero", async () => {
          await expect(fractionalNft.changePrice(0)).to.be.revertedWith(
            "zeroValue"
          );
        });
        it("should set the new price if it greater than zero", async () => {
          const newPrice = ethers.utils.parseEther("0.1");
          await fractionalNft.changePrice(newPrice);
          const price = await fractionalNft.getPrice();
          assert.equal(newPrice.toString(), price.toString());
        });
      });
      // test 04
      // describe("buyTokens", async () => {
      //   beforeEach(async () => {
      //     const amount = 1000;
      //     const sPrice = await fractionalNft.getPrice();
      //     await fractionalNft.mintTokens(amount);
      //     await fractionalNft.changePrice(sPrice);
      //   });
        // it("should allow users to buy tokens and increase their balance", async () => {
        //   const amountToMint = 1000;
        //   const sPrice1 = await fractionalNft.getPrice();
        //   await fractionalNft.mintTokens(amountToMint);
        //   await fractionalNft.changePrice(sPrice1);

        //   const amount = 10;
        //   const sPrice = await fractionalNft.getPrice();

        //   const ethToSend = BigNumber.from(amount).mul(sPrice);

        //   const initialContractBalance = await ethers.provider.getBalance(
        //     fractionalNft.address
        //   );
        //   const initialUserBalance = await fractionalNft.balanceOf(
        //     buyer.address
        //   );

        //   await fractionalNft.connect(buyer).buyTokens(amount);

        //   await expect(() =>
        //     buyer.sendTransaction({
        //       to: fractionalNft.address,
        //       value: ethToSend,
        //     })
        //   ).to.changeEtherBalance(
        //     deployer,
        //     BigNumber.from(0).sub(BigNumber.from(ethToSend))
        //   );

        //   const finalContractBalance = await ethers.provider.getBalance(
        //     fractionalNft.address
        //   );
        //   const finalUserBalance = await fractionalNft.balanceOf(
        //     deployer.address
        //   );

        //   expect(
        //     finalContractBalance.sub(initialContractBalance).toString()
        //   ).to.equal(ethToSend.toString());
        //   expect(finalUserBalance.sub(initialUserBalance).toString()).to.equal(
        //     amount.toString()
        //   );
        // });
      // });
    });
