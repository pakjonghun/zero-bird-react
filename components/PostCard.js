import React, { useCallback, useState } from 'react';
import { Avatar, Button, Card, Popover, List, Comment } from 'antd';
import {
  EllipsisOutlined,
  HeartTwoTone,
  MessageOutlined,
  RetweetOutlined,
} from '@ant-design/icons';
import PropType from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { REMOVE_COMMENT_REQUEST, REMOVE_POST_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [linked, setLinked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const { removePostLoading } = useSelector((state) => state.post);

  const toggleLinked = useCallback(() => {
    setLinked((pre) => !pre);
  }, [linked]);

  const onRemovePost = useCallback(() => {
    dispatch({ type: REMOVE_POST_REQUEST, data: { id: post.id } });
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((pre) => !pre);
  }, [commentFormOpened]);

  const { id } = useSelector((state) => state.user);
  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="RetweetOutlined1" />,
          <MessageOutlined key="MessageOutlinked1" onClick={onToggleComment} />,
          linked ? (
            <HeartTwoTone key="heart1" onClick={toggleLinked} />
          ) : (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart2"
              onClick={toggleLinked}
            />
          ),
          <Popover
            key="Popover"
            content={
              <Button.Group>
                {id && id === post.User.id ? (
                  <React.Fragment key="meMenu">
                    <Button>수정</Button>
                    <Button
                      type="danger"
                      onClick={onRemovePost}
                      loading={removePostLoading}
                    >
                      삭제
                    </Button>
                  </React.Fragment>
                ) : (
                  <Button key="meMenu">신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined key="EllipsisOutlined1" />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar src={post.User.me?.avatar} />}
          title={post.User.me.nickname}
          description={<PostCardContent content={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <div>
          {id && <CommentForm post={post} />}
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="vertical"
            bordered
            dataSource={post.Comments}
            renderItem={(item) => (
              <li key={item.id}>
                <Comment
                  style={{ marginLeft: 10 }}
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
