import React, { useEffect } from "react";
import classes from "@/styles/Profile.module.css";
import { useState } from "react";
import DiscoverItemsItem from "../home/DiscoverItemsItem";
import { useFetchData } from "@/pages/api/useFetchData";
import useWeb3 from "../useWeb3";
import { profilesActions } from "@/store/profile";
import { useSelector } from "react-redux";

const ProfileNfts = () => {
  const { idLoading, fetchData } = useFetchData();
  const { userAccount } = useWeb3();
  console.log(userAccount);
  const nfts = useSelector((state) => state.profile.nfts);
  console.log(nfts);
  useEffect(() => {
    const loadData = () => {
      const url = `http://localhost:8000/profile-nfts/${userAccount}`;
      fetchData(url, profilesActions.addNftsData);
    };
    if (userAccount) {
      loadData();
    }
  }, [userAccount]);
  return (
    <div>
      <div>ProfileNfts</div>
    </div>
  );
};

export default ProfileNfts;
