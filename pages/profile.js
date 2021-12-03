import Router from 'next/router';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import UserInput from '../components/UserInput';
import Follower from '../components/Follower';
import Following from '../components/Following';
import AppLayout from '../components/appLayout';

const Profile = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.email)) {
      Router.push('/');
    }
  }, [me && me.email]);

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
