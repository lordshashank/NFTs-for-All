import { getFractionalData } from "../database/getFractionalData.js";
export const getFractionalContracts = {
  method: "post",
  path: "/get-fractional-contracts",
  handler: async (req, res) => {
    const response = await getFractionalData(req.body);
    res.status(200).json(response);
  },
};
