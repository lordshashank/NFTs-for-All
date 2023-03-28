import BuyNow from "@/components/buy/buyNow";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import React from "react";
import useNftCheckout from "@/components/hooks/useNftCheckout";
import useFractionalize from "@/components/hooks/useFractionalize";
import useBuyTokens from "@/components/hooks/useBuyTokens";
const buyNow = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const nftData = useSelector((state) => state.deals.nftsData);
  const { checkoutBuy } = useNftCheckout(tokenId);
  const fractionalize = useFractionalize();
  useBuyTokens();

  useEffect(() => {
    if (router.asPath === "/nfts/buy-now") {
      router.push("/nfts");
    }
  }, [router]);

  return (
    <BuyNow
      showInput={false}
      showFractionalize={true}
      onCheckout={checkoutBuy}
      onFractionalize={fractionalize}
      nftData={nftData[Number(tokenId) - 1]}
    />
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
