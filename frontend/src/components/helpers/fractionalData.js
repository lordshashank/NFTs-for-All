import { useState, useEffect } from "react";
import useWeb3 from "../hooks/useWeb3";
import { abi, contractAddress } from "../../../constants";
import { useWeb3Contract } from "react-moralis";

const useFractionalData = () => {
  const [fractionalDataLoading, setFractionalDataLoading] = useState(true);
  const { userAccount, web3, connectWeb3, Moralis } = useWeb3();
  const { runContractFunction: getPrice } = useWeb3Contract({});
  const { runContractFunction: getNftAddress } = useWeb3Contract({});
  const { runContractFunction: getTokenId } = useWeb3Contract({});
  const { runContractFunction: owner } = useWeb3Contract({});
  const { runContractFunction: changePrice } = useWeb3Contract({});

  const price = async (contractAddress) => {
    // console.log("start");
    const parameters = {
      abi: abi.fractionalNft,
      contractAddress: contractAddress,
      functionName: "getPrice",
      params: {},
    };
    const result = await getPrice({
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

  const nftAddress = async (contractAddress) => {
    const parameters = {
      abi: abi.fractionalNft,
      contractAddress: contractAddress,
      functionName: "getNftAddress",
      params: {},
    };
    const result = await getNftAddress({
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

  const tokenId = async (contractAddress) => {
    const parameters = {
      abi: abi.fractionalNft,
      contractAddress: contractAddress,
      functionName: "getTokenId",
      params: {},
    };
    const result = await getTokenId({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    return Number(result);
  };

  const ownerOf = async (contractAddress) => {
    const parameters = {
      abi: abi.fractionalNft,
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
  const totalTokens = async (contractAddress) => {
    const parameters = {
      abi: abi.fractionalNft,
      contractAddress: contractAddress,
      functionName: "totalSupply",
      params: {},
    };
    const result = await totalSupply({
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

  const setPrice = async (newPrice, contractAddress) => {
    if ((await ownerOf()) !== userAccount) {
      return "You are not the owner of this fractional NFT";
    }
    const parameters = {
      abi: abi.fractionalNft,
      contractAddress: contractAddress,
      functionName: "changePrice",
      params: { newPrice: newPrice },
    };
    const result = await changePrice({
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
    f;
    return "Price changed successfully";
  };
  const buyFractions = async (parts, contractAddress) => {
    buyPrice = await price(contractAddress);
    buyPrice = buyPrice * parts;
    const parameters = {
      abi: abi.fractionalNft,
      contractAddress: contractAddress,
      functionName: "buyTokens",
      msgValue: buyPrice,
      params: { amount: parts },
    };
    await buyTokens({
      params: parameters,
      onSuccess: () => {
        handleSuccess();
      },
      onError: (err) => {
        console.log(err);
      },
    });
    return `${parts} tokens bought`;
  };
  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
    } catch (error) {
      console.log(error);
    }
  };

  return { price, nftAddress, tokenId, ownerOf, setPrice };
};

export default useFractionalData;
