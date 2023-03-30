import useWeb3 from "./useWeb3";

const useSendContractInfo = (url) => {
  const { userAccount } = useWeb3();
  const sendContractInfo = async (contract) => {
    console.log(1);

    if (contract) {
      console.log(2);
      try {
        const data = {
          owner: userAccount,
          contract: contract,
        };
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const resData = await response.json();
        console.log(resData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return { sendContractInfo };
};

export default useSendContractInfo;
