import React from "react";
import useWeb3 from "../useWeb3";
import { useFetchData } from "@/pages/api/useFetchData";
import useTokenId from "../useTokenId";
import { useDispatch, useSelector } from "react-redux";
import { profilesActions } from "@/store/profile";
import { dealsActions } from "@/store/deals";
import { useEffect, useCallback } from "react";
import Loading from "../ui/Loading";
import classes from "@/styles/Explore.module.css";
import DiscoverItemsItem from "../home/DiscoverItemsItem";

const ProfileFractional = () => {
  const dispatch = useDispatch();
  const { userAccount } = useWeb3();
  const { isLoading, fetchData } = useFetchData();
  const contracts = useSelector((state) => state.deals.contracts);
  console.log(contracts);
  const { tokenIds } = useTokenId("deals");
  const fractionalNfts = useSelector((state) => state.deals.fractionalDataB);
  console.log(fractionalNfts);
  useEffect(() => {
    if (userAccount) {
      const url = `http://localhost:8000/get-fractional-contracts/${userAccount}`;
      fetchData(url, dealsActions.addContract);
    }
  }, [userAccount]);

  useEffect(() => {
    if (tokenIds !== [] && tokenIds !== null && tokenIds !== "undefined") {
      getFractionalData();
    }
  }, [tokenIds]);

  const getFractionalData = useCallback(async () => {
    console.log(1.1);
    try {
      console.log(tokenIds);
      const response = await fetch("http://localhost:8000/fractional-data", {
        method: "POST",
        body: JSON.stringify({ tokenIds: tokenIds }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await response.json();
      console.log(resData);
      dispatch(profilesActions.addFractionalData({ fractionalData: resData }));
    } catch (error) {
      console.error(error);
    }
  });
  if (!isLoading && fractionalNfts.length === 0) {
    return <h1>Data Not Found</h1>;
  }
  return (
    <div>
      {isLoading ? (
        <div className="spinner">
          <Loading />
        </div>
      ) : (
        <div className={classes["items"]}>
          {fractionalNfts.map((item) => (
            <DiscoverItemsItem
              key={item.contract.address}
              onBuyNow={() => {
                router.push(`/fractional/buy-now/${item.tokenId}`);
              }}
              nftData={item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileFractional;
