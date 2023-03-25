const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export const getSubscriptionData = async (data) => {
  try {
    await client.connect();
    const database = client.db("NFA");
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
  } finally {
    await client.close();
  }
};
