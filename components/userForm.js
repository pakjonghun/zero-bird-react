import React from 'react';
import { Skeleton, Card, Avatar, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../reducers/user';

const { Meta } = Card;

const UserForm = () => {
  const { isLogoutLoading, me, avatar } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <Card1
      loading={isLogoutLoading}
      actions={[
        <div key="jack">
          짹쨱
          <br />
          <div>{me.posts.length}</div>
        </div>,
        <div key="following">
          Following
          <br />
          <div>{me.followings.length}</div>
        </div>,
        <div key="follower">
          Follower
          <br />
          <div>{me.followers.length}</div>
        </div>,
      ]}
    >
      <Meta title={me.nickname} avatar={<Avatar src={avatar} />} />
      <Button onClick={() => dispatch(logoutAction())}>Logout</Button>
      <Skeleton loading={isLogoutLoading} active avatar />
    </Card1>
  );
};

export default UserForm;

const Card1 = styled(Card)`
  margin-top: 16px;
`;
