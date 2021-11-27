import styled, { createGlobalStyle } from "styled-components";
import { Button } from "antd";

export const Indicator = styled.div`
  font-size: 15px;
  color: white;
`;

export const Overlay = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  background-color: gray;
  padding: 0;
  height: 5vh;

  & h1 {
    margin: 0 auto;
  }
`;

export const CloseBtn = styled(Button)`
  cursor: pointer;
  margin: 5px;
`;

export const SlickWrapper = styled.div`
  text-align: center;
  margin-top: 20%;

  & img {
    max-height: 500px;
    max-width: 500px;
  }
`;

export const Global = createGlobalStyle`
  .slick-slide{
    display: inline-block;
  }

  *{
    box-sizing: border-box;
  }
`;
