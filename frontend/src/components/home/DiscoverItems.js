import DiscoverItemsItem from "./DiscoverItemsItem";
import classes from "../../styles/DiscoverItems.module.css";
import { useRouter } from "next/router";
import { useFetchData } from "@/pages/api/useFetchData";
import { useSelector } from "react-redux";
import { dealsActions } from "@/store/deals";

const DiscoverItems = () => {
  const { isLoading } = useFetchData(
    "http://localhost:8000/nft-data",
    dealsActions.addNftsData
  );
  const nftData = useSelector((state) => state.deals.nftsData);
  const router = useRouter();

  return (
    <div className={classes["discover-items"]}>
      <h1>Discover Items</h1>
      <div className={classes["items"]}>
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          nftData.map((item) => (
            <DiscoverItemsItem
              onBuyNow={() => {
                router.push(`/nfts/buy-now/${item.tokenId}`);
              }}
              nftData={item}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DiscoverItems;
