import React, { useState, useEffect } from "react";
import { useWeb3Contract } from "react-moralis";
import { abi, contractAddress, bytecode } from "../../constants";
import useWeb3 from "@/components/useWeb3";
import Web3 from "web3";
import useSubscriptionData from "@/components/subscriptionData";
import useFractionalData from "@/components/fractionalData";
// import Moralis from "./api/moralis/[...moralis]";
import NavBar from "@/components/navigation/navBar";
const Create = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [traits, setTraits] = useState("");
  const [file, setFile] = useState(null);
  const [subscriptionPrice, setSubscriptionPrice] =
    useState("100000000000000000");
  const [subscriptionDuration, setSubscriptionDuration] = useState("10000");
  const [nftCount, setNftCount] = useState("5");
  const { getURI, getOwner, getSubscriptionPrice, getSubscription } =
    useSubscriptionData("0x332Ac661475bA28867165b969341f74145BC76d9");
  const { price, tokenId } = useFractionalData();
  // const [tokenUri, setTokenUri] = useState("");
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
        name,
        subscriptionPrice,
        subscriptionDuration,
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
    let newContract = "0x332Ac661475bA28867165b969341f74145BC76d9";
    const formData = new FormData();
    formData.append("name", name);
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
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await sendContractInfo(newContract);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    try {
      const parameters = {
        abi: abi.subscriptionNft,
        contractAddress: newContract,
        functionName: "subscribe",
        msgValue: subscriptionPrice,
        params: {},
      };

      const result = await subscribe({
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
    <div style={{ color: "white" }}>
      <NavBar />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="traits">Traits</label>
          <textarea
            id="traits"
            value={traits}
            onChange={(event) => setTraits(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="subscriptionPrice">Subscription Price</label>
          <input
            type="number"
            id="subscriptionPrice"
            value={subscriptionPrice}
            onChange={(event) => setSubscriptionPrice(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="subscriptionDuration">
            Subscription Duration(days)
          </label>
          <input
            type="number"
            id="subscriptionDuration"
            value={subscriptionDuration / (24 * 60 * 60)}
            onChange={(event) =>
              setSubscriptionDuration(event.target.value * 24 * 60 * 60)
            }
          />
        </div>
        <div>
          <label htmlFor="nftCount">
            Number of subscriptions( you will get one subsciption initially)
          </label>
          <input
            type="number"
            id="nftCount"
            value={nftCount}
            onChange={(event) => setNftCount(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            onChange={(event) => setFile(event.target.files[0])}
          />
        </div>
        <button type="submit">Create NFT</button>
      </form>
      <button
        onClick={async () => {
          sendContractInfo("subscription done");
        }}
      >
        send
      </button>

      <button
        onClick={async () => {
          try {
            const data = await deployContract(
              "ipfs://QmUttGTuPbQkuroyGqrX3gS2b9SPdtYvyXLtxZjLHhgGuZ"
            );
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        deployContract
      </button>
      <button
        onClick={async () =>
          console.log(await price("0x0d209B74975d10943e69b1e4a4aE6c68d9ad2c29"))
        }
      >
        Mint
      </button>
    </div>
  );
};

export default Create;
