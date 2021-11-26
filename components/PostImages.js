import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";

const PostImages = ({ images }) => {
  const [showImageZoom, setShowImageZoom] = useState(false);

  const onZoom = useCallback(() => {}, []);

  if (images.length === 1) {
    return (
      <img
        role={"presentation"}
        src={images[0].src}
        alt={images[0].src}
        onClick={onZoom}
      />
    );
  } else if (images.length === 2) {
    return (
      <>
        <img
          style={{
            width: "50%;",
            display: "inline-block",
          }}
          role="presentation"
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        <img
          style={{
            width: "50%;",
            display: "inline-block",
          }}
          role="presentation"
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
        />
      </>
    );
  } else {
    return (
      <>
        <div>
          <img
            role="presentation"
            src={images[0].src}
            alt={images[0].src}
            width="50%"
            onClick={onZoom}
          />

          <div
            style={{
              display: "inline-block",
              width: "50%",
              textAlign: "center",
            }}
          >
            <PlusOutlined />
            <br />
            {`${images.length - 2}개 이미지 더보기`}
          </div>
        </div>
      </>
    );
  }
};

PostImages.prototype = {
  images: PropTypes.shape({
    src: PropTypes.string,
  }),
};

export default PostImages;
