import { notificationActions } from "@/store/notification";
import { useDispatch } from "react-redux";

const useNotification = () => {
  const dispatch = useDispatch();

  const showNotification = (modalContent) => {
    dispatch(notificationActions.showNotification(modalContent));
  };
  return { showNotification };
};

export default useNotification;
