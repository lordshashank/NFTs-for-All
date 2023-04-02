import { useEffect, useState } from "react";
import useFunctions from "./useFunctions";
import useWeb3 from "./useWeb3";
import { useWeb3Contract } from "react-moralis";
const useIsOwner = (tokenId) => {
  const [isOwner, setIsOwner] = useState(false);
  const nfts = useFunctions();
  const { userAccount } = useWeb3();
  const { runContractFunction: getOwnerOfToken } = useWeb3Contract({});

  useEffect(() => {
    const getIsOwner = async () => {
      const result = await nfts.getownerOf(
        tokenId,
        userAccount,
        getOwnerOfToken
      );

      setIsOwner(result);
    };
    if (userAccount) {
      getIsOwner();
    }
  }, [tokenId, userAccount]);

  return { isOwner };
};

export default useIsOwner;
