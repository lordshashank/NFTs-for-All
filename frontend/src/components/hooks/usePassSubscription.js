import useFunctions from "./useFunctions";
import { useWeb3Contract } from "react-moralis";
const usePassSubscription = (contract) => {
  const { runContractFunction: subscribe } = useWeb3Contract({});
  const { runContractFunction: subscriptionPrice } = useWeb3Contract({});
  const pass = useFunctions();
  const getSubscription = async () => {
    const result = await pass.getSubscription(
      subscriptionPrice,
      subscribe,
      contract
    );
    console.log(result);
  };
  return { getSubscription };
};

export default usePassSubscription;
