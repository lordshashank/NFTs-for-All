import { getSubscriptionOwnerContracts } from "../database/getSubscriptionOwnerContracts";
import { getSubscriptionNfts } from "../alchemy/getSubscriptionNfts";
export const getProfileSubscriptionNftsRoute = {
  method: "get",
  path: "/profile-subscription-nfts/:userAccount",
  handler: async (req, res) => {
    const { userAccount } = req.params;
    try {
      const contracts = await getSubscriptionOwnerContracts(userAccount);
      if (!contracts)
        return res.json({
          message: "You don't have any Subscriptional Nfts.",
        });
      else {
        const nfts = await getSubscriptionNfts(userAccount, contracts);
        return res.status(200).json(nfts);
      }
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  },
};
