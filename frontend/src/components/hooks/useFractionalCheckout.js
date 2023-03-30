import { abi, contractAddress } from "constants";
import { useWeb3Contract } from "react-moralis";
import useHandleSuccess from "./useHandleSuccess";
import { dealsActions } from "@/store/deals";
import { useDispatch } from "react-redux";
const useFractionalCheckout = (tokenId) => {
  const amount = 0;
  const dispatch = useDispatch();
  const { runContractFunction: buyTokens } = useWeb3Contract({});
  const { runContractFunction: getPrice } = useWeb3Contract({
    abi: abi.fractionalNft,
    contractAddress: contractAddress.fractionalNft,
    functionName: "getPrice",
    params: {},
  });
  const handleSuccess = useHandleSuccess();
  const checkoutBuy = async (parts) => {
    let buyPrice = 10000000000000000;
    buyPrice = buyPrice * parts;
    const parameters = {
      abi: abi.fractionalNft,
      contractAddress: contractAddress.fractionalNft,
      functionName: "buyTokens",
      msgValue: buyPrice,
      params: { amount: amount },
    };
    await buyTokens({
      params: parameters,
      onSuccess: () => {
        handleSuccess();
        dispatch(
          dealsActions.reducePartsAvailable({
            tokenId: tokenId,
            parts: parts,
          })
        );
      },
      onError: (err) => {
        console.log(err);
      },
    });
    const bigNumber = await getPrice();
    buyPrice = Number(bigNumber) * amount;
  };

  return { checkoutBuy };
};

export default useFractionalCheckout;
