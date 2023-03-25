import Page from "@/components/Page";
import { useState } from "react";
import NftForm from "@/components/NftForm";
import Web3 from "web3";
import useWeb3 from "@/components/useWeb3";
import { useWeb3Contract } from "react-moralis";
import { abi, bytecode } from "constants";
const CreateSubscriptional = () => {
  const [file, setFile] = useState(null);
  const [values, setValues] = useState({
    title: "",
    description: "",
    traits: "",
    subscriptionPrice: "",
    subscriptionDuration: "",
    nftCount: "",
  });
  const {
    title,
    description,
    traits,
    subscriptionPrice,
    subscriptionDuration,
    nftCount,
  } = values;
  // console.log(values);

  const { userAccount, web3, connectWeb3, Moralis } = useWeb3();
  const provider = new Web3(Web3.givenProvider);
  const MyContract = new provider.eth.Contract(abi.subscriptionNft);
  const { runContractFunction: subscribe } = useWeb3Contract({});

  const deployContract = async (tokenUri) => {
    const gasPrice = await provider.eth.getGasPrice();
    console.log(gasPrice);
    console.log(userAccount);
    console.log(nftCount);
    const newContractInstance = await MyContract.deploy({
      data: bytecode.subscriptionNft,
      arguments: [
        title,
        subscriptionPrice * 10 ** 18,
        subscriptionDuration * 24 * 60 * 60,
        nftCount,
        tokenUri,
      ],
    }).send({
      from: userAccount,
      gas: 3000000,
      gasPrice: gasPrice,
    });
    console.log(newContractInstance);
    // setContract(newContractInstance.options.address);
    // console.log(contract);
    console.log(
      `Contract deployed at address ${newContractInstance.options.address}`
    );
    return newContractInstance.options.address;
  };
  const sendContractInfo = async (contract) => {
    console.log(1);

    if (contract) {
      console.log(2);
      try {
        const data = {
          owner: userAccount,
          contract: contract,
        };
        const response = await fetch(
          "http://localhost:8000/send-subscription-data",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const resData = await response.json();
        console.log(resData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data;
    let newContract;
    const formData = new FormData();
    formData.append("name", title);
    formData.append("description", description);
    formData.append("traits", traits);
    formData.append("image", file);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/create-nft-uri",
        requestOptions
      );
      data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    try {
      // if (!tokenUri) {
      //   console.log("no token uri");
      //   return;
      // }
      newContract = await deployContract(data.Uri[0]);
      console.log(newContract);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await sendContractInfo(newContract);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page>
      <NftForm
        file={file}
        setFile={setFile}
        values={values}
        setValues={setValues}
        submitHandler={handleSubmit}
        isExtraFields={true}
      />
    </Page>
  );
};

export default CreateSubscriptional;
