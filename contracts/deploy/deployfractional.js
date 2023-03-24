const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("----------------------------------------------------");
  arguments = [];
  const basicNft = await deploy("BasicNft", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  //   console.log(basicNft);
  console.log("Basic NFT done");
  log("----------------------------------------------------");
  fractionalArgs = [
    1000,
    basicNft.address,
    1,
    "100000000000000000",
    "fractional",
  ];
  const fractionalNft = await deploy("FractionalNft", {
    from: deployer,
    args: fractionalArgs,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  // Verify the deployment
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying...");
    await verify(fractionalNft.address, fractionalArgs);
  }
};

module.exports.tags = ["all", "fractionalnft", "main"];
