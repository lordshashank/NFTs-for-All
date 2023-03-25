const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export const saveInDatabase = async (data) => {
  try {
    await client.connect();
    const database = client.db("NFA");
    const collection = database.collection("subscriptionNfts");
    // Check if document exists for owner
    const query = { owner: data.owner };
    const document = await collection.findOne(query);

    if (document) {
      // If document exists and contract address is not already present, add contract address to existing document
      if (!document.contracts.includes(data.contract)) {
        const updatedDocument = { $push: { contracts: data.contract } };
        const result = await collection.updateOne(query, updatedDocument);
        console.log(`${result.modifiedCount} document(s) updated.`);
      } else {
        console.log(
          `Contract address ${data.contract} already exists for owner ${data.owner}.`
        );
      }
    } else {
      // If document doesn't exist, create a new document for the owner with the contract address
      const newDocument = { owner: data.owner, contracts: [data.contract] };
      const result = await collection.insertOne(newDocument);
      console.log(result);
      console.log(` document(s) inserted.`);
    }

    return "done";
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await client.close();
  }
};
