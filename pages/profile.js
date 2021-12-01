import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import UserInput from '../components/UserInput';
import Follower from '../components/Follower';
import Following from '../components/Following';
import AppLayout from '../components/appLayout';

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  return (
    <AppLayout>
      <Head>
        <title>profile</title>
      </Head>
      <UserInput />
      <Following header="팔로우잉 목록" data={me.followings} />
      <Follower header="팔로워 목록" data={me.followers} />
    </AppLayout>
  );
};

export default Profile;
