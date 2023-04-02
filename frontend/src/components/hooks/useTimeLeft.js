import { abi } from "constants";
import { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import useWeb3 from "./useWeb3";
const useTimeLeft = (contractAddress) => {
  const [timeLeft, setTimeLeft] = useState("");
  const { runContracFunction: TimeLeft } = useWeb3Contract({});
  const { userAccount } = useWeb3();
  const getTimeLeft = async () => {
    const parameters = {
      abi: abi.subscriptionNft,
      contractAddress: contractAddress,
      functionName: "timeLeft",
      params: { _subscriber: userAccount },
    };
    const result = await TimeLeft({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    setTimeLeft(Number(result));
  };
  return { timeLeft, getTimeLeft };
};

export default useTimeLeft;
