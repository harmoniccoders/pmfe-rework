import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

interface PageTypes {
  tabName?: string;
  tabTitle: string;
}
function PageTabs({ tabName, tabTitle }: PageTypes) {
  const router = useRouter();
  const navigatePage = (url: string) => {
    router.push(`/${url}`);
  };
  return (
    <Flex
      w="full"
      align="center"
      justify="center"
      cursor="pointer"
      fontWeight="bold"
      fontSize={['.9rem', 'normal']}
      borderRadius="8px"
      color={
        router.pathname.startsWith(`/${tabName}`) ? 'brand.100' : 'inherit'
      }
      bgColor={
        router.pathname.startsWith(`/${tabName}`) ? 'white' : 'transparent'
      }
      h="full"
      onClick={() => navigatePage(`${tabName}`)}
    >
      {tabTitle}
    </Flex>
  );
}

export default PageTabs;
