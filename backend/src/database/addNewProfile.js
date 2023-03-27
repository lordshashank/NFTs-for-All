import { db } from "./db";

export const addNewProfile = async (url, name, description, walletAddress) => {
  const connection = db.getConnection();
  const newFile = { url, name, description, walletAddress };
  await connection.collection("profiles").insertOne(newFile);
};
