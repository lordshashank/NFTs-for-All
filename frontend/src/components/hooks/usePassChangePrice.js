import { useWeb3Contract } from "react-moralis";
import useFunctions from "./useFunctions";
const usePassChangePrice = () => {
  const { runContractFunction: changeSubscriptionPrice } = useWeb3Contract({});
  const pass = useFunctions();

  const setChangePrice = async (newPrice) => {
    const result = await pass.setChangePrice(newPrice, changeSubscriptionPrice);
    console.log(result);
  };
  return { setChangePrice };
};

export default usePassChangePrice;
