import { alchemyProvider } from "./alchemy";
import dotenv from "dotenv";
dotenv.config();
export const getNftDataForFractional = async (contractAddress, tokenId) => {
  const { alchemy } = alchemyProvider();

  const response = await Promise.all(
    tokenId.map((token) => alchemy.nft.getNftMetadata(contractAddress, token))
  );
  return response;
};
