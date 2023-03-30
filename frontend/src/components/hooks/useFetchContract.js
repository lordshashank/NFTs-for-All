import useWeb3 from "./useWeb3";
import { dealsActions } from "@/store/deals";
import { useEffect } from "react";
import { useFetchData } from "@/pages/api/useFetchData";

const useFetchContract = (url) => {
  const { userAccount } = useWeb3();
  const { isLoading, fetchData } = useFetchData();

  useEffect(() => {
    if (userAccount) {
      fetchData(url, dealsActions.addContract);
    }
  }, [userAccount]);
  return { isLoading };
};

export default useFetchContract;
