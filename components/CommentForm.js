import React, { useCallback, useState } from "react";
import PropType from "prop-types";
import { Button, Input, Form } from "antd";
import { useDispatch } from "react-redux";
import { addComment } from "../reducers/post";
import useInput from "../hooks/useInput";

const CommentForm = ({ post }) => {
  const [value, onChange] = useInput({ initialValue: "" });
  const dispatch = useDispatch();
  const onFinish = useCallback(() => {
    dispatch(addComment(value, post.id));
  }, [value]);

  return (
    <Form onFinish={onFinish}>
      <Input.TextArea onChange={onChange} value={value} roew={4} />
      <Button type="primary" htmlType="submit">
        댓글달기
      </Button>
    </Form>
  );
};

CommentForm.prototype = {
  post: PropType.shape({
    id: PropType.number.isRequired,
    User: PropType.object.isRequired,
    Images: PropType.arrayOf(PropType.object),
    content: PropType.string.isRequired,
    Comments: PropType.object,
    createdAt: PropType.object.isRequired,
  }),
};

export default CommentForm;
