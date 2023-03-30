import { useEffect } from "react";
import useWeb3 from "./useWeb3";
import { dealsActions } from "@/store/deals";
import { useFetchData } from "@/pages/api/useFetchData";

const useProfileNfts = () => {
  const { userAccount } = useWeb3();
  const { isLoading, fetchData } = useFetchData();

  useEffect(() => {
    const loadData = () => {
      const url = `http://localhost:8000/profile-nfts/${userAccount}`;
      fetchData(url, dealsActions.addNftsData);
    };
    if (userAccount) {
      loadData();
    }
  }, [userAccount]);

  return { isLoading };
};

export default useProfileNfts;
