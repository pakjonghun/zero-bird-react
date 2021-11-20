import React, { useCallback, useEffect, useState } from "react";
import { Skeleton, Switch, Card, Avatar, Button } from "antd";
import styled from "styled-components";

const { Meta } = Card;

const UserForm = ({ setIsLoggedIn }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Card1
        loading={loading}
        actions={[
          <div key="jack">
            짹쨱
            <br />
            <div>0</div>
          </div>,
          <div key="following">
            Following
            <br />
            <div>0</div>
          </div>,
          <div key="follower">
            Follower
            <br />
            <div>0</div>
          </div>,
        ]}
      >
        <Meta
          title="title"
          avatar={<Avatar src="https://picsum.photos/200/300" />}
        />
        <Button onClick={() => setIsLoggedIn(false)}>Logout</Button>
        <Skeleton loading={loading} active avatar />
      </Card1>
    </>
  );
};

export default UserForm;

const Card1 = styled(Card)`
  width: 300px;
  margin-top: 16px;
`;

const Card2 = styled(Card)`
  width: 300px;
  margin-top: 16px;
`;
