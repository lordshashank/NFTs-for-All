import DiscoverItemsItem from "@/components/home/DiscoverItemsItem";
import NavBar from "@/components/navigation/navBar";
import { dealsActions } from "@/store/deals";
import classes from "@/styles/Explore.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useFetchData } from "../api/useFetchData";
import { useEffect } from "react";
import Loading from "@/components/ui/Loading";
import { v4 } from "uuid";

const Pass = () => {
  const { isLoading, fetchData } = useFetchData();
  useEffect(() => {
    fetchData(
      "http://localhost:8000/subscriptional-nfts",
      dealsActions.addPassData
    );
  }, []);
  const passData = useSelector((state) => state.deals.passData);
  const router = useRouter();
  // const { userAccount } = useWeb3();
  // const getSubscriptionData = async () => {
  //   console.log("started");
  //   try {
  //     const response = await fetch(
  //       "http://localhost:8000/get-Subscription-contracts",
  //       {
  //         method: "POST",
  //         body: JSON.stringify({ owner: userAccount }),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const resData = await response.json();
  //     console.log(resData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className={`page ${classes["explore-page"]}`}>
      <NavBar />
      <div className={classes.box}>
        <h1>Explore Pass Items</h1>
        {isLoading ? (
          <div className="spinner">
            <Loading />
          </div>
        ) : (
          <div className={classes["items"]}>
            {passData.map((item) => (
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
        {passData.length === 0 && !isLoading && <h1>No Data Found.</h1>}
      </div>
    </div>
  );
};

export default Pass;
