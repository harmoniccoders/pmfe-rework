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
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import Link from 'next/link';
const LoggedIn = () => {
  const user = JSON.parse(Cookies.get('user') || '');
  const [isOpened, setIsOpened] = useBoolean();
  const [isMenuOpened, setIsMenuOpened] = useBoolean();
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
          onClick={setIsOpened.toggle}
          fontWeight="bold"
        >
          My Mataaz <BiChevronDown />
        </Flex>
        <VStack
          bg="white"
          align="start"
          p="5"
          mt="5"
          w='full'
          shadow="md"
          position="absolute"
          display={isOpened ? 'flex' : 'none'}
          transition={'all .5s ease'}
          overflow="hidden"
        >
          <Link href="/listings">Listings</Link>
          <Link href="/draft">Drafts</Link>
          <Link href="/rent">Rent</Link>
          <Link href="/sessions">Sessions</Link>
        </VStack>
      </Box>
      <Box position="relative">
        <Flex
          gap="3"
          align="center"
          cursor="pointer"
          onClick={setIsMenuOpened.toggle}
          fontWeight="bold"
        >
          {user?.firstName}{' '}
          <Avatar size="xs" src={user?.profilePicture || '/assets/user-icon'} />
          <BiChevronDown />
        </Flex>
        <VStack
          align="start"
          mt="5"
          bg="white"
          p="5"
          w="full"
          shadow="md"
          position="absolute"
          display={isMenuOpened ? 'flex' : 'none'}
          transition={'all .5s ease'}
          overflow="hidden"
        >
          <Link href="/profile">Profile</Link>
          <Link href="/">Logout</Link>
        </VStack>
      </Box>
    </Stack>
  );
};
export default LoggedIn;
