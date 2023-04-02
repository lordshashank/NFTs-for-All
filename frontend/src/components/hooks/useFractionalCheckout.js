import useFunctions from "./useFunctions";
import { useWeb3Contract } from "react-moralis";
const useFractionalCheckout = (contract) => {
  const { runContractFunction: buyTokens } = useWeb3Contract({});
  const { runContractFunction: getPrice } = useWeb3Contract({});
  const fractional = useFunctions();
  const checkoutBuy = async (parts) => {
    const result = await fractional.buyFractions(
      parts,
      contract,
      buyTokens,
      getPrice
    );
    console.log(result);
  };
  return { checkoutBuy };
};

export default useFractionalCheckout;
