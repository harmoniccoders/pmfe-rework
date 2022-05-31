import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();

  return <>{children}</>;
};

export default Layout;
