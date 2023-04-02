import { useEffect, useState } from "react";
import { useWeb3Contract } from "react-moralis";
import useFunctions from "./useFunctions";

const useIsOnSale = (tokenId) => {
  const [isOnSale, setIsOnSale] = useState();
  const nfts = useFunctions();
  const { runContractFunction: onSale } = useWeb3Contract({});
  useEffect(() => {
    const checkOnSale = async () => {
      const isonSale = await nfts.getisOnSale(tokenId, onSale);
      setIsOnSale(isonSale);
    };
    if (tokenId) {
      checkOnSale();
    }
  }, [tokenId]);
  return { isOnSale };
};

export default useIsOnSale;
