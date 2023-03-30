import { useState } from "react";
import Image from "next/image";
import classes from "@/styles/UserProfileInput.module.css";

export default function ProfileIconUpload({ setFile }) {
  const [icon, setIcon] = useState(
    "https://shreethemes.in/giglink/layouts/assets/images/avatar/1.jpg"
  );
  function handleIconUpload(event) {
    const file = event.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setIcon(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      <input
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        id="profile"
        onChange={handleIconUpload}
      />
      <label htmlFor="profile" className={classes["file-input-label"]}>
        <Image
          loader={() =>
            "https://shreethemes.in/giglink/layouts/assets/images/avatar/1.jpg"
          }
          src={icon}
          width={150}
          alt=""
          height={150}
          style={{ borderRadius: "100px" }}
        />
      </label>
    </>
  );
}
