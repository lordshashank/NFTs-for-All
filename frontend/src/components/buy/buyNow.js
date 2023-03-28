import classes from "@/styles/buyNow.module.css";
import NavBar from "@/components/navigation/navBar";
import Checkout from "@/components/Providers/Checkout";
import Fractionalize from "../Providers/Fractionalize.js";
import { contractAddress } from "../../../constants";
import { MediaRenderer } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import useSubscriptionData from "../helpers/subscriptionData";
import useModal from "../hooks/useModal.js";

const BuyNow = ({
  showInput,
  onCheckout,
  nftData,
  onFractionalize,
  showFractionalize,
}) => {
  const router = useRouter();
  const { getWithdraw } = useSubscriptionData(nftData.contract.address);

  const { handlePresent } = useModal(
    <Checkout showInput={showInput} onCheckout={onCheckout} />
  );
  const { handlePresent: handlePresentFractionalize } = useModal(
    <Fractionalize
      onFractionalize={onFractionalize}
      token={nftData.contract.address}
      tokenId={nftData.tokenId}
    />
  );
  return (
    <div className={`page ${classes["buyNow-page"]}`}>
      <NavBar />
      <div className={classes["buyNow-page-details"]}>
        <div className={classes["left-box"]}>
          <div>
            <MediaRenderer
              src={nftData.rawMetadata.image}
              // src={nft}
              // className={classes.nft}
              style={{
                width: "100%",
                aspectRatio: "1/1",
                objectFit: "fill",
                height: "auto",
              }}
              alt=""
            />
            <div className={classes.details}>
              <p>Contract Address</p>
              <h3 className={classes.contract}>{nftData.contract.address}</h3>
              {nftData.isToken && (
                <>
                  <p>Token Id</p>
                  <h3>{nftData.tokenId}</h3>
                </>
              )}

              <p>Blockchain</p>
              <h3>ETH</h3>
              {nftData.partsAvailable && (
                <>
                  <p>Parts Available</p>
                  <h3>{nftData.partsAvailable}</h3>
                </>
              )}

              {nftData.contract.address.toLowerCase() ==
                contractAddress.subscriptionNft.toLowerCase() && (
                <>
                  {/* <p>{contractAddress.subscriptionNft}</p> */}
                  <p>TimeLeft</p>
                  <h3>20 days</h3>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={classes["right-box"]}>
          <div>
            <h2>{nftData.rawMetadata.name}</h2>
            {router.pathname.includes("pass") && (
              <button
                onClick={getWithdraw}
                className={`${classes.button} ${classes.buttonTop}`}
              >
                Withdraw
              </button>
            )}
          </div>
          <p>{nftData.rawMetadata.description}</p>
          <p className={classes["price-text"]}>Market Price</p>
          <h3>0.01 ETH = $ 16.029</h3>
          <button className={classes.button} onClick={handlePresent}>
            Buy Now
          </button>
          {showFractionalize && (
            <button
              className={`${classes.button} ${classes.fractionalize}`}
              onClick={handlePresentFractionalize}
            >
              Fractionalize
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
