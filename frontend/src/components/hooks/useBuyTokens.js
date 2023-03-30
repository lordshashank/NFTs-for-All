import { useWeb3Contract } from "react-moralis";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { abi, contractAddress } from "../../../constants";
import useHandleSuccess from "./useHandleSuccess";
import { dealsActions } from "@/store/deals";
import { useDispatch } from "react-redux";
const useBuyTokens = (tokenId) => {
  const buyPrice = useSelector((state) => state.deals.buyPrice);
  const check = useSelector((state) => state.deals.check);
  const handleSuccess = useHandleSuccess();
  const dispatch = useDispatch();
  const { runContractFunction: buyTokens } = useWeb3Contract({
    abi: abi.nft,
    contractAddress: contractAddress.nft,
    functionName: "buyTokens",
    msgValue: buyPrice,
    params: { tokenId: tokenId },
  });
  useEffect(() => {
    async function buy() {
      await buyTokens({
        onSuccess: handleSuccess,
        onError: (err) => {
          console.log(err);
        },
      });
    }
    if (check) {
      buy();
      dispatch(dealsActions.setBuyPrice({ value: 10000000000000000 }));
    }
    dispatch(dealsActions.setCheck({ value: false }));
  }, [buyPrice]);
};

export default useBuyTokens;
