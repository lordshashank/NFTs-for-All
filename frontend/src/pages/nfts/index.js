import DiscoverItemsItem from "@/components/home/DiscoverItemsItem";
import NavBar from "@/components/navigation/navBar";
import classes from "@/styles/Explore.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import useWeb3 from "@/components/useWeb3";
import { abi, contractAddress, bytecode } from "../../../constants";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import Moralis from "../api/moralis/[...moralis]";
import { useFetchData } from "../api/useFetchData";
import { dealsActions } from "@/store/deals";
import { useSelector } from "react-redux";
import Loading from "@/components/ui/Loading";
const items = [{}, {}, {}, {}, {}];
const Nfts = () => {
  const { isLoading, fetchData } = useFetchData();
  useEffect(() => {
    fetchData("http://localhost:8000/nft-data", dealsActions.addNftsData);
  }, []);

  const nftData = useSelector((state) => state.deals.nftsData);
  const { web3, userAccount, connectWallet, isWeb3Enabled, Moralis } =
    useWeb3();
  const [tokenId, setTokenId] = useState(1);
  // const [price, setPrice] = useState(0);
  // function dd();
  // setPrice(4);

  // async function price() {
  //   return Number(await getPrice());
  // }
  // let items = {};
  // async function getPrice1(tokenId) {
  //   const { runContractFunction: getPrice } = useWeb3Contract({
  //     abi: abi.nft,
  //     contractAddress: contractAddress.nft,
  //     functionName: "getPrice",
  //     params: {
  //       tokenId: tokenId,
  //     },
  //   });
  //   return await getPrice();
  //
  // }

  const { runContractFunction: getPrice } = useWeb3Contract({
    abi: abi.nft,
    contractAddress: contractAddress.nft,
    functionName: "getPrice",
    params: { tokenId: tokenId },
  });
  // console.log(tokenId);
  // let item = {};
  // let item.tokenId = {};
  useEffect(() => {
    // getPrice().then((res) => {
    //   console.log(Number(res));
    //   setPrice(Number(res));
    // });

    for (let i = 1; i <= 4; i++) {
      // item.append(i);
      // console.log(i);
      setTokenId(i);
      // setTimeout(() => {
      updateUIValues(i);
      // }, 1000);

      // console.log(items[i].price);
    }
  }, [isWeb3Enabled]);
  // console.log(price);
  async function updateUIValues(i) {
    const priceFromCall = (
      Number(await getPrice()) / 1000000000000000000
    ).toFixed(2);

    items[i].price = priceFromCall;
    console.log(priceFromCall);
  }

  const router = useRouter();
  // const buyNow = () => {
  //   router.push(`/nts/buy-now/:${data.tokenId}`);
  // };
  return (
    <div className={`page ${classes["explore-page"]}`}>
      <NavBar />
      <div className={classes.box}>
        <h1>Explore Nfts Items</h1>
        {isLoading ? (
          <div className="spinner">
            <Loading />
          </div>
        ) : (
          <div className={classes["items"]}>
            {nftData.map((item) => (
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
        {/* <div>{price}</div> */}
      </div>
    </div>
  );
};

export default Nfts;
