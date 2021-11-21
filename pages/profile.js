import React from "react";
import Head from "next/head";
import UserInput from "../components/UserInput";
import Follower from "../components/Follower";
import Following from "../components/Following";
import AppLayout from "../components/appLayout";

const Profile = () => {
  const followingList = [
    { nickName: "pak" },
    { nickName: "pak" },
    { nickName: "pak" },
  ];
  const followerList = [
    { nickName: "pak" },
    { nickName: "pak" },
    { nickName: "pak" },
  ];
  const data = {};
  return (
    <AppLayout>
      <Head>
        <title>profile</title>
      </Head>
      <UserInput />
      <Following header="팔로우잉 목록" data={followingList} />
      <Follower header="팔로워 목록" data={followerList} />
    </AppLayout>
  );
};

export default Profile;
