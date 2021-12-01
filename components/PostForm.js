import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { addPost } from '../reducers/post';

const PostForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { addPostDone, addPostLoading } = useSelector((state) => state.post);
  const [content, onChangeText, setState] = useInput({ initialValue: '' });
  useEffect(() => {
    if (addPostDone) setState('');
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    dispatch(addPost({ user, content }));
  }, [content, user]);

  const { imagePaths } = useSelector((state) => state.post);
  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={content}
        onChange={onChangeText}
        maxLength={40}
        placeholder="내용 적으세요."
      />
      <div>
        <input type="file" ref={imageInput} multiple hidden />
        <Button onClick={onClickImageUpload}>업로드</Button>
        <Button
          loading={addPostLoading}
          type="primary"
          style={{ float: 'right' }}
          htmlType="submit"
        >
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div style={{ display: 'inline-block' }} key={v}>
            <img src={v.src} style={{ width: '200px' }} alt={v.src} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
