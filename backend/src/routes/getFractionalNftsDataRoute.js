import { getPopulatedNftData } from "../alchemy/getPopulateNftData";
import { getNftDataForFractional } from "../alchemy/getNftDataForFractional";
import { contractAddress } from "../../constants";
export const getFractionalNftsData = {
  method: "post",
  path: "/fractional-data",
  handler: async (req, res) => {
    const { tokenIds } = req.body;
    console.log(tokenIds);
    if (tokenIds === [null]) {
      return res.status(400).json({
        error: "Token Id is Incorrect!",
      });
    }
    try {
      const nftData = await getNftDataForFractional(
        contractAddress.nft,
        tokenIds
      );
      res.status(200).json(nftData);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        error: err,
      });
    }
  },
};
