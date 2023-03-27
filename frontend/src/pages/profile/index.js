import React, { use, useEffect } from "react";
import Page from "@/components/ui/Page";
import classes from "@/styles/Profile.module.css";
import { useState } from "react";
import ProfileNfts from "@/components/profile/ProfileNfts";
import ProfileFractional from "@/components/profile/ProfileFractional";
import ProfileSubscription from "@/components/profile/ProfileSubscription";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useFetch } from "@/components/hooks/useFetch";
import useWeb3 from "@/components/hooks/useWeb3";
import { useDispatch } from "react-redux";
import { profilesActions } from "@/store/profile";
const defaultProfile = {
  url: "https://shreethemes.in/giglink/layouts/assets/images/blog/single.jpg",
  name: "Jenny Jimenez",
};
import { useRouter } from "next/router";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [activeComponent, setActiveComponent] = useState("nft");
  const [profile, setProfile] = useState(defaultProfile);
  const { userAccount } = useWeb3();
  // const { isLoading, data: profileData } = useFetch(
  //   `http://localhost:8000/profile/${userAccount}`
  // );
  console.log(profile);

  useEffect(() => {
    if (userAccount) {
      getUserProfile();
    }
  }, [userAccount]);

  const getUserProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/profile/${userAccount}`
      );
      const profileData = await response.json();
      console.log(profileData);
      setProfile(profileData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const getButtonClassName = (componentName) => {
    if (componentName === activeComponent) {
      return classes.active;
    }
    return "";
  };
  const showNotification = () => {
    dispatch(
      profilesActions.showNotification({
        type: "SUCCESS",
        message: "CHECKING WITH REDUX",
      })
    );
  };

  const submit = async () => {
    const formData = new FormData();
    formData.append("file", selectedBackground);
    formData.append("file", selectedProfile);
    console.log(formData);
    const response = await uploadFile(
      `http://10.74.11.54:8000/upload/`,
      formData
    );
    console.log(response);
    alert("succesfully uploaded photo!");
  };
  return (
    <Page>
      <div className={classes["upper-box"]}>
        <div>
          <Image
            className={classes["background-image"]}
            type="file"
            loader={() =>
              "https://shreethemes.in/giglink/layouts/assets/images/blog/single.jpg"
            }
            src="https://shreethemes.in/giglink/layouts/assets/images/blog/single.jpg"
            id="background-image"
            alt="image"
            width={100}
            height={100}
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => {
              const file = e.target.files[0];
              setSelectedBackground(file);
            }}
          />
          <Image
            loader={() => profile.url}
            src={profile.url}
            className={classes["rounded-full"]}
            id="profile-image"
            alt="profile"
            width={100}
            height={100}
          />
        </div>
        {/* <div className={classes["profile"]}>
          <div className={classes["group-profile-pic"]}>
            <div className={classes["profile-image"]}>
              <div className={classes["backdrop-image"]}></div>
              <label htmlFor="pro-img"></label>
            </div>
          </div>
        </div> */}
        <div className={classes["profile-data"]}>
          <h5 className={classes["text"]}>
            {profile.name}
            <GoVerified style={{ color: "green" }} />
          </h5>
          <p className={classes["text-slate"]}>
            Created by{" "}
            <span className={classes["text-id"]}>1x5484dcdvcdscds56c4</span>
          </p>
          <div className={classes["profile-bar"]}>
            <button onClick={showNotification}>+ Follow me</button>
            <div className={classes["profile-bara-data"]}>
              <BsFillPersonPlusFill style={{ color: "white" }} />
            </div>
            <IoMdSettings
              onClick={() => {
                router.push("/profile/edit");
              }}
              style={{ color: "#7c3aed", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
      <div className={classes["lower-navbar-box"]}>
        <div className={classes["buttons"]}>
          <button
            className={getButtonClassName("nft")}
            onClick={() => handleButtonClick("nft")}
          >
            Nfts
            <div className="border"></div>
          </button>
          <button
            className={getButtonClassName("fractional")}
            onClick={() => handleButtonClick("fractional")}
          >
            Fractional
          </button>
          <button
            className={getButtonClassName("subscription")}
            onClick={() => handleButtonClick("subscription")}
          >
            Subscriptional
          </button>
        </div>
        <div className={classes["component"]}>
          {activeComponent === "nft" && <ProfileNfts />}
          {activeComponent === "fractional" && <ProfileFractional />}
          {activeComponent === "subscription" && <ProfileSubscription />}
        </div>
      </div>
    </Page>
  );
};

export default Profile;
