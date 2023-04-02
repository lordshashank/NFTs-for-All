import React from "react";
import useWeb3 from "../hooks/useWeb3";
import { useSelector } from "react-redux";
import Loading from "../ui/Loading";
import classes from "@/styles/Explore.module.css";
import DiscoverItemsItem from "../home/DiscoverItemsItem";
import { useRouter } from "next/router";
import useFetchContract from "../hooks/useFetchContract";
import useSubscriptionNfts from "../hooks/useSubscriptionNfts";
import { v4 } from "uuid";
const ProfileSubscription = () => {
  const router = useRouter();
  const { userAccount } = useWeb3();
  const subscriptionNfts = useSelector((state) => state.deals.passData);
  const url = `http://localhost:8000/get-fractional-contracts/${userAccount}`;
  const { isLoading: isLoadingContracts } = useFetchContract(url);
  const { isLoading: isLoadingNfts } = useSubscriptionNfts();

  return (
    <div>
      {isLoadingContracts || isLoadingNfts ? (
        <div className="spinner">
          <Loading />
        </div>
      ) : (
        <div className={classes["items"]}>
          {subscriptionNfts.map((item) => (
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
