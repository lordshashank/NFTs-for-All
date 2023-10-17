import classes from "@/styles/buyNow.module.css";
import { contractAddress } from "../../../constants";
// import { MediaRenderer } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import useSubscriptionData from "../helpers/subscriptionData";
import Page from "../ui/Page";
import Image from "next/image";
const BuyNow = ({
  isOwner,
  nftData,
  children,
  nftPrice,
  tokensAvailable,
  subscriptionPrice,
}) => {
  const router = useRouter();
  const { getWithdraw } = useSubscriptionData(nftData.contract.address);

  return (
    <Page>
      <div className={classes["buyNow-page-details"]}>
        <div className={classes["left-box"]}>
          <div>
            <Image
              src={`http://ipfs.io/ipfs/${nftData.rawMetadata.image.slice(7)}`}
              // src={nft}
              width={500}
              height={500}
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
              {nftPrice && (
                <>
                  <p>Price</p>
                  <h3>{nftPrice} ETH</h3>
                </>
              )}
              {tokensAvailable && (
                <>
                  <p>Tokens Available</p>
                  <h3>{tokensAvailable}</h3>
                </>
              )}
              {nftData.partsAvailable && (
                <>
                  <p>Parts Available</p>
                  <h3>{nftData.partsAvailable}</h3>
                </>
              )}
              {subscriptionPrice && (
                <>
                  <p>Subscription Price</p>
                  <h3>{subscriptionPrice} ETH</h3>
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
            {router.pathname.includes("pass") && isOwner && (
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

          {children}
        </div>
      </div>
    </Page>
  );
};

export default BuyNow;
