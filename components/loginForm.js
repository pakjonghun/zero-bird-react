import { Button, Input, Form } from "antd";
import React, { useCallback, useState } from "react";
import Link from "next/link";
import styled from "styled-components";

const LoginForm = ({ setIsLoggedIn }) => {
  const [id, setId] = useState("id");
  const [password, setPassword] = useState("password");

  const changeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const changePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    setIsLoggedIn(true);
  }, [id, password]);

  return (
    <div>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="userId"> 아이디</label>
          <br />
          <Input onChange={changeId} name="userId" value={id} required />
        </div>
        <div>
          <label htmlFor="password"> 비번</label>
          <br />
          <Input
            name="password"
            onChange={changePassword}
            value={password}
            required
          />
        </div>

        <Buttons style={{ marginTop: 10 }}>
          <Button type="primary/" htmlType="submit" loading={false}>
            Login
          </Button>
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        </Buttons>
      </Form>
    </div>
  );
};

export default LoginForm;

const Buttons = styled.div`
  margin-top: 10px;
`;
