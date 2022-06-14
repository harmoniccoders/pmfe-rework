import Cookies from 'js-cookie';
import {
  Box,
  Flex,
  Stack,
  Image,
  useBoolean,
  Center,
  HStack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { BsBorderWidth } from 'react-icons/bs';
import LoggedIn from './LoggedIn';

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
        cursor="pointer"
        fontWeight="bold"
        fontSize=".9rem"
        color={getNavLinks(path)}
      >
        {name}
      </Text>
    </NextLink>
  );
};

const Header = () => {
  const router = useRouter();
  const user = Cookies.get('user');
  return (
    <Flex
      w="90%"
      mx="auto"
      h="4.8rem"
      justifyContent="space-between"
      align="center"
      display={
        router.asPath === '/contact' || router.asPath === '/payment/validate'
          ? 'none'
          : 'flex'
      }
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
      </HStack>
      <Center>
        <NextLink href="/">
          <Image
            cursor="pointer"
            src="/assets/PropertyMataaz.png"
            alt="PropertyMataaz"
            w={['52']}
          />
        </NextLink>
      </Center>
      <HStack justify="flex-end" spacing={{ md: '10px', lg: '30px' }}>
        {user ? (
          <LoggedIn />
        ) : (
          <>
            <NavLink name="Get Rent Loan" path="/contact" />
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
  const closeMenu = () => {
    setIsOpened.off();
  };
  return (
    <Flex
      zIndex={50}
      w="full"
      justify="space-between"
      align="center"
      display={['flex', 'none']}
    >
      <Box zIndex={5}>
        <NextLink href="/">
          <Image
            cursor="pointer"
            src="/assets/PropertyMataaz.png"
            alt="PropertyMataaz"
            w={['52']}
          />
        </NextLink>
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
        <NavLink closeMenu={closeMenu} name="Sell" path="/sell" />
        <NavLink closeMenu={closeMenu} name="Buy" path="/buy" />
        <NavLink closeMenu={closeMenu} name="Rent" path="/rent" />
        <NavLink closeMenu={closeMenu} name="Clean" path="/clean" />

        {user ? (
          <LoggedIn closeMenu={closeMenu} />
        ) : (
          <>
            <NavLink
              closeMenu={closeMenu}
              name="Get Rent Loan"
              path="/get-rent-loan"
            />
            <NavLink closeMenu={closeMenu} name="Login" path="/login" />
            <NavLink closeMenu={closeMenu} name="Sign Up" path="/register" />
          </>
        )}
      </Stack>
    </Flex>
  );
};
