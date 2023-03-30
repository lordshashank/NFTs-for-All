import { useWeb3Contract } from "react-moralis";
import { abi, contractAddress } from "constants";
import { dealsActions } from "@/store/deals";
import { useDispatch } from "react-redux";
import { buyNowActions } from "@/store/buyNow";

const useNftCheckout = (tokenId) => {
  const dispatch = useDispatch();
  const { runContractFunction: getPrice } = useWeb3Contract({
    abi: abi.nft,
    contractAddress: contractAddress.nft,
    functionName: "getPrice",
    params: { tokenId: tokenId },
  });
  const { runContractFunction: checkSale } = useWeb3Contract({
    abi: abi.nft,
    contractAddress: contractAddress.nft,
    functionName: "checkSale",
    params: { tokenId: tokenId },
  });
  const checkoutBuy = async () => {
    dispatch(dealsActions.setCheck({ value: true }));
    console.log("This is nfts buy button.");
    const bigNumber = await getPrice();
    dispatch(dealsActions.setBuyPrice({ value: Number(bigNumber) }));
    console.log(Number(bigNumber));
    // activateBuy = await checkSale();
    // console.log(activateBuy);
    dispatch(buyNowActions.onDismiss());
  };

  return { checkoutBuy };
};

export default useNftCheckout;
