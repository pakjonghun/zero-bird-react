import React, { useCallback, useState } from "react";
import { Avatar, Button, Card, Popover, List, Comment } from "antd";
import {
  EllipsisOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import PropType from "prop-types";
import { useSelector } from "react-redux";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";

const PostCard = ({ post }) => {
  const [linked, setLinked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const toggleLinked = useCallback(() => {
    setLinked((pre) => !pre);
  }, [linked]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((pre) => !pre);
  }, [commentFormOpened]);

  const id = useSelector((state) => state.user.me?.id);
  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="RetweetOutlined" />,
          <MessageOutlined key="MessageOutlinked" onClick={onToggleComment} />,
          linked ? (
            <HeartTwoTone key="heart" onClick={toggleLinked} />
          ) : (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={toggleLinked}
            />
          ),
          <Popover
            key="Popover"
            content={
              <Button.Group>
                {id && id === post.User.id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined key="EllipsisOutlined" />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar src={post.User.avatar} />}
          title={post.User.me.nickname}
          description={post.content}
        />
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout={"vertical"}
            bordered
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar src={item.User.avatar} />}
                  content={<p>{item.content}</p>}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.prototype = {
  post: PropType.shape({
    createdAt: PropType.object,
    User: PropType.object.isRequired,
    content: PropType.string.isRequired,
    Image: PropType.arrayOf(PropType.object),
    id: PropType.number,
    Comment: PropType.arrayOf(PropType.object),
  }),
};

export default PostCard;
