import { useEffect, useState } from "react";
import { abi } from "constants";
import { useWeb3Contract } from "react-moralis";
const useTokensAvailable = (contract) => {
  const [tokensAvailable, setTokensAvailable] = useState("");
  const { runContractFunction: totalSupply } = useWeb3Contract({});
  const totalTokens = async () => {
    const parameters = {
      abi: abi.fractionalNft,
      contractAddress: contract,
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
    console.log(Number(result));
    setTokensAvailable(Number(result));
  };
  useEffect(() => {
    totalTokens();
  }, []);
  return { tokensAvailable };
};

export default useTokensAvailable;
