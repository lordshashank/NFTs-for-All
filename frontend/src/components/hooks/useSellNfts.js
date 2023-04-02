import useFunctions from "./useFunctions";
import { useWeb3Contract } from "react-moralis";

const useSellNfts = () => {
  const { runContractFunction: setOnSale } = useWeb3Contract({});
  const nfts = useFunctions();
  const sell = async (tokenId, price) => {
    const result = await nfts.getSell(tokenId, price, setOnSale);
  };
  return { sell };
};

export default useSellNfts;
