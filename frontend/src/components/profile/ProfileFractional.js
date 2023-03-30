import React from "react";
import useWeb3 from "../hooks/useWeb3";
import { useSelector } from "react-redux";
import Loading from "../ui/Loading";
import classes from "@/styles/Explore.module.css";
import DiscoverItemsItem from "../home/DiscoverItemsItem";
import { useRouter } from "next/router";
import useFetchContract from "../hooks/useFetchContract";
import useFractionalNfts from "../hooks/useFractionalNfts";
import { v4 } from "uuid";

const ProfileFractional = () => {
  const router = useRouter();
  const { userAccount } = useWeb3();
<<<<<<< HEAD
  const { isLoading, fetchData } = useFetchData();
  const contracts = useSelector((state) => state.deals.contracts);
  console.log(contracts);
  const { tokenIds } = useTokenId("deals");
  const fractionalNfts = useSelector((state) => state.deals.fractionalData);
  console.log(fractionalNfts);
  useEffect(() => {
    if (userAccount) {
      const url = `http://localhost:8000/get-fractional-contracts/${userAccount}`;
      fetchData(url, dealsActions.addContract);
    }
  }, [userAccount]);

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
      dispatch(profilesActions.addFractionalData({ fractionalData: resData }));
      console.log(fractionalNfts);
      // dispatch(dealsActions.addFractionalData({ fractionalData: resData }));
    } catch (error) {
      console.error(error);
    }
  });
  console.log(fractionalNfts);
  if (!isLoading && fractionalNfts.length === 0) {
    return <h1>Data Not Found</h1>;
  }
=======
  const fractionalNfts = useSelector((state) => state.deals.fractionalData);
  const url = `http://localhost:8000/get-fractional-contracts/${userAccount}`;
  const { isLoading: isLoadingContracts } = useFetchContract(url);
  const { isLoading: isLoadingNfts } = useFractionalNfts();

>>>>>>> a83f483e0440e428b632b0aad41bc44189b99c2a
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
