import React, { useMemo } from "react";
import { Button, Card, List } from "antd";
import { StopOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const Follower = ({ header, data = [] }) => {
  return (
    <List
      header={<div>{header}</div>}
      grid={{ gutter: 4, xs: 3, md: 1 }}
      size={"small"}
      loadMore={<Button>더보기</Button>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickName} />
          </Card>
        </List.Item>
      )}
    />
  );
};

Follower.prototype = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array,
};

export default Follower;
