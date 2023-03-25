import { alchemyProvider } from "./alchemy";
import dotenv from "dotenv";
dotenv.config();
export const getNftDataForSubscriptional = async (contractAddress) => {
  const { alchemy } = alchemyProvider();

  const response = await Promise.all(
    contractAddress.map((contract) => alchemy.nft.getNftMetadata(contract, "0"))
  );
  return response;
};
