import { saveInDatabase } from "../database/saveFractionalData.js";
export const saveFractionalDataRoute = {
  method: "post",
  path: "/send-fractional-data",
  handler: async (req, res) => {
    const response = await saveInDatabase(req.body);
    res.status(200).json(response);
  },
};
