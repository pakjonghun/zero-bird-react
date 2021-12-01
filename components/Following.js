import { Button, Card, List } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { StopOutlined } from '@ant-design/icons';

const Following = ({ header, data }) => (
  <List
    header={<div>{header}</div>}
    grid={{ gutter: 4, xs: 3, md: 1 }}
    size="small"
    loadMore={<Button>더보기</Button>}
    bordered
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <Card actions={[<StopOutlined key="stop" />]}>
          <Card.Meta description={<div>{item.nickName}</div>} />
        </Card>
      </List.Item>
    )}
  />
);

Following.prototype = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array,
};

export default Following;
