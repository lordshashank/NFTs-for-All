import BuyNow from "@/components/buy/buyNow";
import useWeb3 from "@/components/useWeb3";
import { useEffect, useState } from "react";
import { abi, contractAddress, bytecode } from "../../../../constants";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { getAccountPath } from "ethers";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const buyNow = () => {
  const router = useRouter();
  const { tokenId } = router.query;

  const nftData = useSelector((state) => state.deals.passData);
  console.log(nftData);
  const { userAccount } = useWeb3();
  const [time, setTime] = useState(0);
  // let buyPrice;
  // const [check, setCheck] = useState(false);
  const [buyPrice, setBuyPrice] = useState(0);
  const [check, setCheck] = useState(false);
  const { runContractFunction: timeLeft } = useWeb3Contract({
    abi: abi.subscriptionNft,
    contractAddress: contractAddress.subscriptionNft,
    functionName: "timeLeft",
    params: {
      _subscriber: userAccount,
    },
    // params: { tokenId: tokenId },
  });
  const { runContractFunction: subscriptionPrice } = useWeb3Contract({
    abi: abi.subscriptionNft,
    contractAddress: contractAddress.subscriptionNft,
    functionName: "subscriptionPrice",
    params: {},
    // params: { tokenId: tokenId },
  });

  const { runContractFunction: subscribe } = useWeb3Contract({
    abi: abi.subscriptionNft,
    contractAddress: contractAddress.subscriptionNft,
    functionName: "subscribe",
    msgValue: 10000000000000000,
    params: { tokenId: 1 },
  });
  useEffect(() => {
    console.log(buyPrice);
  }, [buyPrice]);
  useEffect(() => {
    async function buy() {
      await subscribe({
        onSuccess: handleSuccess,
        onError: (err) => {
          console.log(err);
        },
      });
    }
    if (check) {
      console.log(buyPrice);
      buy();
    }
    // setCheck(false);
  }, [buyPrice]);
  useEffect(() => {
    console.log(time);
  }, [time]);
  const checkoutBuy = async () => {
    setCheck(true);
    console.log("This is pass Buy button.");
    const price = await subscriptionPrice();
    setBuyPrice(Number(price));
    const t = Number(await timeLeft());
    setTime(t);
    // await subscribe();
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
        showInput={false}
        onCheckout={checkoutBuy}
        nftData={nftData[tokenId]}
      />
      ;
      {/* <button
        onClick={async () => {
          // setError({ error: false, msg: "" });
          // await Moralis.enableWeb3();

          await subscribe({
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
      </button> */}
    </>
  );
};
export async function getServerSideProps(context) {
  const { req, res } = context;
  if (req.url.includes("/pass/buy-now")) {
    res.writeHead(302, { Location: "/pass" });
    res.end();
  }
  return { props: {} };
}
export default buyNow;
