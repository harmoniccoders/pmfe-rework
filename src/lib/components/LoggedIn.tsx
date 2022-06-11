import Cookies from 'js-cookie';
import { Box, Avatar, Text, Flex, Stack, VStack} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import listenForOutsideClick from 'lib/Utils/listenForOutsideClick';

interface NavProps {
  path: string;
  name: string;
  closeMenu?: () => void;
}

const NavLink = ({ path, name, closeMenu }: NavProps) => {
  const router = useRouter();

  const getNavLinks = (name: string) => {
    if (router.asPath === name) return 'brand.100';
  };
  return (
    <NextLink href={path} passHref>
      <Text
        onClick={closeMenu}
        _hover={{ color: 'brand.100' }}
        cursor="pointer"
        whiteSpace="nowrap"
        color={getNavLinks(path)}
      >
        {name}
      </Text>
    </NextLink>
  );
};

const LoggedIn = ({ closeMenu }: { closeMenu?: () => void }) => {
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
          <NavLink name="Listings" path="/listings" closeMenu={closeMenu} />
          <NavLink name="Drafts" path="/sell/drafts" closeMenu={closeMenu} />
          <NavLink
            name="Rent"
            path="/my-rent/enquiries"
            closeMenu={closeMenu}
          />
          <NavLink name="Sessions" path="/sessions/fix" closeMenu={closeMenu} />
          <NavLink
            name="Get Rent Loan"
            path="/get-rent-loan"
            closeMenu={closeMenu}
          />
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
          <NavLink name="Profile" path="/profile" closeMenu={closeMenu} />
          <Text cursor="pointer" onClick={() => LogUserOut()}>
            Logout
          </Text>
        </VStack>
      </Box>
    </Stack>
  );
};
export default LoggedIn;
