import DiscoverItemsItem from "@/components/home/DiscoverItemsItem";
import NavBar from "@/components/navigation/navBar";
import classes from "@/styles/Explore.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Loading from "@/components/ui/Loading";
import useFractionalNfts from "@/components/hooks/useFractionalNfts";
import useFetchAllFractionalContracts from "@/components/hooks/useFetchAllFractionalContracts";
import Page from "@/components/ui/Page";
import { v4 } from "uuid";
const Fractional = () => {
  const { isLoading: isLoadingNfts } = useFractionalNfts();
  const fractionalData = useSelector((state) => state.deals.fractionalData);
  const router = useRouter();
  const { isLoading: isLoadingContracts } = useFetchAllFractionalContracts();

  return (
    <Page>
      <h1>Explore Fractional Items</h1>
      {isLoadingNfts || isLoadingContracts ? (
        <div className="spinner">
          <Loading />
        </div>
      ) : (
        <div className={classes["items"]}>
          {fractionalData.map((item) => (
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
    </Page>
  );
};

export default Fractional;
