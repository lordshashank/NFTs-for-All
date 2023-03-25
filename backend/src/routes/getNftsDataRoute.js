import { getPopulatedNftData } from "../alchemy/getPopulateNftData";
import { contractAddress } from "../../constants";

export const getNftsDataRoute = {
  method: "get",
  path: "/nft-data",
  handler: async (req, res) => {
    const nftData = await getPopulatedNftData(contractAddress.nft);
    res.status(200).json(nftData);
  },
};
