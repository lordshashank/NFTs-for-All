import BuyNow from "@/components/buy/buyNow";
import usePassCheckout from "@/components/hooks/usePassCheckout";
import { useRouter } from "next/router";
import classes from "@/styles/buyNow.module.css";
import { useSelector } from "react-redux";
import usePassIsOwner from "@/components/hooks/usePassIsOwner";
import useModal from "@/components/hooks/useModal";
import Checkout from "@/components/Providers/Checkout";
import usePassChangePrice from "@/components/hooks/usePassChangePrice";
import usePassSubscription from "@/components/hooks/usePassSubscription";
import usePassIsSubscribed from "@/components/hooks/usePassIsSubscribed";
import { useEffect } from "react";
import useTimeLeft from "@/components/hooks/useTimeLeft";
import usePassNftPrice from "@/components/hooks/usePassNftPrice";

const buyNow = () => {
  const router = useRouter();
  const { tokenId } = router.query;
  const nftData = useSelector((state) => state.deals.passData);
  const checkoutBuy = usePassCheckout();
  const { isOwner } = usePassIsOwner(nftData[tokenId].contract.address);
  const { setChangePrice } = usePassChangePrice();
  const { subscriptionPrice } = usePassNftPrice(
    nftData[tokenId].contract.address
  );
  const { getSubscription } = usePassSubscription(
    nftData[tokenId].contract.address
  );
  const { nftIsSubscribed } = usePassIsSubscribed(
    nftData[tokenId].contract.address
  );
  const { timeLeft, getTimeLeft } = useTimeLeft();

  useEffect(() => {
    if (nftIsSubscribed) {
      getTimeLeft();
    }
  }, [nftIsSubscribed]);

  console.log(isOwner);

  const { handlePresent } = useModal(
    <Checkout
      showInput={true}
      inputTitle={"Price"}
      onChangePrice={setChangePrice}
      buttonText="Change Subscription Price"
    />
  );
  const { handlePresent: handlePresentSubscription } = useModal(
    <Checkout
      showInput={false}
      inputTitle={"Price"}
      nftPrice={subscriptionPrice}
      onSubscribe={getSubscription}
      buttonText="Subscribe"
    />
  );

  return (
    <BuyNow
      showInput={false}
      onCheckout={checkoutBuy}
      nftData={nftData[tokenId]}
      isOwner={isOwner}
      timeLeft={timeLeft}
      subscriptionPrice={subscriptionPrice}
    >
      {isOwner ? (
        <button className={classes.button} onClick={handlePresent}>
          Change Subscription Price
        </button>
      ) : (
        <button className={classes.button} onClick={handlePresentSubscription}>
          Subscribe
        </button>
      )}
    </BuyNow>
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
