import { useState, useEffect } from "react";
import useWeb3 from "./useWeb3";
import { abi } from "../../constants";
import { useWeb3Contract } from "react-moralis";

const useSubscriptionData = (contractAddress) => {
  const [subscriptionDataLoading, setSubscriptionDataLoading] = useState(true);
  const { userAccount, web3, connectWeb3, Moralis } = useWeb3();
  const { runContractFunction: tokenURI } = useWeb3Contract({});
  const { runContractFunction: owner } = useWeb3Contract({});
  const { runContractFunction: subscriptionPrice } = useWeb3Contract({});
  const { runContractFunction: timeLeft } = useWeb3Contract({});
  const { runContractFunction: isSubscribed } = useWeb3Contract({});
  const { runContractFunction: transferSubscription } = useWeb3Contract({});
  const { runContractFunction: changeSubscriptionPrice } = useWeb3Contract({});
  const { runContractFunction: withdraw } = useWeb3Contract({});
  const { runContractFunction: subscribe } = useWeb3Contract({});

  const getURI = async () => {
    console.log(contractAddress);
    const parameters = {
      abi: abi.subscriptionNft,
      contractAddress: contractAddress,
      functionName: "tokenURI",
      params: { "": 0 },
    };
    const result = await tokenURI({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    return result;
    // return "done";
  };

  const getOwner = async () => {
    const parameters = {
      abi: abi.subscriptionNft,
      contractAddress: contractAddress,
      functionName: "owner",
      params: {},
    };
    const result = await owner({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    return result;
  };

  const getSubscriptionPrice = async () => {
    const parameters = {
      abi: abi.subscriptionNft,
      contractAddress: contractAddress,
      functionName: "subscriptionPrice",
      params: {},
    };
    const result = await subscriptionPrice({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    return Number(result);
  };

  const getTimeLeft = async (subscriber) => {
    const parameters = {
      abi: abi.subscriptionNft,
      contractAddress: contractAddress,
      functionName: "timeLeft",
      params: { _subscriber: subscriber },
    };
    const result = await timeLeft({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    return Number(result);
  };

  const getIsSubscribed = async (subscriber) => {
    const parameters = {
      abi: abi.subscriptionNft,
      contractAddress: contractAddress,
      functionName: "isSubscribed",
      params: { _subscriber: subscriber },
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
    return result;
  };

  const getTransferSubscription = async (newOwner) => {
    const parameters = {
      abi: abi.subscriptionNft,
      contractAddress: contractAddress,
      functionName: "transferSubscription",
      params: { _to: newOwner },
    };
    const result = await transferSubscription({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    return "subscription transferred";
  };

  const changePrice = async (newPrice) => {
    if ((await getOwner()) !== userAccount) return "not owner";
    const parameters = {
      abi: abi.subscriptionNft,
      contractAddress: contractAddress,
      functionName: "changeSubscriptionPrice",
      params: { _newPrice: newPrice },
    };
    const result = await changeSubscriptionPrice({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    return "price changed";
  };

  const getWithdraw = async () => {
    if ((await getOwner()) !== userAccount) return "not owner";
    const parameters = {
      abi: abi.subscriptionNft,
      contractAddress: contractAddress,
      functionName: "withdraw",
      params: {},
    };
    const result = await withdraw({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    return "withdrawn";
  };

  const getSubscription = async () => {
    const value = await getSubscriptionPrice();
    const parameters = {
      abi: abi.subscriptionNft,
      contractAddress: contractAddress,
      functionName: "subscribe",
      msgValue: value,
      params: {},
    };

    const result = await subscribe({
      params: parameters,
      onSuccess: () => {
        console.log("success");
        handleSuccess();
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    return "subscribed";
  };
  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getURI,
    getOwner,
    getSubscriptionPrice,
    getTimeLeft,
    getIsSubscribed,
    getTransferSubscription,
    changePrice,
    getWithdraw,
    getSubscription,
  };
};

export default useSubscriptionData;
