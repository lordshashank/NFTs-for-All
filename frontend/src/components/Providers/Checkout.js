import classes from "@/styles/Checkout.module.css";
import { useState } from "react";
import { buyNowActions } from "@/store/buyNow";
import { useDispatch } from "react-redux";
const Checkout = ({
  showInput,
  onSell,
  onCheckout,
  buttonText,
  tokenId,
  onChangePrice,
  inputTitle,
  onSubscribe,
  nftPrice,
}) => {
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const closeHandler = (e) => {
    if (e.target.id == "backdrop") {
      dispatch(buyNowActions.onDismiss());
    }
  };
  const clickHandler = async () => {
    if (onSell) {
      onSell(tokenId, price);
    }
    if (onCheckout) {
      onCheckout(price);
    }
    if (onChangePrice) {
      onChangePrice(price);
    }
    if (onSubscribe) {
      onSubscribe();
    }
  };
  return (
    <div className={classes.backdrop} id="backdrop" onClick={closeHandler}>
      <div className={classes.modal}>
        <div className={classes.heading}>
          <h3>Checkout</h3>
          <button
            className={classes["close-button"]}
            onClick={() => dispatch(buyNowActions.onDismiss())}
          >
            X
          </button>
        </div>
        <div className={classes["form-field"]}>
          <h3>{inputTitle}</h3>
          {showInput ? (
            <input
              type="number"
              placeholder="00.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          ) : (
            <h3>{nftPrice}</h3>
          )}

          <button className={classes.button} onClick={clickHandler}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
