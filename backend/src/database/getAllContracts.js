import { db } from "./db";

const collections = {
  SUBSCRIPTIONAL: "subscriptionNfts",
  FRACTIONAL: "fractionalNfts",
};

export const getAllContracts = async (collection) => {
  try {
    const connection = db.getConnection();
    const users = await connection
      .collection(collections[collection])
      .find()
      .toArray();
    const allContracts = users.flatMap((user) => user.contracts);
    console.log(allContracts);
    return allContracts;
  } catch (err) {
    console.log(err);
  }
};
