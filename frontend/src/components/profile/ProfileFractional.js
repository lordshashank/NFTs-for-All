import React from "react";
import useWeb3 from "../hooks/useWeb3";
import { useSelector } from "react-redux";
import Loading from "../ui/Loading";
import classes from "@/styles/Explore.module.css";
import DiscoverItemsItem from "../home/DiscoverItemsItem";
import { useRouter } from "next/router";
import { dealsActions } from "@/store/deals";
import useFractionalNfts from "../hooks/useFractionalNfts";
import useRequestActionWithUser from "../hooks/useRequestActionWithUser";
import { v4 } from "uuid";

const ProfileFractional = () => {
  const router = useRouter();
  const { userAccount } = useWeb3();
  const fractionalNfts = useSelector((state) => state.deals.fractionalData);
  const url = `http://localhost:8000/get-fractional-contracts/${userAccount}`;
  const { isLoading: isLoadingContracts } = useRequestActionWithUser(
    "get-fractional-contracts",
    dealsActions.addContract
  );
  const { isLoading: isLoadingNfts } = useFractionalNfts();

  return (
    <div>
      {isLoadingContracts || isLoadingNfts ? (
        <div className="spinner">
          <Loading />
        </div>
      ) : (
        <div className={classes["items"]}>
          {fractionalNfts.map((item) => (
            <DiscoverItemsItem
              key={v4()}
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
