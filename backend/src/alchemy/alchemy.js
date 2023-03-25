import { Network, Alchemy } from "alchemy-sdk";
import dotenv from "dotenv";
dotenv.config();
export const alchemyProvider = () => {
  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
    network: Network.MATIC_MUMBAI, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);
  return { alchemy };
};
