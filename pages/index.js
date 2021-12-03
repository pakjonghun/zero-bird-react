import React, { useEffect, useLayoutEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/appLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { LOAD_POST_REQUEST } from '../reducers/post';

const Home = () => {
  const dispatch = useDispatch();
  const { neeMorePost, loadPostLoading, mainPosts } = useSelector(
    (state) => state.post
  );
  useEffect(() => {
    dispatch({ type: LOAD_POST_REQUEST });
  }, []);

  useLayoutEffect(() => {
    function onScroll() {
      console.log(neeMorePost, loadPostLoading);
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (neeMorePost && !loadPostLoading) {
          console.log('inin', neeMorePost, !loadPostLoading);
          dispatch({
            type: LOAD_POST_REQUEST,
            data: mainPosts[mainPosts.length - 1].id,
          });
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts, neeMorePost, loadPostLoading]);

  const { me } = useSelector((state) => state.user);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
