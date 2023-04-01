import Image from "next/image";
import classes from "@/styles/UserProfileInput.module.css";
import styles from "@/styles/CreateNft.module.css";
import ProfileIconUpload from "./ProfileIconUpload";
import { uploadFile } from "../helpers/uploadFile";
import useWeb3 from "../hooks/useWeb3";
import { useState } from "react";
import useNotification from "../hooks/useNotification";
const UserProfileInput = () => {
  const [file, setFile] = useState(null);
  const [values, setValues] = useState({
    firstName: "",
    secondName: "",
    description: "",
  });
  const { userAccount } = useWeb3();
  const { showNotification } = useNotification();
  const { firstName, secondName, description } = values;
  const valueChangeHandler = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const sendProfile = async () => {
    const formData = new FormData();
    formData.append("name", firstName + " " + secondName);
    formData.append("description", description);
    formData.append("userAccount", userAccount);
    formData.append("file", file);
    const response = await uploadFile(
      "http://localhost:8000/upload/",
      formData
    );
    const resData = await response.json();
    if (resData.error) {
      showNotification({
        type: "ERROR",
        message: resData.error,
      });
    }
    showNotification({
      type: "SUCCESS",
      message: resData.message,
    });
  };

  console.log(file);
  return (
    <div className={classes["three-cols"]}>
      <div className={classes["image-selector"]}>
        <ProfileIconUpload setFile={setFile} />
        <p className={classes["light-text"]}>
          We recomment an image of at least 400X400. GIFs work too.
        </p>
      </div>
      <div className={classes["input-field-container"]}>
        <h1>Personal Detail:</h1>
        <div className={styles.row}>
          <div className={styles.col}>
            {" "}
            <lable className={styles.label}>First Name:</lable>
            <input
              placeholder="First Name"
              value={firstName}
              onChange={valueChangeHandler("firstName")}
              className={styles["user-input"]}
            />
          </div>
          <div className={styles.col}>
            <lable className={styles.label}>Second Name:</lable>
            <input
              value={secondName}
              onChange={valueChangeHandler("secondName")}
              placeholder="Second Name "
              className={styles["user-input"]}
            />
          </div>
        </div>
        <div>
          <div className={styles.col}>
            <lable className={styles.label}>Description :</lable>
            <textarea
              value={description}
              onChange={valueChangeHandler("description")}
              placeholder="Description"
              className={styles["user-input"]}
            />
          </div>
        </div>
        <button
          style={{ width: "fit-content", padding: "0.5rem 1.25rem" }}
          className={styles["upload-btn"]}
          onClick={sendProfile}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UserProfileInput;
