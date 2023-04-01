import classes from "@/styles/Checkout.module.css";
import { useState } from "react";
import { buyNowActions } from "@/store/buyNow";
import { useDispatch } from "react-redux";
const Checkout = ({ showInput, onSell, onCheckout, buttonText, tokenId }) => {
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
          <h3>Your Price:</h3>
          {showInput ? (
            <input
              type="number"
              placeholder="00.00 Fraction"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          ) : (
            <h3>0.01 ETH</h3>
          )}

          <button
            className={classes.button}
            onClick={() => {
              onCheckout(price);
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
