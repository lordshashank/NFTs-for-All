import classes from "../../styles/DiscoverItems.module.css";
// import { MediaRenderer } from "@thirdweb-dev/react";
import Image from "next/image";

const DiscoverItemsItem = ({ onBuyNow, nftData }) => {
  const loader = nftData.isNoLoader ? null : () => nftData.rawMetaData.image;
  console.log(nftData);
  setTimeout(() => {}, 1000);
  return (
    <div className={classes["discover-card"]}>
      <div className={classes.nft}>
        <Image
          src={`http://ipfs.io/ipfs/${nftData.rawMetadata.image.slice(7)}`}
          className={classes["nft-image"]}
          width={500}
          height={500}
          alt=""
          style={{ width: "100%", height: "auto", objectFit: "fill" }}
        />
        <button className={classes["buy-button"]} onClick={onBuyNow}>
          Buy Now
        </button>
      </div>
      <div className={classes.details}>
        <div className={classes.owner}>
          <Image
            src={`http://ipfs.io/ipfs/${nftData.rawMetadata.image.slice(7)}`}
            alt=""
            width={50}
            height={50}
            style={{ objectFit: "fill" }}
            className={classes.icon}
          />
          <p>{nftData.rawMetadata.name}</p>
        </div>
        <h3 className={classes.title}>{nftData.contract.name}</h3>
        <div className={classes["price-details"]}>
          <div>
            <p>Price</p>
            <h4>0.01 ETH</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverItemsItem;
