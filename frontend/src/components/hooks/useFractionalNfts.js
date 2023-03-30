import useTokenId from "./useTokenId";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { dealsActions } from "@/store/deals";

const useFractionalNfts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { tokenIds } = useTokenId();
  const dispatch = useDispatch();

  const getFractionalData = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log(tokenIds);
      const response = await fetch("http://localhost:8000/fractional-data", {
        method: "POST",
        body: JSON.stringify({ tokenIds: tokenIds }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await response.json();
      if (response.ok) {
        dispatch(dealsActions.addFractionalData({ fractionalData: resData }));
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  });
  useEffect(() => {
    if (tokenIds.length > 0 && tokenIds !== NaN) {
      getFractionalData();
    }
  }, [tokenIds]);
  return { isLoading };
};

export default useFractionalNfts;
