import { saveInDatabase } from "../database/saveSubscriptionData.js";
export const saveSubscriptionDataRoute = {
  method: "post",
  path: "/send-subscription-data",
  handler: async (req, res) => {
    const response = await saveInDatabase(req.body);
    res.status(200).json(response);
  },
};
