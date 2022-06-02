import Cookies from 'js-cookie';
import {
  Box,
  Flex,
  Stack,
  Link,
  Image,
  Text,
  useBoolean,
  Center,
  HStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BsBorderWidth } from 'react-icons/bs';
import LoggedIn from './LoggedIn';

const NavLink = ({ path, name }: { path: string; name: string }) => {
  const router = useRouter();

  const getNavLinks = (name: string) => {
    if (router.asPath === name) return 'brand.100';
  };
  return (
    <Link href={path}>
      <Text
        _hover={{ color: 'brand.100' }}
        cursor="pointer"
        fontWeight="bold"
        fontSize=".9rem"
        color={getNavLinks(path)}
      >
        {name}
      </Text>
    </Link>
  );
};

const Header = () => {
  const user = Cookies.get('user');
  return (
    <Flex
      w="90%"
      mx="auto"
      h="4.8rem"
      justifyContent="space-between"
      align="center"
    >
      <DesktopView user={user} />
      <MobileView user={user} />
    </Flex>
  );
};
export default Header;

const DesktopView = ({ user }: { user: any }) => {
  return (
    <HStack
      w="full"
      justify="space-between"
      display={['none', 'flex']}
      fontSize={{ base: '.9rem', md: '.8rem', xl: '.9rem' }}
    >
      <HStack justify="flex-start" spacing={{ md: '10px', lg: '30px' }}>
        <NavLink name="Sell" path="/sell" />
        <NavLink name="Buy" path="/buy" />
        <NavLink name="Rent" path="/rent" />
        <NavLink name="Clean" path="/clean" />
        {/* <NavLink name="Fix" path="/clean" /> */}
      </HStack>
      <Center>
        <Link href="/">
          <Image
            cursor="pointer"
            src="/assets/PropertyMataaz.png"
            alt="PropertyMataaz"
            w={['52']}
          />
        </Link>
      </Center>
      <HStack justify="flex-end" spacing={{ md: '10px', lg: '30px' }}>
        {user ? (
          <LoggedIn />
        ) : (
          <>
            <NavLink name="Verify" path="/verify" />
            <NavLink name="Get Rent Loan" path="/get-rent-loan" />
            <NavLink name="Login" path="/login" />
            <NavLink name="Sign Up" path="/register" />
          </>
        )}
      </HStack>
    </HStack>
  );
};

const MobileView = ({ user }: { user: any }) => {
  const [isOpened, setIsOpened] = useBoolean();
  return (
    <Flex
      w="full"
      justify="space-between"
      align="center"
      display={['flex', 'none']}
    >
      <Box zIndex={5}>
        <Link href="/">
          <Image
            cursor="pointer"
            src="/assets/PropertyMataaz.png"
            alt="PropertyMataaz"
            w={['52']}
          />
        </Link>
      </Box>
      <Box display={['block', 'none']} onClick={setIsOpened.toggle}>
        <BsBorderWidth fontSize="1.5rem" />
      </Box>
      <Stack
        overflow="scroll"
        pb="5"
        fontSize=".9rem"
        pos={['fixed', 'unset']}
        bgColor={['white', 'unset']}
        width={['80%', 'auto']}
        left={isOpened ? '0' : '-100%'}
        top="0"
        height={['100vh', 'auto']}
        spacing={5}
        pt={['7rem', '0']}
        direction={['column']}
        pl={['2rem', 0]}
        zIndex="3"
        transition={['all .5s ease', 'unset']}
      >
        <NavLink name="Sell" path="/sell" />
        <NavLink name="Buy" path="/buy" />
        <NavLink name="Rent" path="/rent" />
        <NavLink name="Clean" path="/clean" />
        <NavLink name="Fix" path="/clean" />
        <NavLink name="Verify" path="/verify" />
        <NavLink name="Get Rent Loan" path="/get-rent-loan" />
        {user ? (
          <LoggedIn />
        ) : (
          <>
            <NavLink name="Login" path="/login" />
            <NavLink name="Sign Up" path="/register" />
          </>
        )}
      </Stack>
    </Flex>
  );
};
