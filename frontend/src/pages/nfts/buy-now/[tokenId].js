import BuyNow from "@/components/buy/buyNow";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import React from "react";
import useNftCheckout from "@/components/hooks/useNftCheckout";
import useFractionalize from "@/components/hooks/useFractionalize";
import useBuyTokens from "@/components/hooks/useBuyTokens";
import Fractionalize from "@/components/Providers/Fractionalize";
import useModal from "@/components/hooks/useModal";
import classes from "@/styles/buyNow.module.css";
import Checkout from "@/components/Providers/Checkout";
import useIsOwner from "@/components/hooks/useIsOwner";
import useIsOnSale from "@/components/hooks/useIsOnSale";
import useSellNfts from "@/components/hooks/useSellNfts";
const buyNow = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const nftsData = useSelector((state) => state.deals.nftsData);
  const nftData = nftsData[tokenId - 1];
  const { checkoutBuy } = useNftCheckout(tokenId);
  const { isOwner } = useIsOwner(tokenId);
  const { isOnSale } = useIsOnSale(tokenId);
  const fractionalize = useFractionalize();
  useBuyTokens();
  const { sell } = useSellNfts();
  useEffect(() => {
    if (router.asPath === "/nfts/buy-now") {
      router.push("/nfts");
    }
  }, [router]);

  const { handlePresent } = useModal(
    <Checkout
      showInput={false}
      inputTitle="Your Price:"
      nftPrice="0.01 ETH"
      onCheckout={checkoutBuy}
      buttonText="Buy"
      tokenId={tokenId}
    />
  );
  const { handlePresent: handlePresentForSell } = useModal(
    <Checkout
      showInput={true}
      inputTitle="Your Price:"
      onSell={sell}
      buttonText="Set On Sale"
      tokenId={tokenId}
    />
  );
  const { handlePresent: handlePresentFractionalize } = useModal(
    <Fractionalize
      onFractionalize={fractionalize}
      token={nftData.contract.address}
      tokenId={nftData.tokenId}
    />
  );

  return (
    <BuyNow showInput={false} onCheckout={checkoutBuy} nftData={nftData}>
      {isOwner && !isOnSale && (
        <>
          <button className={classes.button} onClick={handlePresentForSell}>
            Set For Sell
          </button>
          <button
            className={classes.button}
            onClick={handlePresentFractionalize}
          >
            Fractionalize
          </button>
        </>
      )}
      {!isOwner && isOnSale ? (
        <button className={classes.button} onClick={handlePresent}>
          Buy Now
        </button>
      ) : (
        <h1 style={{ color: "#aaa" }}>This is Not for sell</h1>
      )}
    </BuyNow>
  );
};
export async function getServerSideProps(context) {
  const { req, res } = context;
  if (req.url.includes("/nfts/buy-now")) {
    res.writeHead(302, { Location: "/nfts" });
    res.end();
  }
  return { props: {} };
}
export default buyNow;
