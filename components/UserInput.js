import React, { useMemo } from "react";
import { Input, Form } from "antd";

const UserInput = () => {
  const style = useMemo(() => ({ marginTop: 20 }));

  const onFinish = () => {
    console.log("search");
  };
  return (
    <Form onFinish={onFinish} style={style}>
      <Input.Search
        addonBefore="닉네임"
        enterButton="수정"
        allowClear
        placeholder={"검색"}
      />
    </Form>
  );
};

export default UserInput;
