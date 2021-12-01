import { Button, Input, Form } from 'antd';
import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../reducers/user';
import useInput from '../hooks/useInput';

const LoginForm = () => {
  const { isLoginLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput({ initialValue: 'email' });
  const [password, changePassword] = useInput({ initialValue: 'password' });

  const onSubmit = useCallback(() => {
    dispatch(loginAction({ email, password }));
  }, [password, email]);

  return (
    <div>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="userId"> 이메일</label>
          <br />
          <Input
            onChange={onChangeEmail}
            name="userId"
            value={email}
            required
          />
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
          <Button
            style={{ marginRight: 10 }}
            type="primary"
            htmlType="submit"
            loading={isLoginLoading}
          >
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
