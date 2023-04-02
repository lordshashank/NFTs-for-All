import { abi } from "constants";
import { useEffect, useState } from "react";
import { useWeb3Contract } from "react-moralis";
import useWeb3 from "./useWeb3";

const usePassIsSubscribed = (contractAddress) => {
  const { runContractFunction: isSubscribed } = useWeb3Contract({});
  const [nftIsSubscribed, setNftIsSubscribed] = useState(false);
  const { userAccount } = useWeb3();
  const getIsSubscribed = async () => {
    const parameters = {
      abi: abi.subscriptionNft,
      contractAddress: contractAddress,
      functionName: "isSubscribed",
      params: { _subscriber: userAccount },
    };
    const result = await isSubscribed({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);

    setNftIsSubscribed(result);
  };
  useEffect(() => {
    if (userAccount) {
      getIsSubscribed();
    }
  }, [userAccount]);
  return { nftIsSubscribed };
};

export default usePassIsSubscribed;
