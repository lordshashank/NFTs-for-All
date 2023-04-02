import { useEffect, useState } from "react";
import { useWeb3Contract } from "react-moralis";
import { abi } from "constants";

const usePassNftPrice = (contractAddress) => {
  const [subscriptionPrice, setSubscriptionPrice] = useState("");
  const { runContractFunction: SubscriptionPrice } = useWeb3Contract({});
  const getSubscriptionPrice = async () => {
    const parameters = {
      abi: abi.subscriptionNft,
      contractAddress: contractAddress,
      functionName: "subscriptionPrice",
      params: {},
    };
    const result = await SubscriptionPrice({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    setSubscriptionPrice(Number(result) / 1000000000000000000);
  };

  useEffect(() => {
    getSubscriptionPrice();
  }, []);
  return { subscriptionPrice };
};

export default usePassNftPrice;
