import { useWeb3Contract } from "react-moralis";
import { abi, contractAddress } from "constants";
import useHandleSuccess from "./useHandleSuccess";
const useMintNft = () => {
  const handleSuccess = useHandleSuccess();
  const { runContractFunction: mintNft } = useWeb3Contract({});

  const MintNft = async (uri) => {
    const parameters = {
      abi: abi.nft,
      contractAddress: contractAddress.nft,
      functionName: "mintNft",
      params: { tokenUri: uri },
    };
    try {
      const response = await mintNft({
        params: parameters,
        onSuccess: () => {
          console.log("success");
          handleSuccess();
        },
        onError: (error) => {
          console.log(error);
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return MintNft;
};

export default useMintNft;
