import ProfileTemplate from "@/components/ui/ProfileTemplate";
import { useState } from "react";
import NftForm from "@/components/create/NftForm";
import { abi, contractAddress } from "../../../constants";
import { useWeb3Contract } from "react-moralis";
const Create = () => {
  const [file, setFile] = useState(null);
  const [values, setValues] = useState({
    title: "",
    description: "",
    traits: "",
  });
  const { title, description, traits } = values;

  const { runContractFunction: mintNft } = useWeb3Contract({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data;
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
    <ProfileTemplate>
      <NftForm
        file={file}
        setFile={setFile}
        values={values}
        setValues={setValues}
        submitHandler={handleSubmit}
        isExtraFields={false}
      />
    </ProfileTemplate>
  );
};

export default Create;
