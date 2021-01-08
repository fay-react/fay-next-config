import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
// import Provider from '@/app/provider';
// import {PATH_PREFIX} from "@/env";
// import '../styles/global.css';
// import 'swiper/swiper-bundle.css';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>FilBox</title>
        <meta name="keywords" content="DataBrowser"/>
        <meta name="description" content="DataBrowser"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <meta name="renderer" content="webkit"/>
        {/* <link rel="manifest" href={`${PATH_PREFIX}/manifest.json`} /> */}
        {/* <link rel="icon" type="image/x-icon" href={`${PATH_PREFIX}/favicon.ico`} /> */}
        <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui"/>
        {/* <script src={`${PATH_PREFIX}/lib/judge-terminal-equipment.js`}/> */}
      </Head>
      {/* <Provider> */}
        <Component {...pageProps} />
      {/* </Provider> */}
    </React.Fragment>
  );
}

