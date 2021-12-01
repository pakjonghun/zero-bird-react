import React from 'react';
import PropType from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Link from 'next/link';

const PostCardContent = ({ content }) => {
  const divided = content.split(/(#[^\s#]+)/gi).map((v) => v.trim());
  return (
    <>
      <Global />
      {divided.map((item, index) => {
        if (String(item).includes('#')) {
          return (
            <Hash key={`${item}-${index}`} href="#">
              <a>{item}</a>
            </Hash>
          );
        }
        return <span key={`${item}-${index}`}>{item}</span>;
      })}
    </>
  );
};

PostCardContent.prototype = {
  content: PropType.string.isRequired,
};

export default PostCardContent;

const Global = createGlobalStyle`
  span{
    margin: 0 3px;
  }
`;

const Hash = styled(Link)`
  color: lightgray;
`;
