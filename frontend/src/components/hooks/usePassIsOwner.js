import { useEffect, useState } from "react";
import useFunctions from "./useFunctions";
import useWeb3 from "./useWeb3";
import { useWeb3Contract } from "react-moralis";
const usePassIsOwner = (contract) => {
  const [isOwner, setIsOwner] = useState(true);
  const nfts = useFunctions();
  const { userAccount } = useWeb3();
  const { runContractFunction: owner } = useWeb3Contract({});

  useEffect(() => {
    const getIsOwner = async () => {
      const result = await nfts.getIsOwner(userAccount, owner, contract);

      //   setIsOwner(result);
    };
    if (userAccount) {
      getIsOwner();
    }
  }, [userAccount]);

  return { isOwner };
};

export default usePassIsOwner;
