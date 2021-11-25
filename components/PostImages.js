import React from "react";
import PropTypes from "prop-types";

const PostImages = ({ images }) => {
  return images.map((item) => (
    <div>구현중</div>
    // <img width={"50px"} height={"50px"} src={item.src} />
  ));
};

PostImages.prototype = {
  images: PropTypes.shape({
    src: PropTypes.string,
  }),
};

export default PostImages;
