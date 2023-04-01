import { getPopulatedNftData } from "../alchemy/getPopulateNftData";
export const getProfileNftsRoute = {
  method: "get",
  path: "/profile-nfts/:userAccount",
  handler: async (req, res) => {
    const { userAccount } = req.params;
    if (userAccount) {
      const nftData = await getPopulatedNftData(userAccount);
      res.status(200).json(nftData);
    }
  },
};
