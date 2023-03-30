import { useEffect } from "react";
import { useFetchData } from "@/pages/api/useFetchData";
import { dealsActions } from "@/store/deals";

const useFetchAllFractionalContracts = () => {
  const { isLoading, fetchData } = useFetchData();
  useEffect(() => {
    const laodFractionalData = async () => {
      await fetchData(
        "http://localhost:8000/fractional-contracts",
        dealsActions.addContract
      );
    };
    laodFractionalData();
  }, []);
  return { isLoading };
};

export default useFetchAllFractionalContracts;
