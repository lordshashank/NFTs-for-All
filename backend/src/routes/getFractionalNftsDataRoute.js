import { getPopulatedNftData } from "../alchemy/getPopulateNftData";

export const getFractionalNftsData = {
  method: "get",
  path: "/fractional-data",
  handler: async (req, res) => {
    const nftData = await getPopulatedNftData();
    res.status(200).json(nftData);
  },
};
