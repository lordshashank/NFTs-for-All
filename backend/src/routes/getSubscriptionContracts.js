import { getSubscriptionData } from "../database/getSubscriptionData.js";
export const getSubscriptionContracts = {
  method: "post",
  path: "/get-subscription-contracts",
  handler: async (req, res) => {
    const response = await getSubscriptionData(req.body);
    res.status(200).json(response);
  },
};
