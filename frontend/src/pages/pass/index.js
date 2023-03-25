import DiscoverItemsItem from "@/components/home/DiscoverItemsItem";
import NavBar from "@/components/navigation/navBar";
import { dealsActions } from "@/store/deals";
import classes from "@/styles/Explore.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useFetchData } from "../api/useFetchData";
import useWeb3 from "@/components/useWeb3";
const Pass = () => {
  const { isLoading } = useFetchData(
    "http://localhost:8000/pass-data",
    dealsActions.addPassData
  );
  const { userAccount } = useWeb3();
  const passData = useSelector((state) => state.deals.passData);
  console.log(passData);
  const router = useRouter();
  const buyNow = () => {
    router.push("/pass/buy-now");
  };
  const getSubscriptionData = async () => {
    console.log("started");
    try {
      const response = await fetch(
        "http://localhost:8000/get-Subscription-contracts",
        {
          method: "POST",
          body: JSON.stringify({ owner: userAccount }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await response.json();
      console.log(resData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`page ${classes["explore-page"]}`}>
      <NavBar />
      <div className={classes.box}>
        <h1>Explore Pass Items</h1>
        <div className={classes["items"]}>
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            passData.map((item) => (
              <DiscoverItemsItem
                onBuyNow={() => {
                  router.push(`/pass/buy-now/${item.tokenId}`);
                }}
                nftData={item}
              />
            ))
          )}
          {passData.length === 0 && !isLoading && <h1>No Data Found.</h1>}
        </div>

        <button onClick={getSubscriptionData}>Get Subscription Data</button>
      </div>
    </div>
  );
};

export default Pass;