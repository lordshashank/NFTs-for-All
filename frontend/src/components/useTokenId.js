import useFractionalData from "./fractionalData";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useTokenId = () => {
  const [tokenIds, setTokenIds] = useState([]);
  const contracts = useSelector((state) => state.deals.contract);
  const { tokenId: getTokenId } = useFractionalData();
  useEffect(() => {
    const loadTokenId = async () => {
      const response = await Promise.all(
        contracts.map((contract) =>
          getTokenId("0x0d209B74975d10943e69b1e4a4aE6c68d9ad2c29")
        )
      );
      setTokenIds(response);
    };
    if (contracts !== [] && contracts !== null && contracts !== "undefined") {
      loadTokenId();
    }
  }, [contracts]);

  return { tokenIds };
};
export default useTokenId;
