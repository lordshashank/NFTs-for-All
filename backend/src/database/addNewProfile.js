import { db } from "./db";

export const addNewProfile = async (url, name, description, walletAddress) => {
  const newFile = { url, name, description, walletAddress };
  try {
    const connection = db.getConnection();

    const user = await connection
      .collection("profiles")
      .findOne({ walletAddress });
    if (user) {
      const updatedUser = await connection
        .collection("profiles")
        .updateOne({ walletAddress }, [{ $set: newFile }]);
      return { message: "User updated successfully." };
    } else {
      await connection.collection("profiles").insertOne(newFile);
      return {
        message: "User Saved Succesfully!",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      error: err,
    };
  }
};
