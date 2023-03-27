import { useContext } from "react";
import { Context } from "../contexts/NotificationProvider";

const useNotification = () => {
  const { onPresent } = useContext(Context);

  const showNotification = (modalContent) => {
    onPresent(modalContent);
  };
  return { showNotification };
};

export default useNotification;
