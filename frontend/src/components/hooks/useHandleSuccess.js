const useHandleSuccess = () => {
  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
    } catch (error) {
      console.log(error);
    }
  };
  return handleSuccess;
};
export default useHandleSuccess;
