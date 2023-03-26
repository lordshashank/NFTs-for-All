import React, { useEffect } from "react";
import classes from "@/styles/Explore.module.css";
import { useState } from "react";
import DiscoverItemsItem from "../home/DiscoverItemsItem";
import { useFetchData } from "@/pages/api/useFetchData";
import useWeb3 from "../useWeb3";
import { profilesActions } from "@/store/profile";
import { useSelector } from "react-redux";
import Loading from "../ui/Loading";

const ProfileNfts = () => {
  const { isLoading, fetchData } = useFetchData();
  const { userAccount } = useWeb3();
  console.log(userAccount);
  const nfts = useSelector((state) => state.profile.nfts);
  console.log(nfts);
  useEffect(() => {
    const loadData = () => {
      const url = `http://localhost:8000/profile-nfts/${userAccount}`;
      const url1 = `http://localhost:8000/profile-nfts/0x9299eac94952235Ae86b94122D2f7c77F7F6Ad30`;
      fetchData(url1, profilesActions.addNftsData);
    };
    if (userAccount) {
      loadData();
    }
  }, [userAccount]);

  if (!isLoading && nfts.length === 0) {
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
          {nfts.map((item) => (
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

export default ProfileNfts;
