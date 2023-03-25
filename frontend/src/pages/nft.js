// This script demonstrates access to the NFT API via the Alchemy SDK.
import { Network, Alchemy } from "alchemy-sdk";
import React from "react";
import { contractAddress } from "../../constants";

export default function Home() {
  let x;
  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
    network: Network.MATIC_MUMBAI, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);
  async function nft() {
    // Print owner's wallet address:
    const ownerAddr = contractAddress.owner;
    console.log("fetching NFTs for address:", ownerAddr);
    console.log("...");

    // Print total NFT count returned in the response:
    const nftsForOwner = await alchemy.nft.getNftsForOwner(
      contractAddress.owner
    );
    console.log("number of NFTs found:", nftsForOwner.totalCount);
    console.log("...");
    // console.log("nftsForOwner", nftsForOwner);

    // Print contract address and tokenId for each NFT:
    let nftTokenId = [];
    for (const nft of nftsForOwner.ownedNfts) {
      console.log("===");
      console.log("contract address:", nft.contract.address);
      console.log("token ID:", nft.tokenId);
      console.log(nft.contract.address, contractAddress.nft);
      var a = nft.contract.address.toString().toLowerCase();
      var b = contractAddress.nft.toString().toLowerCase();
      if (a == b) {
        console.log("if statement");
        nftTokenId.push({ address: nft.contract.address, token: nft.tokenId });
      }
      //   const run = async () => {
      //     if (nft.contract.address === contractAddress.nft) {
      //       const response = await alchemy.nft.getNftMetadata(
      //         nft.contract.address,
      //         nft.tokenId
      //       );
      //       console.log("Response", response);
      //       console.log("NFT name: ", response.title);
      //       console.log("token type: ", response.tokenType);
      //       console.log("tokenUri: ", response.tokenUri.gateway);
      //       console.log("image url: ", response.rawMetadata.image);
      //       console.log("time last updated: ", response.timeLastUpdated);
      //       console.log("===");
      //     }
      //   };
      //   run();
    }
    console.log(nftTokenId);
    const response = await Promise.all(
      nftTokenId.map((tokenId) =>
        alchemy.nft.getNftMetadata(tokenId.address, tokenId.token)
      )
    );
    console.log("response", response);
    console.log("===");

    // Fetch metadata for a particular NFT:
    console.log("fetching metadata for a Crypto Coven NFT...");
    // const response = await alchemy.nft.getNftMetadata(
    //   "0xC4D57f178E27E5efe5e5fa3363a27A3d17f4B1e3",
    //   "1"
    // );

    // Uncomment this line to see the full api response:
    // console.log(response);

    // Print some commonly used fields:
    // console.log("Response", response);
    // console.log("NFT name: ", response.title);
    // console.log("token type: ", response.tokenType);
    // console.log("tokenUri: ", response.tokenUri.gateway);
    // console.log("image url: ", response.rawMetadata.image);
    // console.log("time last updated: ", response.timeLastUpdated);
  }
  let y = nft();
  return (
    <>
      <h1>{x}</h1>
      <div>jaoiho {x}</div>
    </>
  );
}
