import { useSelector } from "react-redux";
import React from "react";

const Modals = () => {
  const content = useSelector((state) => state.buyNow.content);
  return <>{React.isValidElement(content) && React.cloneElement(content)}</>;
};

export default Modals;
