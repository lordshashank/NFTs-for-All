import { getProfileForUser } from "../database/getProfileForUser";
export const getProfileRoute = {
  method: "get",
  path: "/profile/:userAccount",
  handler: async (req, res) => {
    const { userAccount } = req.params;
    const profile = await getProfileForUser(userAccount);
    console.log(profile);
    res.status(200).json(profile);
  },
};
