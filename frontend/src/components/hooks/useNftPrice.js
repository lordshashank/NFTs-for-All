import { useEffect, useState } from "react";
import { abi } from "constants";
import { useWeb3Contract } from "react-moralis";
const useNftPrice = (contractAddress) => {
  const { runContractFunction: getPrice } = useWeb3Contract({});
  const [nftPrice, setNftPrice] = useState("");
  const price = async () => {
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
    console.log(Number(result));
    setNftPrice(Number(result) / 1000000000000000000);
  };
  useEffect(() => {
    price();
  }, []);
  return { nftPrice };
};

export default useNftPrice;
