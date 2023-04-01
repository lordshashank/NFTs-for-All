import { abi, contractAddress } from "../../../constants";

export class helperFunctions {
  async getTokenIds(contractAddress, getTokenId) {
    const parameters = {
      abi: abi.fractionalNft,
      contractAddress: contractAddress,
      functionName: "getTokenId",
      params: {},
    };
    const result = await getTokenId({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    return Number(result);
  }
  async getownerOf(tokenId, userAccount, getOwnerOfToken) {
    const parameters = {
      abi: abi.nft,
      contractAddress: contractAddress.nft,
      functionName: "getOwnerOfToken",
      params: { tokenId: tokenId },
    };
    const result = await getOwnerOfToken({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    if (result === userAccount) return true;
    else return false;
  }
  getisOnSale = async (tokenId, checkSale) => {
    const parameters = {
      abi: abi.nft,
      contractAddress: contractAddress.nft,
      functionName: "checkSale",
      params: { tokenId: tokenId },
    };
    const result = await checkSale({
      params: parameters,
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    return result;
  };
  getSell = async (tokenId, price, setOnSale) => {
    const parameters = {
      abi: abi.nft,
      contractAddress: contractAddress.nft,
      functionName: "setOnSale",
      params: { tokenId: tokenId, _price: price },
    };
    const result = await setOnSale({
      params: parameters,
      onSuccess: () => {
        console.log("success");
        handleSuccess();
      },
      onError: (error) => {
        console.log(error);
      },
    });
    console.log(result);
    return "NFT on Sale";
  };
}
