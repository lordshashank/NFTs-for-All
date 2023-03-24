import BuyNow from "@/components/buy/buyNow";
import React from "react";
// import useWeb3 from "@/components/useWeb3";
import { abi, contractAddress, bytecode } from "../../../../constants";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { dealsActions } from "@/store/deals";
const buyNow = () => {
  const dispatch = useDispatch();
  const [parts, setParts] = useState(0);
  const [buyPrice, setBuyPrice] = useState(10000000000000000);
  const [amount, setAmount] = useState(0);
  const [nftAddress, setNftAddress] = useState(contractAddress.nft);
  const [check, setCheck] = useState(false);
  // const [tokenId, setTokenId] = useState(1);
  const router = useRouter();
  const { tokenId } = router.query;

  const nftData = useSelector((state) => state.deals.fractionalData);

  // const
  // prev: 0x84d8ca9213dad74f15Dcb74c7830B95C453c9fe1
  // new: 0xd9145CCE52D386f254917e481eB44e9943F39138
  const { runContractFunction: getNftAddress } = useWeb3Contract({
    abi: abi.fractionalNft,
    contractAddress: "0xd9145CCE52D386f254917e481eB44e9943F39138",
    functionName: "getNftAddress",
    params: {},
  });
  const { runContractFunction: getTokenId } = useWeb3Contract({
    abi: abi.fractionalNft,
    contractAddress: contractAddress.fractionalNft,
    functionName: "getTokenId",
    params: {},
  });
  const { runContractFunction: getPrice } = useWeb3Contract({
    abi: abi.fractionalNft,
    contractAddress: contractAddress.fractionalNft,
    functionName: "getPrice",
    params: {},
  });
  const { runContractFunction: buyTokens } = useWeb3Contract({
    abi: abi.fractionalNft,
    contractAddress: contractAddress.fractionalNft,
    functionName: "buyTokens",
    msgValue: buyPrice,
    params: { amount: amount },
  });
  useEffect(() => {
    console.log(amount);
  }, [amount]);
  useEffect(() => {
    console.log(buyPrice);
  }, [buyPrice]);
  useEffect(() => {
    console.log(nftAddress);
  }, [nftAddress]);
  useEffect(() => {
    console.log(tokenId);
  }, [tokenId]);
  // async function check() {
  //   const token = Number(await getTokenId());
  //   setTokenId(token);
  //   console.log(token);
  // }
  useEffect(() => {
    async function buy() {
      await buyTokens({
        onSuccess: () => {
          handleSuccess();
          dispatch(
            dealsActions.reducePartsAvailable({
              tokenId: tokenId,
              parts: parts,
            })
          );
        },
        onError: (err) => {
          console.log(err);
        },
      });
    }
    if (check) {
      console.log(buyPrice);
      buy();
      setBuyPrice(10000000000000000);
    }
    setCheck(false);
  }, [buyPrice]);

  const checkoutBuy = async (parts) => {
    setParts(parts);
    setCheck(true);
    setBuyPrice((prev) => prev * parts);
    // setAmount(price);
    // console.log("This is fractional Buy button.");
    const bigNumber = await getPrice();
    setBuyPrice(Number(bigNumber) * amount);
    console.log(Number(bigNumber));
    // setNftAddress(await getNftAddress());
    // const token = Number(await getTokenId());
    // setTokenId(token);
    // await check();
    // console.log(token);
    // console.log(Number(bigNumber));
    // setTimeout(() => {
    //   console.log(buyPrice);
    // }, 1000);
  };
  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
      //   updateUIValues();
      //   handleNewNotification(tx);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <BuyNow
        showInput={true}
        onCheckout={checkoutBuy}
        nftData={nftData[tokenId - 1]}
      />
      ;
      {/* <button
        onClick={async () => {
          // setError({ error: false, msg: "" });
          // await Moralis.enableWeb3();

          await buyTokens({
            onSuccess: handleSuccess,
            onError: (err) => {
              console.log(err);
              // setError({
              //   error: true,
              //   msg: "Please try again later.",
              // });
            },
          });
        }}
      >
        Mint fractional
      </button>
      <button
        onClick={async () => {
          // setError({ error: false, msg: "" });
          // await Moralis.enableWeb3();

          await check({
            onSuccess: handleSuccess,
            onError: (err) => {
              console.log(err);
              // setError({
              //   error: true,
              //   msg: "Please try again later.",
              // });
            },
          });
        }}
      >
        Check
      </button> */}
    </>
  );
};
export async function getServerSideProps(context) {
  const { req, res } = context;
  if (req.url.includes("/fractional/buy-now")) {
    res.writeHead(302, { Location: "/fractional" });
    res.end();
  }
  return { props: {} };
}
export default buyNow;
