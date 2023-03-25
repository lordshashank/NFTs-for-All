import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { dealsActions } from "@/store/deals";

export const useFetchData = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async (url, relAction) => {
    try {
      const response = await fetch(url);
      const resData = await response.json();
      console.log(resData);
      dispatch(relAction({ nftsData: resData }));
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  return { isLoading, fetchData };
};
