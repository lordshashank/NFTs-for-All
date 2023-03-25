import { getPopulatedNftData } from "../alchemy/getPopulateNftData";
import { contractAddress } from "../../constants";

export const getPassNftsDataRoute = {
  method: "get",
  path: "/pass-data",
  handler: async (req, res) => {
    const nftData = await getPopulatedNftData(contractAddress.subscriptionNft);
    res.status(200).json(nftData);
  },
};
