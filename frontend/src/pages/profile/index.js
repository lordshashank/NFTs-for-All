import React, { useState } from "react";
import Page from "@/components/ui/Page";
import classes from "@/styles/Profile.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

import ProfileNfts from "@/components/profile/ProfileNfts";
import ProfileFractional from "@/components/profile/ProfileFractional";
import ProfileSubscription from "@/components/profile/ProfileSubscription";

import { GoVerified } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { BsFillPersonPlusFill } from "react-icons/bs";
import useWeb3 from "@/components/hooks/useWeb3.js";

import useNotification from "@/components/hooks/useNotification";
import useRequestActionWithUser from "@/components/hooks/useRequestActionWithUser";
import { dealsActions } from "@/store/deals";
import { useSelector } from "react-redux";

const Profile = () => {
  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState("nft");
  const { userAccount } = useWeb3();
  const { showNotification } = useNotification();
  const { isLoading } = useRequestActionWithUser(
    "profile",
    dealsActions.updateProfile
  );
  const profile = useSelector((state) => state.deals.profile);

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const getButtonClassName = (componentName) => {
    if (componentName === activeComponent) {
      return classes.active;
    }
    return "";
  };
  const showCheckNotification = () => {
    showNotification({
      type: "SUCCESS",
      message: "CHECKING WITH REDUX",
    });
  };

  return (
    <Page>
      <div className={classes["upper-box"]}>
        <div>
          <Image
            className={classes["background-image"]}
            type="file"
            src="/single.jpg"
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
        <div className={classes["profile-data"]}>
          <h5 className={classes["text"]}>
            {profile.name}
            <GoVerified style={{ color: "green" }} />
          </h5>
          <div>
            <p className={classes["text-slate"]}>Created by</p>
            <p className={classes["text-id"]}>{userAccount}</p>
          </div>
          <div className={classes["profile-bar"]}>
            <button onClick={showCheckNotification}>+ Follow me</button>
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
