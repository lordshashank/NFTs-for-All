export const getProfileNftsRoute = {
  method: "get",
  path: "/profile-nfts/:userAccount",
  handler: async (req, res) => {
    const { userAccount } = req.params;
    console.log(userAccount);
    res.json(["got user Account"]);
  },
};
