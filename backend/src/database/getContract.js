import { db } from "./db";

export const getContract = async (owner) => {
  const connection = db.getConnection();
  console.log(owner);
  const user = await connection
    .collection("fractionalNfts")
    .findOne({ owner: owner });

  return user.contracts;
};
