import { Button, Form, Input } from "antd";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const onSubmit = useCallback(() => {
    dispatch(addPost);
    setText("");
  }, []);
  const { imagePaths } = useSelector((state) => state.post);

  const [text, setText] = useState("");

  const onChangeText = useCallback((event) => {
    setText(event.target.value);
  }, []);

  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType={"multipart/form-data"}
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={40}
        placeholder="내용 적으세요."
      />
      <div>
        <input type="file" ref={imageInput} multiple hidden />
        <Button onClick={onClickImageUpload}>업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div style={{ display: "inline-block" }} key={v}>
            <img src={v.src} style={{ width: "200px" }} alt={v.src} />
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
