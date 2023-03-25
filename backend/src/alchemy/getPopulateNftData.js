import { getNftData } from "./getNftData";

export const getPopulatedNftData = async (contractAddress) => {
  const { nftData, nftTokenId } = await getNftData(contractAddress);
  let populatedNftData = [];
  nftData.forEach((data, i) => {
    populatedNftData.push({
      contract: {
        address: data.contract.address,
        name: data.contract.name,
        symbol: data.contract.symbol,
      },
      rawMetaData: data.rawMetadata,
      tokenId: nftTokenId[i].token,
    });
  });
  return populatedNftData;
};
