import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import BuyNow from "@/components/buy/buyNow";

import useFractionalCheckout from "@/components/hooks/useFractionalCheckout";

const buyNow = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const nftData = useSelector((state) => state.deals.fractionalData);
  const { checkoutBuy } = useFractionalCheckout();
  return (
    <BuyNow
      showInput={true}
      onCheckout={checkoutBuy}
      nftData={nftData[tokenId - 1]}
    />
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
