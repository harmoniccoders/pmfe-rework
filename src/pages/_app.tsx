/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { OpenAPIProvider } from 'react-openapi-client';

import customTheme from '../lib/styles/customTheme';
import defaultSEOConfig from '../../next-seo.config';
import '../lib/styles/globals.css';
import { ToastProvider } from 'react-toast-notifications';
import Layout from 'lib/layout';
import { UserProvider } from 'lib/Utils/MainContext';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';

const MyApp = ({ Component, pageProps }: AppProps) => {
  let headers: HeadersInit;

  headers = {
    cor: 'no-cors',
  };
  if (typeof window !== 'undefined') {
    const token = Cookies.get('token');
    headers = {
      cor: 'no-cors',
      Authorization: `Bearer ${token}`,
    };
  }

  return (
    <ChakraProvider theme={customTheme}>
      <OpenAPIProvider
        definition={process.env.NEXT_PUBLIC_API_DEFINITION as string}
        axiosConfigDefaults={{
          withCredentials: true,
          headers,
          baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
        }}
      >
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
          <title>Property Mataaz</title>
          <link rel="icon" href="/assets/flyfav.png" type="image/x-icon" />
        </Head>
        <DefaultSeo {...defaultSEOConfig} />
        {/* <Layout> */}
        <UserProvider>
          <ToastProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ToastProvider>
        </UserProvider>
      </OpenAPIProvider>
    </ChakraProvider>
  );
};
export default MyApp;
