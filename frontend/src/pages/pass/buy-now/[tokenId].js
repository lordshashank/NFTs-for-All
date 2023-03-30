import BuyNow from "@/components/buy/buyNow";
import usePassCheckout from "@/components/hooks/usePassCheckout";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const buyNow = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const nftData = useSelector((state) => state.deals.passData);
  const checkoutBuy = usePassCheckout();

  return (
    <BuyNow
      showInput={false}
      onCheckout={checkoutBuy}
      nftData={nftData[tokenId]}
    />
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
