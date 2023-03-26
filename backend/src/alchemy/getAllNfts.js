import { alchemyProvider } from "./alchemy";
import { contractAddress } from "../../constants";
export const getAllNfts = async () => {
  const { alchemy } = alchemyProvider();
  try {
    const nftsForOwner = await alchemy.nft.getNftsForContract(
      contractAddress.nft
    );
    return nftsForOwner.nfts;
  } catch (err) {
    console.log(err);
  }
};
