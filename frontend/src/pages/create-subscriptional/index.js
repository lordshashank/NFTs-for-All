import { useState } from "react";
import NftForm from "@/components/create/NftForm";
import ProfileTemplate from "@/components/ui/ProfileTemplate";
import useSendContractInfo from "@/components/hooks/useSendContractInfo";
import useNftUri from "@/components/hooks/useNftUri";
import useDeployContract from "@/components/hooks/useDeployContract";

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

  const url = "http://localhost:8000/send-subscription-data";
  const { sendContractInfo } = useSendContractInfo(url);
  const { sendFormData } = useNftUri();
  const { deployContract } = useDeployContract();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", title);
    formData.append("description", description);
    formData.append("traits", traits);
    formData.append("file", file);
    try {
      const tokenUri = await sendFormData(formData);
      const argument = [
        title,
        subscriptionPrice * 10 ** 18,
        subscriptionDuration * 24 * 60 * 60,
        nftCount,
        tokenUri,
      ];
      const newContract = await deployContract(argument);
      const response = await sendContractInfo(newContract);
      console.log(response);
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
        isExtraFields={true}
      />
    </ProfileTemplate>
  );
};

export default CreateSubscriptional;
