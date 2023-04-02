import useFunctions from "./useFunctions";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useWeb3Contract } from "react-moralis";

const useTokenId = () => {
  const [tokenIds, setTokenIds] = useState([]);
  const { runContractFunction: getTokenId } = useWeb3Contract({});
  const contracts = useSelector((state) => state.deals.contracts);
  const fractional = useFunctions();
  useEffect(() => {
    const loadTokenId = async () => {
      const response = await Promise.all(
        contracts.map((contract) =>
          fractional.getTokenIds(
            "0x0d209B74975d10943e69b1e4a4aE6c68d9ad2c29",
            getTokenId
          )
        )
      );
      setTokenIds(response);
    };
    if (contracts !== [] && contracts !== null && contracts !== undefined) {
      loadTokenId();
    }
  }, [contracts]);

  return { tokenIds };
};
export default useTokenId;
