import { getAllContracts } from "../database/getAllContracts";

export const getAllFractionalContractsRoute = {
  method: "get",
  path: "/fractional-contracts",
  handler: async (req, res) => {
    try {
      const contracts = await getAllContracts("FRACTIONAL");
      res.json(contracts);
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  },
};
