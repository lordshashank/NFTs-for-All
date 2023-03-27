import classes from "@/styles/Checkout.module.css";
import { useState } from "react";
import useWeb3 from "../hooks/useWeb3";
const Fractionalize = ({ onClose, onFractionalize, token, tokenId }) => {
  const [initialSupply, setInitialSupply] = useState("");

  const [listPrice, setListPrice] = useState("");
  const [name, setName] = useState("");
  const { userAccount } = useWeb3();
  const closeHandler = (e) => {
    if (e.target.id == "backdrop") {
      onClose();
    }
  };
  const sendContractInfo = async (contract) => {
    console.log(1);

    if (contract) {
      console.log(2);
      try {
        const data = {
          owner: userAccount,
          contract: contract,
        };
        const response = await fetch(
          "http://localhost:8000/send-fractional-data",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const resData = await response.json();
        console.log(resData);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className={classes.backdrop} id="backdrop" onClick={closeHandler}>
      <div className={classes.modal}>
        <div className={classes.heading}>
          <h3>Fractionalize</h3>
          <button className={classes["close-button"]} onClick={onClose}>
            X
          </button>
        </div>
        <div className={classes["form-field"]}>
          <h3>no. of fractions</h3>
          <input
            type="number"
            placeholder="00"
            value={initialSupply}
            onChange={(e) => setInitialSupply(e.target.value)}
          />
          <h3>List Price</h3>
          <input
            type="number"
            placeholder="00"
            value={listPrice}
            onChange={(e) => setListPrice(e.target.value)}
          />
          <h3>Token name</h3>
          <input
            type="text"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className={classes.button}
            onClick={async () => {
              const newContract = await onFractionalize(
                initialSupply,
                token,
                tokenId,
                listPrice,
                name
              );
              sendContractInfo(newContract);
            }}
          >
            Fractionalize
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fractionalize;
