import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";

const AppLayout = ({ children }) => {
  const [key, setKey] = useState("");

  const handleClick = ({ key }) => {
    setKey(key);
  };

  const onSearch = (value) => console.log(value);
  const { Search } = Input;

  return (
    <div>
      <Menu mode={"horizontal"} selectedKeys={[key]} onClick={handleClick}>
        <Menu.Item key={"home"}>
          <Link href="/">
            <a>홈</a>
          </Link>
        </Menu.Item>

        <Menu.Item key={"profile"}>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>

        <Menu.Item>
          <Search
            style={{ padding: 5 }}
            enterButton
            allowClear
            style={{ width: 300, verticalAlign: "middle" }}
            onSearch={onSearch}
            placeholder="Search For Anything"
          />
        </Menu.Item>

        <Menu.Item key={"signup"}>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      {children}
    </div>
  );
};

AppLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
