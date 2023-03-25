import { getPopulatedNftData } from "../alchemy/getPopulateNftData";
import { getNftDataForFractional } from "../alchemy/getNftDataForFractional";
import { contractAddress } from "../../constants";
export const getFractionalNftsData = {
  method: "post",
  path: "/fractional-data",
  handler: async (req, res) => {
    const { tokenIds } = req.body;
    const nftData = await getNftDataForFractional(
      contractAddress.nft,
      tokenIds
    );
    res.status(200).json(nftData);
  },
};
