import { db } from "./db";

export const getSubscriptionOwnerContracts = async (owner) => {
  const connection = db.getConnection();
  try {
    const user = await connection
      .collection("subscriptionNfts")
      .findOne({ owner: owner });

    return user.contracts;
  } catch (err) {
    console.log(err);
  }
};
