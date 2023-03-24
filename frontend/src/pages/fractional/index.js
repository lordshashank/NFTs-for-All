import DiscoverItemsItem from "@/components/home/DiscoverItemsItem";
import NavBar from "@/components/navigation/navBar";
import classes from "@/styles/Explore.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useMoralis } from "react-moralis";
import useWeb3 from "@/components/useWeb3";
const Fractional = () => {
  const nftData = useSelector((state) => state.deals.fractionalData);
  const router = useRouter();
  const { userAccount } = useWeb3();
  const getFractionalData = async () => {
    console.log(1.1);
    try {
      const response = await fetch(
        "http://localhost:8000/get-fractional-contracts",
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
        <h1>Explore Fractional Items</h1>
        <div className={classes["items"]}>
          {nftData.map((item) => (
            <DiscoverItemsItem
              onBuyNow={() => {
                router.push(`/fractional/buy-now/${item.tokenId}`);
              }}
              nftData={item}
            />
          ))}
        </div>
        <button onClick={getFractionalData}>Get Fractional Data</button>
      </div>
    </div>
  );
};

export default Fractional;
