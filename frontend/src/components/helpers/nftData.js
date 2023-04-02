import { useState, useEffect } from "react";
import useWeb3 from "../hooks/useWeb3";
import { contractAddress, abi } from "../../../constants";
import { useWeb3Contract } from "react-moralis";
const useNFTData = () => {
  // const [price, setPrice] = useState(0);
  // const [onSale, setOnSale] = useState(false);
  const [nftDataLoading, setNftDataLoading] = useState(true);
  const { userAccount, web3, connectWeb3, Moralis } = useWeb3();

  const { runContractFunction: getPrice } = useWeb3Contract({});
  const { runContractFunction: checkSale } = useWeb3Contract({});
  const { runContractFunction: getOwnerOfToken } = useWeb3Contract({});
  const { runContractFunction: setOnSale } = useWeb3Contract({});
  const { runContractFunction: setOffSale } = useWeb3Contract({});
  const { runContractFunction: tokenURI } = useWeb3Contract({});
  const { runContractFunction: getTokenCounter } = useWeb3Contract({});

  const price = async (tokenId) => {
    const parameters = {
      abi: abi.nft,
      contractAddress: contractAddress.nft,
      functionName: "getPrice",
      params: { tokenId: tokenId },
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

  const onSale = async (tokenId) => {
    const parameters = {
      abi: abi.nft,
      contractAddress: contractAddress.nft,
      functionName: "checkSale",
      params: { tokenId: tokenId },
    };
    const result = await checkSale({
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

  const ownerOf = async (tokenId) => {
    const parameters = {
      abi: abi.nft,
      contractAddress: contractAddress.nft,
      functionName: "getOwnerOfToken",
      params: { tokenId: tokenId },
    };
    const result = await getOwnerOfToken({
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

  const sell = async (tokenId, price) => {
    const parameters = {
      abi: abi.nft,
      contractAddress: contractAddress.nft,
      functionName: "setOnSale",
      params: { tokenId: tokenId, _price: price },
    };
    const result = await setOnSale({
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
    return "NFT on Sale";
  };

  const unsell = async (tokenId) => {
    const parameters = {
      abi: abi.nft,
      contractAddress: contractAddress.nft,
      functionName: "setOffSale",
      params: { tokenId: tokenId },
    };
    const result = await setOffSale({
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
    return "NFT off Sale";
  };

  const getURI = async (tokenId) => {
    const parameters = {
      abi: abi.nft,
      contractAddress: contractAddress.nft,
      functionName: "tokenURI",
      params: { tokenId: tokenId },
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
  };

  const currentTokenId = async () => {
    const parameters = {
      abi: abi.nft,
      contractAddress: contractAddress.nft,
      functionName: "getTokenCounter",
      params: {},
    };
    const result = await getTokenCounter({
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

  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(() => {
  //     const getNFTData = async () => {
  //       const contract = new Moralis.Web3.eth.Contract(abi, contractAddress);
  //       const nftData = await contract.methods.getNFTData().call();
  //       setNftData(nftData);
  //       setNftDataLoading(false);
  //     };
  //     if (isWeb3Enabled) {
  //       getNFTData();
  //     }
  //   }, [isWeb3Enabled]);
  return { price, onSale, ownerOf, sell, unsell, getURI, currentTokenId };
};

export default useNFTData;
