import { getNftDataForSubscriptional } from "../alchemy/getNftDataForSubscriptional";
import { getAllContracts } from "../database/getAllContracts";

export const getAllSubscriptionalNftsRoute = {
  path: "/subscriptional-nfts",
  method: "get",
  handler: async (req, res) => {
    try {
      const allContracts = await getAllContracts("SUBSCRIPTIONAL");
      const response = await getNftDataForSubscriptional(allContracts);
      res.json(response);
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  },
};
