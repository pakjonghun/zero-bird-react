import React, { useCallback, useEffect } from 'react';
import PropType from 'prop-types';
import { Button, Input, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../reducers/post';
import useInput from '../hooks/useInput';

const CommentForm = ({ post }) => {
  const [value, onChange, setValue] = useInput({ initialValue: '' });
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.me?.email);
  const { addCommentLoading } = useSelector((state) => state.post);
  const onFinish = useCallback(() => {
    dispatch(addComment({ content: value, postId: post.id, userId }));
  }, [value, userId]);

  const { addCommentDone } = useSelector((state) => state.post);

  useEffect(() => {
    if (addCommentDone) setValue('');
  }, [addCommentDone]);

  return (
    <Form onFinish={onFinish}>
      <Input.TextArea onChange={onChange} value={value} roew={4} />
      <Button type="primary" htmlType="submit" loading={addCommentLoading}>
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
