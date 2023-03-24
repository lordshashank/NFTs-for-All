import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { dealsActions } from "@/store/deals";

export const useFetchData = (url, relAction) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const resData = await response.json();
        dispatch(relAction({ nftsData: resData }));
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return { isLoading };
};
