export const uploadFile = async (url, formData) => {
  const response = fetch(url, {
    method: "post",
    body: formData,
  });
  return response;
};
