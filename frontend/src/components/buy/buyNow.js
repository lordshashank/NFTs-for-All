import classes from "@/styles/buyNow.module.css";
import Image from "next/image";
import virat from "../../../public/virat.jpeg";
import NavBar from "@/components/navigation/navBar";
import { useState } from "react";
import Checkout from "@/components/ui/Checkout";
import Fractionalize from "../ui/Fractionalize.js";
import { contractAddress } from "../../../constants";
import useNFTData from "@/components/nftData";
import { MediaRenderer } from "@thirdweb-dev/react";

const BuyNow = ({
  showInput,
  onCheckout,
  nftData,
  onFractionalize,
  showFractionalize,
}) => {
  console.log(nftData);
  const { price, onSale, ownerOf, sell, unsell, getURI, currentTokenId } =
    useNFTData();
  // const tokenId = currentTok1

  async function check() {
    // console.log(await price(1));
    // console.log(await onSale(1));
    console.log(await ownerOf(1));
    // console.log(await getURI(1));
  }
  // check();
  const [isCheckout, setIsCheckout] = useState(false);
  const [isFractionalize, setIsFractionalize] = useState(false);
  const onClose = () => {
    setIsCheckout(false);
    setIsFractionalize(false);
  };
  return (
    <div className={`page ${classes["buyNow-page"]}`}>
      <NavBar />
      {isCheckout && (
        <Checkout
          onClose={onClose}
          showInput={showInput}
          onCheckout={onCheckout}
        />
      )}
      {isFractionalize && (
        <Fractionalize
          onClose={onClose}
          onFractionalize={onFractionalize}
          token={nftData.contract.address}
          tokenId={nftData.tokenId}
        />
      )}

      {/* //https://ipfs.io/ipfs${nftData.rawMetaData.image.slice(5)} */}
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
          <h2>{nftData.rawMetadata.name}</h2>
          <p>{nftData.rawMetadata.description}</p>
          <p className={classes["price-text"]}>Market Price</p>
          <h3>0.01 ETH = $ 16.029</h3>
          <button
            className={classes.button}
            onClick={() => setIsCheckout((prev) => !prev)}
          >
            Buy Now
          </button>
          {showFractionalize && (
            <button
              className={classes.button}
              onClick={() => setIsFractionalize((prev) => !prev)}
            >
              Fractionalize
            </button>
          )}
          {/* <button onClick={check}>check</button> */}
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
