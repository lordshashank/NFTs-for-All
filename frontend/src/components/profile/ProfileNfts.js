import React from "react";
import classes from "@/styles/Explore.module.css";
import DiscoverItemsItem from "../home/DiscoverItemsItem";
import { useRouter } from "next/router";
import useProfileNfts from "../hooks/useProfileNfts";
import { useSelector } from "react-redux";
import Loading from "../ui/Loading";
import { v4 } from "uuid";

const ProfileNfts = () => {
  const router = useRouter();
  const nfts = useSelector((state) => state.deals.nftsData);
  const { isLoading } = useProfileNfts();

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
              key={v4()}
              onBuyNow={() => {
                router.push(`/nfts/buy-now/${item.tokenId}`);
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
