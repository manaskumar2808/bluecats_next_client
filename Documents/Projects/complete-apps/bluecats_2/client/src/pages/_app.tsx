// import '@/styles/globals.css'
import { AppConstants } from '@/constants';
import Layout from '@/containers/layout';
import GlobalStyles from '@/styles/global';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { wrapper } from '@/store';
import NextNProgress from 'nextjs-progressbar';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Fragment>
      <Head>
        <title>{AppConstants.NAME}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
        </style>
      </Head>
      <GlobalStyles />
      <NextNProgress />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  );
}

export default wrapper.withRedux(App);