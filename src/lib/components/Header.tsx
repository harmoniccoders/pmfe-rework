import {
  HStack,
  Link,
  Image,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  VStack,
  Text,
  DrawerHeader,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import NextLink from 'next/link';
import { BiMenu } from 'react-icons/bi';

const Header = () => {
  const user = Cookies.get('user');
  const left = ['sell', 'buy', 'rent', 'clean', 'fix'];
  const right = [' verify', 'get rent loan', 'login', 'sign up'];

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack
      align="center"
      justify={['space-between', 'space-between']}
      w="90%"
      mx="auto"
      px={[3, 0]}
      py="5"
    >
      <NextLink href="/" passHref>
        <Image
          src="/Logo (1).png"
          display={{ md: 'none' }}
          justifySelf="center"
          alt="logo"
          cursor="pointer"
          w="200px"
        />
      </NextLink>
      <IconButton
        size="md"
        w="fit-content"
        variant="ghost"
        pl={2}
        fontSize="24"
        icon={<BiMenu />}
        aria-label="Open Menu"
        display={{ md: 'none' }}
        onClick={onOpen}
      />
      <HStack spacing="5" display={['none', 'block']}>
        {left.map((item) => (
          <NextLink key={item} href={`/${item}`} passHref>
            <Link
              textTransform="capitalize"
              _hover={{ color: 'blue' }}
              fontWeight="bold"
            >
              {item}
            </Link>
          </NextLink>
        ))}
      </HStack>
      <NextLink href="/" passHref>
        <Image
          src="/Logo (1).png"
          display={['none', 'block']}
          justifySelf="center"
          alt="logo"
          w="200px"
          cursor="pointer"
        />
      </NextLink>
      <HStack spacing="5" display={['none', 'block']}>
        {user ? (
          <>UserLoged In</>
        ) : (
          <>
            {right.map((item) => (
              <NextLink key={item} href={`/${item}`} passHref>
                <Text
                  textTransform="capitalize"
                  _hover={{ color: 'blue' }}
                  fontWeight="bold"
                  display="inline"
                  cursor="pointer"
                >
                  {item}
                </Text>
              </NextLink>
            ))}
          </>
        )}
      </HStack>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Image
              src="/Logo (1).png"
              display={{ md: 'none' }}
              justifySelf="center"
              alt="logo"
              w="200px"
            />
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing="3" align="start" mt="3">
              {left.map((item) => (
                <NextLink key={item} href={`/${item}`} passHref>
                  <Link
                    textTransform="capitalize"
                    _hover={{ color: 'blue' }}
                    fontWeight="bold"
                  >
                    {item}
                  </Link>
                </NextLink>
              ))}
              {right.map((item) => (
                <NextLink key={item} href={`/${item}`} passHref>
                  <Text
                    textTransform="capitalize"
                    _hover={{ color: 'blue' }}
                    fontWeight="bold"
                  >
                    {item}
                  </Text>
                </NextLink>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};

export default Header;
