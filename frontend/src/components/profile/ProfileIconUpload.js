import { useState } from "react";
import Image from "next/image";
import classes from "@/styles/UserProfileInput.module.css";
import profile from "@/../public/logo.jpg";
export default function ProfileIconUpload({ setFile }) {
  const [icon, setIcon] = useState(`/logo.jpg`);
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
