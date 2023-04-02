import React from "react";
import classes from "@/styles/buyNow.module.css";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import useModal from "@/components/hooks/useModal";
import Checkout from "@/components/Providers/Checkout";

import BuyNow from "@/components/buy/buyNow";

import useFractionalCheckout from "@/components/hooks/useFractionalCheckout";
import useNftPrice from "@/components/hooks/useNftPrice";
import useTokensAvailable from "@/components/hooks/useTokensAvailable";

const buyNow = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const nftData = useSelector((state) => state.deals.fractionalData);
  const contracts = useSelector((state) => state.deals.contracts);
  const { checkoutBuy } = useFractionalCheckout(contracts[tokenId - 1]);
  const { nftPrice } = useNftPrice(contracts[tokenId - 1]);
  const { tokensAvailable } = useTokensAvailable(contracts[tokenId - 1]);

  const { handlePresent } = useModal(
    <Checkout
      showInput={true}
      inputTitle="No. of Fractions:"
      onCheckout={checkoutBuy}
      buttonText="Buy Now"
    />
  );
  return (
    <BuyNow
      nftData={nftData[tokenId - 1]}
      nftPrice={nftPrice}
      tokensAvailable={tokensAvailable}
    >
      <button className={classes.button} onClick={handlePresent}>
        Buy Now
      </button>
    </BuyNow>
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
