import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { Checkbox, Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import AppLayout from '../components/appLayout';
import { signUpAction } from '../reducers/user';

const Signup = () => {
  const [email, onChangeEmail] = useInput('');
  const [nickName, onChangeNickName] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const { isSignupLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const onChange = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(!e.target.checked);
  }, []);

  const onCheckPassword = useCallback(
    (e) => {
      setPasswordConfirm(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onSubmit = useCallback(() => {
    switch (true) {
      case password !== passwordConfirm:
        setPasswordError(true);

        break;
      case !term:
        setTermError(true);

        break;
      default:
        dispatch(signUpAction({ email, password }));
        break;
    }
  }, [password, passwordConfirm, term]);

  return (
    <AppLayout>
      <Head>
        <title>signup</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user_email">아이디</label>
          <br />
          <Input
            type="email"
            name="user_email"
            value={email}
            required
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="nickName">닉네임</label>
          <br />
          <Input
            name="nickName"
            value={nickName}
            required
            onChange={onChangeNickName}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <br />
          <Input
            name="password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호 확인</label>
          <br />
          <Input
            name="passwordConfirm"
            value={passwordConfirm}
            required
            onChange={onCheckPassword}
          />
          {passwordError && (
            <PasswordErrorMessage>비밀번호오류 입니다.</PasswordErrorMessage>
          )}
        </div>
        <div>회원가입 페이지</div>
        <div>
          <Checkbox checked={term} onChange={onChange}>
            말 잘들을 것을 맹세합니다.
          </Checkbox>
          {termError && (
            <TermErrorMessage>약관에 동의하셔야 합니다.</TermErrorMessage>
          )}
        </div>
        <Button htmlType="submit" loading={isSignupLoading}>
          회원가입
        </Button>
      </Form>
    </AppLayout>
  );
};

export default Signup;

const PasswordErrorMessage = styled.div`
  color: red;
`;

const TermErrorMessage = styled(PasswordErrorMessage)``;
