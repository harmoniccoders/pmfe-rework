import { Box, Flex } from '@chakra-ui/react';
import Footer from 'lib/components/Footer';
import Header from 'lib/components/Header';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  return (
    <>
      <Header />
      {children}
      {router.asPath === '/' ? <Footer /> : null}
    </>
  );
};

export default Layout;
