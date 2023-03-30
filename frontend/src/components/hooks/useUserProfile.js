import { useEffect, useCallback, useState } from "react";
import useWeb3 from "./useWeb3";

const useUserProfile = () => {
  const defaultProfile = {
    url: "https://shreethemes.in/giglink/layouts/assets/images/blog/single.jpg",
    name: "Jenny Jimenez",
  };
  const [profile, setProfile] = useState(defaultProfile);
  const { userAccount } = useWeb3();
  const getUserProfile = useCallback(async () => {
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
  });
  useEffect(() => {
    if (userAccount) {
      getUserProfile();
    }
  }, [userAccount]);
  return { profile };
};

export default useUserProfile;
