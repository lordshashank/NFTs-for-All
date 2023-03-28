import { abi } from "../../../constants";

export class fractionalData {
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
}
