import { db } from "./db";
export const getProfileForUser = async (walletAddress) => {
  const connection = db.getConnection();
  try {
    const profile = await connection
      .collection("profiles")
      .findOne({ walletAddress });
    return {
      url: `http://localhost:8000${profile.url}`,
      name: profile.name,
    };
  } catch (err) {
    console.log(err);
  }
};
