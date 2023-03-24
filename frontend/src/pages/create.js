import React, { useState, useEffect } from "react";
import { useWeb3Contract } from "react-moralis";
import { abi, contractAddress } from "../../constants";
import useWeb3 from "@/components/useWeb3";
// import Moralis from "./api/moralis/[...moralis]";
import NavBar from "@/components/navigation/navBar";
const Create = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [traits, setTraits] = useState("");
  const [file, setFile] = useState(null);
  // const [tokenUri, setTokenUri] = useState("");
  const { userAccount, web3, connectWeb3, Moralis } = useWeb3();

  const { runContractFunction: mintNft } = useWeb3Contract({});

  const { runContractFunction: getTokenCounter } = useWeb3Contract({
    abi: abi.nft,
    contractAddress: contractAddress.nft,
    functionName: "getTokenCounter",
  });
  const { runContractFunction: tokenURI } = useWeb3Contract({
    abi: abi.nft,
    contractAddress: contractAddress.nft,
    functionName: "tokenURI",
    params: { tokenId: "1" },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data;
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
      const parameters = {
        abi: abi.nft,
        contractAddress: contractAddress.nft,
        functionName: "mintNft",
        params: { tokenUri: data.Uri[0] },
      };
      console.log(parameters.params.tokenUri);
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
  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
          // Moralis.enableWeb3();
          console.log(contractAddress.nft);
          const data = await getTokenCounter({
            onError: (err) => {
              console.log(err);
            },
            onSuccess: () => {
              console.log("success");
            },
          });
          console.log(data);
        }}
      >
        Get Token Counter
      </button>
      <button
        onClick={async () => {
          const data = await tokenURI({
            onError: (err) => {
              console.log(err);
            },
            onSuccess: () => {
              console.log("success");
            },
          });
          console.log(data);
        }}
      >
        Get Token URI
      </button>
      <button
        onClick={async () => {
          const data = await mintNft();
          console.log(data);
        }}
      >
        mint
      </button>
    </div>
  );
};

export default Create;
