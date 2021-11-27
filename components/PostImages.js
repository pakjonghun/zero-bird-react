import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import ImagesZoom from "./ImagesZoom";

const PostImages = ({ images }) => {
  const [showImageZoom, setShowImageZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImageZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImageZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img
          role={"presentation"}
          src={images[0].src}
          alt={images[0].src}
          onClick={onZoom}
        />
        {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
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
          onClose={onClose}
        />
        <img
          onClose={onClose}
          style={{
            width: "50%;",
            display: "inline-block",
          }}
          role="presentation"
          src={images[1].src}
          alt={images[1].src}
          onClick={onZoom}
        />
        {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  } else {
    return (
      <>
        <div>
          <img
            onClose={onClose}
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
            onClick={onZoom}
          >
            <PlusOutlined />
            <br />
            {`${images.length - 2}개 이미지 더보기`}
          </div>
        </div>
        {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
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
