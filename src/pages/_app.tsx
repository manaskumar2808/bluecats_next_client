import { AppConstants } from '@/constants';
import Layout from '@/containers/layout';
import GlobalStyles from '@/styles/global';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { wrapper } from '@/store';
import NextNProgress from 'nextjs-progressbar';
import { SessionProvider } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Fragment>
        <Head>
          <title>{AppConstants.NAME}</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          {/* <link rel="icon" href="/favicon.ico" /> */}
          <link rel='icon' href='/logo/cat-16.ico' />
          <link rel='icon' href='/logo/cat-24.ico' />
          <link rel='icon' href='/logo/cat-32.ico' />
          <link rel='icon' href='/logo/cat-64.ico' />
          <link rel='icon' href='/logo/cat-128.ico' />
          <link rel='icon' href='/logo/cat-256.ico' />
          <link rel='icon' href='/logo/cat-512.ico' />
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
          </style>
        </Head>
        <GlobalStyles />
        <NextNProgress />
        <Layout isAuth={pageProps?.isAuth}>
          <Component {...pageProps} />
        </Layout>
      </Fragment>
    </SessionProvider>
  );
}

export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions);
  return {
    props: {
      isAuth: (session && session?.jwt && session?.user),
    }
  }
}

export default wrapper.withRedux(App);