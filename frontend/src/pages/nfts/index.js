import DiscoverItemsItem from "@/components/home/DiscoverItemsItem";
import NavBar from "@/components/navigation/navBar";
import classes from "@/styles/Explore.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFetchData } from "../api/useFetchData";
import { dealsActions } from "@/store/deals";
import { useSelector } from "react-redux";
import Loading from "@/components/ui/Loading";
import { v4 } from "uuid";
import Page from "@/components/ui/Page";
const Nfts = () => {
  const { isLoading, fetchData } = useFetchData();
  useEffect(() => {
    fetchData("http://localhost:8000/nft-data", dealsActions.addNftsData);
  }, []);

  const nftData = useSelector((state) => state.deals.nftsData);

  const router = useRouter();
  return (
    <Page>
      <h1>Explore Nfts Items</h1>
      {isLoading ? (
        <div className="spinner">
          <Loading />
        </div>
      ) : (
        <div className={classes["items"]}>
          {nftData.map((item) => (
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
    </Page>
  );
};

export default Nfts;
