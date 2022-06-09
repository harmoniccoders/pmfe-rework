import Cookies from 'js-cookie';
import {
  Box,
  Button,
  MenuItem,
  MenuButton,
  Menu,
  MenuList,
  Image,
  Avatar,
  Text,
  Flex,
  Stack,
  VStack,
  useBoolean,
  Link
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import listenForOutsideClick from 'lib/Utils/listenForOutsideClick';
const LoggedIn = () => {
  const [isOpened, setIsOpened] = useState<boolean>();
  const router = useRouter();
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>();
  const LogUserOut = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    Cookies.remove('userIn');
    router.push('/');
  };
  const users = Cookies.get('user') as unknown as string;
  let user;
  if (users !== undefined) {
    user = JSON.parse(users);
  }

  const dropDown = useRef(null);
  const dropDownB = useRef(null);
  const [listening, setListening] = useState(false);

  useEffect(
    listenForOutsideClick(listening, setListening, dropDown, setIsOpened)
  );
  useEffect(
    listenForOutsideClick(listening, setListening, dropDownB, setIsMenuOpened)
  );
  return (
    <Stack
      direction={['column', 'row']}
      spacing={[3, 5]}
      align={['start', 'center']}
    >
      <Box position="relative">
        <Flex
          gap="2"
          align="center"
          cursor="pointer"
          onClick={() => setIsOpened(true)}
          fontWeight="bold"
          ref={dropDown}
        >
          My Mataaz <BiChevronDown />
        </Flex>
        <VStack
          bg="white"
          align="start"
          p={['2', '5']}
          mt={['0', '5']}
          w="fit-content"
          zIndex={50}
          shadow={['none', 'md']}
          position={['relative', 'absolute']}
          display={isOpened ? 'flex' : 'none'}
          transition={'all .5s ease'}
          overflow="hidden"
          fontWeight="600"
        >
          <NextLink href="/listings" passHref>
            <Link>Listings</Link>
          </NextLink>
          <NextLink href="/sell/drafts" passHref>
            <Link>Drafts</Link>
          </NextLink>
          <NextLink href="/my-rent/enquiries" passHref>
            <Link>Rent</Link>
          </NextLink>
          <NextLink href="/sessions/fix" passHref>
            <Link>Sessions</Link>
          </NextLink>
          <NextLink href="/get-rent-loan" passHref>
            <Link whiteSpace="nowrap">Get Rent Loan</Link>
          </NextLink>
        </VStack>
      </Box>
      <Box position="relative">
        <Flex
          gap="3"
          align="center"
          cursor="pointer"
          onClick={() => setIsMenuOpened(true)}
          fontWeight="bold"
          ref={dropDownB}
        >
          {user?.firstName}
          <Avatar size="xs" src={user?.profilePicture || '/assets/user-icon'} />
          <BiChevronDown />
        </Flex>
        <VStack
          bg="white"
          align="start"
          p={['2', '5']}
          mt={['0', '5']}
          w="full"
          zIndex={50}
          shadow={['none', 'md']}
          position={['relative', 'absolute']}
          display={isMenuOpened ? 'flex' : 'none'}
          transition={'all .5s ease'}
          overflow="hidden"
          fontWeight="600"
        >
          <NextLink href="/profile" passHref>
            <Link>Profile</Link>
          </NextLink>
          <Text cursor="pointer" onClick={() => LogUserOut()}>
            Logout
          </Text>
        </VStack>
      </Box>
    </Stack>
  );
};
export default LoggedIn;
