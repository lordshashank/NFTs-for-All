import DiscoverItemsItem from "@/components/home/DiscoverItemsItem";
import NavBar from "@/components/navigation/navBar";
import classes from "@/styles/Explore.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useFetchData } from "../api/useFetchData";
import { dealsActions } from "@/store/deals";
import useWeb3 from "@/components/useWeb3";
import useTokenId from "@/components/useTokenId";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import Loading from "@/components/ui/Loading";
import { id } from "ethers/lib/utils";
const Fractional = () => {
  const dispatch = useDispatch();
  const nftData = useSelector((state) => state.deals.fractionalData);
  const fractionalData = useSelector((state) => state.deals.fractionalDataB);
  const contracts = useSelector((state) => state.deals.contracts);
  const router = useRouter();
  const { userAccount } = useWeb3();
  const { isLoading, fetchData } = useFetchData();
  const { tokenIds } = useTokenId("deals");
  useEffect(() => {
    const laodFractionalData = async () => {
      await fetchData(
        "http://localhost:8000/fractional-contracts",
        dealsActions.addContract
      );
    };
    laodFractionalData();
  }, []);
  console.log(contracts);
  // useEffect(() => {
  //   if (userAccount) {
  //     const url = `http://localhost:8000/get-fractional-contracts/${userAccount}`;
  //     fetchData(url, dealsActions.addContract);
  //   }
  // }, [userAccount]);
  useEffect(() => {
    if (tokenIds !== [] && tokenIds !== null && tokenIds !== "undefined") {
      getFractionalData();
    }
  }, [tokenIds]);

  const getFractionalData = useCallback(async () => {
    console.log(1.1);
    try {
      console.log(tokenIds);
      const response = await fetch("http://localhost:8000/fractional-data", {
        method: "POST",
        body: JSON.stringify({ tokenIds: tokenIds }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await response.json();
      console.log(resData);
      dispatch(dealsActions.addFractionalData({ fractionalData: resData }));
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className={`page ${classes["explore-page"]}`}>
      <NavBar />
      <div className={classes.box}>
        <h1>Explore Fractional Items</h1>
        {isLoading ? (
          <div className="spinner">
            <Loading />
          </div>
        ) : (
          <div className={classes["items"]}>
            {fractionalData.map((item) => (
              <DiscoverItemsItem
                key={item.contract.address}
                onBuyNow={() => {
                  router.push(`/fractional/buy-now/${item.tokenId}`);
                }}
                nftData={item}
              />
            ))}
          </div>
        )}
        {/* <button onClick={getFractionalData}>Get Fractional Data</button> */}
      </div>
    </div>
  );
};

export default Fractional;
