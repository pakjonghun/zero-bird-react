import React, { useState } from "react";
import PropType from "prop-types";
import Slick from "react-slick";
import {
  Overlay,
  Global,
  Header,
  CloseBtn,
  SlickWrapper,
  Indicator,
} from "./style";

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlice, setCurrentSlice] = useState(0);
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>Detail images</h1>
        <CloseBtn type="danger" onClick={onClose}>
          Close
        </CloseBtn>
      </Header>
      <SlickWrapper>
        <Slick
          initialSlide={0}
          beforeChange={(slide) => setCurrentSlice(slide)}
          infinite
          arrows={false}
          slidesToShow={1}
          slidesToScroll={1}
        >
          {images.map((v) => (
            <div key={v.src}>
              <img width={"100%"} src={v.src} alt={v.src} />
            </div>
          ))}
        </Slick>
        <Indicator>{`${currentSlice}/${images.length - 1}`}</Indicator>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.prototype = {
  images: PropType.arrayOf(PropType.object).isRequired,
  onClose: PropType.func.isRequired,
};

export default ImagesZoom;
