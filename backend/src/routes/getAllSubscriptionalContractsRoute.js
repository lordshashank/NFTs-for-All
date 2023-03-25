import { getAllContracts } from "../database/getAllContracts";
export const getAllSubscriptionalContractsRoute = {
  path: "/subscriptional-contracts",
  method: "get",
  handler: async (req, res) => {
    try {
      const allContracts = await getAllContracts("SUBSCRIPTIONAL");
      return res.json(allContracts);
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  },
};
