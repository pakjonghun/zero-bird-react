import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import UserForm from "./UserForm";
import LoginForm from "./loginForm";
import styled from "styled-components";

const { Search } = Input;
const AppLayout = ({ children }) => {
  const [loggedIn, setIsLoggedIn] = useState(false);

  const checkLogin = useCallback((login) => {
    setIsLoggedIn(login);
  }, []);

  return (
    <div>
      <Menu mode={"horizontal"}>
        <Menu.Item>
          <Link href="/">
            <a>홈</a>
          </Link>
        </Menu.Item>

        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>

        <Menu.Item>
          <SearchStyle
            style={{ padding: 5 }}
            enterButton
            allowClear
            style={{ width: 300, verticalAlign: "middle" }}
            placeholder="Search For Anything"
          />
        </Menu.Item>

        <Menu.Item>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>

      <Row gutter={20}>
        <Col xs={24} md={3}>
          {loggedIn ? (
            <UserForm setIsLoggedIn={checkLogin} />
          ) : (
            <LoginForm setIsLoggedIn={checkLogin} />
          )}
        </Col>
        <Col xs={24} md={3}>
          회원가입
        </Col>

        <Col xs={24} md={6}>
          {children}
        </Col>
        <Col xs={24} md={3}>
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
