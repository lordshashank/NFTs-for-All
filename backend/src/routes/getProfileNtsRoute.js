import { getPopulatedNftData } from "../alchemy/getPopulateNftData";
export const getProfileNftsRoute = {
  method: "get",
  path: "/profile-nfts/:userAccount",
  handler: async (req, res) => {
    const { userAccount } = req.params;
    const nftData = await getPopulatedNftData(userAccount);

    res.json(nftData);
  },
};
