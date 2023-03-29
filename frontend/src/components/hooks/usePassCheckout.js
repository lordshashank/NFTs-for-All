import { useWeb3Contract } from "react-moralis";
import { abi, contractAddress } from "constants";
import useWeb3 from "./useWeb3";
import useHandleSuccess from "./useHandleSuccess";

const usePassCheckout = () => {
  const { userAccount } = useWeb3();
  const handleSuccess = useHandleSuccess();
  const { runContractFunction: subscriptionPrice } = useWeb3Contract({
    abi: abi.subscriptionNft,
    contractAddress: contractAddress.subscriptionNft,
    functionName: "subscriptionPrice",
    params: {},
  });
  const { runContractFunction: timeLeft } = useWeb3Contract({
    abi: abi.subscriptionNft,
    contractAddress: contractAddress.subscriptionNft,
    functionName: "timeLeft",
    params: {
      _subscriber: userAccount,
    },
  });
  const { runContractFunction: subscribe } = useWeb3Contract({
    abi: abi.subscriptionNft,
    contractAddress: contractAddress.subscriptionNft,
    functionName: "subscribe",
    msgValue: 10000000000000000,
    params: { tokenId: 1 },
  });
  const checkoutBuy = async () => {
    console.log("This is pass Buy button.");
    const price = await subscriptionPrice();
    // setBuyPrice(Number(price));
    console.log(Number(price));

    const t = Number(await timeLeft());
    console.log(t);
    await subscribe({
      onSuccess: handleSuccess,
      onError: (err) => {
        console.log(err);
      },
    });
    // setTime(t);
    // await subscribe();
  };
  return checkoutBuy;
};

export default usePassCheckout;
