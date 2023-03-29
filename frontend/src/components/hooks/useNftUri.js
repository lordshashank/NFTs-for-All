const useNftUri = () => {
  const sendFormData = async (formData) => {
    const requestOptions = {
      method: "POST",
      body: formData,
    };
    try {
      const response = await fetch(
        "http://localhost:8000/create-nft-uri",
        requestOptions
      );
      const data = await response.json();
      return data.Uri[0];
    } catch (error) {
      console.log(error);
    }
  };
  return { sendFormData };
};

export default useNftUri;
