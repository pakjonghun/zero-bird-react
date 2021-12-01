import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import UserForm from './userForm';
import LoginForm from './loginForm';

const { Search } = Input;
const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>홈</a>
          </Link>
        </Menu.Item>

        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>

        <Menu.Item key="search">
          <SearchStyle
            style={{ padding: 5 }}
            enterButton
            allowClear
            style={{ width: 300, verticalAlign: 'middle' }}
            placeholder="Search For Anything"
          />
        </Menu.Item>

        <Menu.Item key="signup">
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>

      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserForm /> : <LoginForm />}
        </Col>

        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.naver.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            블로그
          </a>
        </Col>
      </Row>
    </div>
  );
};

const SearchStyle = styled(Search)`
  width: 300px;
  vertical-align: middle;
`;

AppLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
