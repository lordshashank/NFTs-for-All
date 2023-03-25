import { getContract } from "../database/getContract";
export const getContractRoute = {
  method: "get",
  path: "/get-fractional-contracts/:owner",
  handler: async (req, res) => {
    const { owner } = req.params;
    const contract = await getContract(owner);
    res.json(contract);
  },
};
