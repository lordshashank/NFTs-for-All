import classes from "../../styles/DiscoverItems.module.css";
import Image from "next/image";
import logo from "../../../public/logo.jpg";
import nft from "../../../public/1.jpg";
import useWeb3 from "../useWeb3";
import Link from "next/link";
import virat from "../../../public/virat.jpeg";
import { MediaRenderer } from "@thirdweb-dev/react";

const DiscoverItemsItem = ({ onBuyNow, nftData }) => {
  const loader = nftData.isNoLoader ? null : () => nftData.rawMetaData.image;
  return (
    <div className={classes["discover-card"]}>
      <div className={classes.nft}>
        <MediaRenderer
          loader={loader}
          src={nftData.rawMetaData.image}
          className={classes["nft-image"]}
          width={100}
          height={100}
          alt=""
        />
        <button className={classes["buy-button"]} onClick={onBuyNow}>
          Buy Now
        </button>
      </div>
      <div className={classes.details}>
        <div className={classes.owner}>
          <MediaRenderer
            loader={loader}
            src={nftData.rawMetaData.image}
            alt=""
            width={50}
            height={50}
            className={classes.icon}
          />
          <p>ICC</p>
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
