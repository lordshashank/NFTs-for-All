import ProfileTemplate from "@/components/ui/ProfileTemplate";
import { useState } from "react";
import NftForm from "@/components/create/NftForm";
import useMintNft from "@/components/hooks/useMintNft";
import useNftUri from "@/components/hooks/useNftUri";
const Create = () => {
  const [file, setFile] = useState(null);
  const [values, setValues] = useState({
    title: "",
    description: "",
    traits: "",
  });
  const { title, description, traits } = values;

  const { sendFormData } = useNftUri();
  const mintNft = useMintNft();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", title);
    formData.append("description", description);
    formData.append("traits", traits);
    formData.append("file", file);
    const uri = await sendFormData(formData);
    if (!uri) return;
    mintNft(uri);
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
