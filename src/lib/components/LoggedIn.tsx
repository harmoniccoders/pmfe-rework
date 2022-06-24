import Cookies from 'js-cookie';
import { Box, Avatar, Text, Flex, Stack, VStack } from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import listenForOutsideClick from 'lib/Utils/listenForOutsideClick';
import UpdateUserModal from 'lib/styles/customTheme/components/Modals/UpdatePasswordModal';

interface NavProps {
  path: string;
  name: string;
  closeMenu?: () => void;
}

const NavLink = ({ path, name, closeMenu }: NavProps) => {
  const router = useRouter();

  const getNavLinks = (name: string) => {
    if (router.pathname.startsWith(name)) return 'brand.100';
  };
  return (
    <NextLink href={path} passHref>
      <Text
        onClick={closeMenu}
        _hover={{ color: 'brand.100' }}
        w="full"
        cursor="pointer"
        whiteSpace="nowrap"
        color={getNavLinks(path)}
      >
        {name}
      </Text>
    </NextLink>
  );
};

const LoggedIn = ({ closeMenu }: { closeMenu: () => void }) => {
  const [isOpened, setIsOpened] = useState<boolean>();
  const router = useRouter();
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>();
  const LogUserOut = () => {
    Cookies.remove('user');
    Cookies.remove('token');
    Cookies.remove('userIn');
    window.location.href = '/';
  };
  const users = Cookies.get('user') as unknown as string;
  let user;
  if (users !== undefined) {
    user = JSON.parse(users);
  }

  const [isOpen, setIsOpen] = useState(false);
  const dropDown = useRef(null);
  const dropDownB = useRef(null);
  const [listening, setListening] = useState(false);

  useEffect(
    listenForOutsideClick(listening, setListening, dropDown, setIsOpened)
  );
  useEffect(
    listenForOutsideClick(listening, setListening, dropDownB, setIsMenuOpened)
  );

  const changePassword = () => {
    closeMenu();
    setIsOpen(true);
  };
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
          onClick={() => setIsOpened((prev) => !prev)}
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
            path="/my-rent/rent-relief"
            closeMenu={closeMenu}
          />
          <NavLink name="Sessions" path="/sessions/fix" closeMenu={closeMenu} />
          <NavLink
            name="Get Rent Loan"
            path="/rent/rent-relief"
            closeMenu={closeMenu}
          />
        </VStack>
      </Box>
      <Box position="relative">
        <Flex
          gap="3"
          align="center"
          cursor="pointer"
          onClick={() => setIsMenuOpened((prev) => !prev)}
          fontWeight="bold"
          ref={dropDownB}
        >
          {user?.firstName}
          <Avatar
            size="xs"
            src={user?.profilePicture || '/assets/user-icon.png'}
          />
          <BiChevronDown />
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
          display={isMenuOpened ? 'flex' : 'none'}
          transition={'all .5s ease'}
          overflow="hidden"
          fontWeight="600"
          whiteSpace="nowrap"
        >
          <NavLink name="Profile" path="/profile" closeMenu={closeMenu} />
          <Text
            cursor="pointer"
            onClick={() => changePassword()}
            w="full"
            _hover={{ color: 'brand.100' }}
          >
            Change Password
          </Text>
          <Text
            w="full"
            cursor="pointer"
            _hover={{ color: 'brand.100' }}
            onClick={() => LogUserOut()}
          >
            Logout
          </Text>
        </VStack>
        <UpdateUserModal onClose={() => setIsOpen(false)} isOpen={isOpen} />
      </Box>
    </Stack>
  );
};
export default LoggedIn;
