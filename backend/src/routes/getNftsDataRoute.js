import { getAllNfts } from "../alchemy/getAllNfts";

export const getNftsDataRoute = {
  method: "get",
  path: "/nft-data",
  handler: async (req, res) => {
    try {
      const nfts = await getAllNfts();
      console.log(nfts);
      return res.json(nfts);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        error: err,
      });
    }
  },
};
