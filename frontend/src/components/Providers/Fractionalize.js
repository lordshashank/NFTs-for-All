import classes from "@/styles/Checkout.module.css";
import { useState } from "react";
import useSendContractInfo from "../hooks/useSendContractInfo";
import { useDispatch } from "react-redux";
import { buyNowActions } from "@/store/buyNow";
const Fractionalize = ({ onFractionalize, token, tokenId }) => {
  const [values, setValues] = useState({
    initialSupply: "",
    listPrice: "",
    name: "",
  });
  const { initialSupply, listPrice, name } = values;
  const url = "http://localhost:8000/send-fractional-data";
  const { sendContractInfo } = useSendContractInfo(url);
  const dispatch = useDispatch();

  const changeHandler = (type) => (event) => {
    setValues({ ...values, [type]: event.target.value });
  };
  const closeHandler = (e) => {
    if (e.target.id == "backdrop") {
      dispatch(buyNowActions.onDismiss());
    }
  };

  const fractionalizeHandler = async () => {
    const newContract = await onFractionalize(
      initialSupply,
      token,
      tokenId,
      listPrice,
      name
    );
    sendContractInfo(newContract);
  };
  return (
    <div className={classes.backdrop} id="backdrop" onClick={closeHandler}>
      <div className={classes.modal}>
        <div className={classes.heading}>
          <h3>Fractionalize</h3>
          <button
            className={classes["close-button"]}
            onClick={() => dispatch(buyNowActions.onDismiss())}
          >
            X
          </button>
        </div>
        <div className={classes["form-field"]}>
          <h3>no. of fractions</h3>
          <input
            type="number"
            placeholder="00"
            value={initialSupply}
            onChange={changeHandler("initialSupply")}
          />
          <h3>List Price</h3>
          <input
            type="number"
            placeholder="00"
            value={listPrice}
            onChange={changeHandler("listPrice")}
          />
          <h3>Token name</h3>
          <input
            type="text"
            placeholder=""
            value={name}
            onChange={changeHandler("name")}
          />
          <button className={classes.button} onClick={fractionalizeHandler}>
            Fractionalize
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fractionalize;
