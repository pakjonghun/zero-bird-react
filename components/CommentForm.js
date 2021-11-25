import React, { useCallback, useState } from "react";
import PropType from "prop-types";
import { Button, Input, Form } from "antd";
import { useDispatch } from "react-redux";
import { addComment } from "../reducers/comment";

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const onFinish = useCallback(() => {
    dispatch(addComment(content));
  }, []);
  const onCommentChange = useCallback((event) => {
    setContent(event.target.value);
  }, []);

  return (
    <Form onFinish={onFinish}>
      <Input onChange={onCommentChange} value={content} />
      <Button htmlType="submit">댓글달기</Button>
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
