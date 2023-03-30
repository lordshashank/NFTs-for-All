import Web3 from "web3";
import { abi, bytecode } from "constants";
import useWeb3 from "./useWeb3";

const useDeployContract = () => {
  const { userAccount } = useWeb3();
  const provider = new Web3(Web3.givenProvider);
  const MyContract = new provider.eth.Contract(abi.subscriptionNft);
  const deployContract = async (argument) => {
    const gasPrice = await provider.eth.getGasPrice();
    console.log(gasPrice);
    console.log(userAccount);
    console.log(nftCount);
    const newContractInstance = await MyContract.deploy({
      data: bytecode.subscriptionNft,
      arguments: argument,
    }).send({
      from: userAccount,
      gas: 3000000,
      gasPrice: gasPrice,
    });
    console.log(newContractInstance);
    // setContract(newContractInstance.options.address);
    // console.log(contract);
    console.log(
      `Contract deployed at address ${newContractInstance.options.address}`
    );
    return newContractInstance.options.address;
  };

  return { deployContract };
};

export default useDeployContract;
