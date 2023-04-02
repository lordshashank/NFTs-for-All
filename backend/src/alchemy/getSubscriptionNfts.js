import { alchemyProvider } from "./alchemy";
export const getSubscriptionNfts = async (owner, contracts) => {
  const { alchemy } = alchemyProvider();
  console.log(owner);
  const nftsForOwner = await alchemy.nft.getNftsForOwner(owner);
  let filteredNfts = [];
  for (const nft of nftsForOwner.ownedNfts) {
    for (const contract of contracts) {
      if (nft.contract.address.toLowerCase() === contract.toLowerCase())
        filteredNfts.push(nft);
    }
  }
  return filteredNfts;
};
