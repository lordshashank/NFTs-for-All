import { getAllNfts } from "../alchemy/getAllNfts";

export const getAllNftsRoute = {
  path: "/all-nfts",
  method: "get",
  handler: async (req, res) => {
    try {
      const nfts = await getAllNfts();
      return res.json(nfts);
    } catch (err) {
      console.log(err);
      res.status(400).json({
        error: err,
      });
    }
  },
};
