import React from "react";
import "antd/dist/antd.css";
import PropTypes from "prop-types";
import Head from "next/head";
import wrapper from "../store/configureStore";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="urf-8" />
        <title>하잇</title>
      </Head>
      <Component />
    </>
  );
};

App.prototype = { Component: PropTypes.elementType.isRequired };

export default wrapper.withRedux(App);
