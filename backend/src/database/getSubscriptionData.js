import { db } from "./db";

export const getSubscriptionData = async (data) => {
  try {
    const database = db.getConnection();
    const collection = database.collection("subscriptionNfts");
    // Find document for owner
    const query = { owner: data.owner };
    const document = await collection.findOne(query);

    if (document) {
      // If document exists, return array of contract addresses
      return document.contracts;
    } else {
      // If document doesn't exist, return empty array
      return ["ddh"];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
