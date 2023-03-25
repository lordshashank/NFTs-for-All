// This script demonstrates access to the NFT API via the Alchemy SDK.
import { Network, Alchemy } from "alchemy-sdk";
import { contractAddress } from "../../constants";
import dotenv from "dotenv";
dotenv.config();

export async function getNftData(nftContractAddress) {
  let x;
  console.log("nftContractAddress", nftContractAddress);
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
      var b = nftContractAddress.toString().toLowerCase();
      if (a == b) {
        console.log("if statement");
        nftTokenId.push({ address: nft.contract.address, token: nft.tokenId });
      }
      //  else {
      // nftTokenId.push({ address: nft.contract.address, token: nft.tokenId });
      // }
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

    // console.log(nftTokenId);
    const response = await Promise.all(
      nftTokenId.map((tokenId) =>
        alchemy.nft.getNftMetadata(tokenId.address, tokenId.token)
      )
    );
    console.log(response);
    return { response, nftTokenId };
  }
  const { response, nftTokenId } = await nft();
  return { nftData: response, nftTokenId };
}
// getNftData(contractAddress.subscriptionNft);
