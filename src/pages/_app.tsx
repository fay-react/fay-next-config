import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <React.Fragment>
      <Head>
        <title>@fay-next/config</title>
        <meta name="keywords" content="DataBrowser"/>
        <meta name="description" content="DataBrowser"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <meta name="renderer" content="webkit"/>
        <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui"/>
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

