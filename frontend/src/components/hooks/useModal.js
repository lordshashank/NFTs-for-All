import { buyNowActions } from "@/store/buyNow";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const useModal = (content) => {
  const dispatch = useDispatch();
  const handlePresent = useCallback(() => {
    dispatch(buyNowActions.onPresent({ content: content }));
  }, [content, dispatch, buyNowActions]);
  return { handlePresent };
};

export default useModal;
