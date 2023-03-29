import Web3 from "web3";
import { abi, bytecode } from "constants";
import useWeb3 from "./useWeb3";
import { buyNowActions } from "@/store/buyNow";
import { useDispatch } from "react-redux";

const useFractionalize = () => {
  const { userAccount } = useWeb3();
  const dispatch = useDispatch();
  const provider = new Web3(Web3.givenProvider);
  const MyContract = new provider.eth.Contract(abi.fractionalNft);
  const fractionalize = async (
    initialSupply,
    token,
    tokenId,
    listPrice,
    name
  ) => {
    const gasPrice = await provider.eth.getGasPrice();
    const newContractInstance = await MyContract.deploy({
      data: bytecode.fractionalNft,
      arguments: [initialSupply, token, tokenId, listPrice, name],
    }).send({
      from: userAccount,
      gas: 3000000,
      gasPrice: gasPrice,
    });
    console.log(
      `Contract deployed at address ${newContractInstance.options.address}`
    );
    dispatch(buyNowActions.onDismiss());
    return newContractInstance.options.address;
  };

  return fractionalize;
};

export default useFractionalize;
