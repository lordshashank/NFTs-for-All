import { dealsActions } from "@/store/deals";
import React from "react";
import { useSelector } from "react-redux";
import useRequestActionWithUser from "../hooks/useRequestActionWithUser";
import Loading from "../ui/Loading";
import classes from "@/styles/Explore.module.css";
import DiscoverItemsItem from "../home/DiscoverItemsItem";
import { v4 } from "uuid";

const ProfileSubscription = () => {
  const { isLoading } = useRequestActionWithUser(
    "profile-subscription-nfts",
    dealsActions.addPassData
  );
  const nfts = useSelector((state) => state.deals.passData);
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
                router.push(`/pass/buy-now/${item.tokenId}`);
              }}
              nftData={item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileSubscription;
