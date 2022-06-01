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
  DrawerHeader,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import {BiMenu} from 'react-icons/bi'

const Header = () => {
  const left = ['sell', 'buy', 'rent', 'clean', 'fix'];
  const right = [' verify', 'get rent loan', 'login', 'sign up'];

    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack
      align="center"
      justify={['space-between', 'space-around']}
      px={[3, 0]}
      py="5"
    >
      <Image
        src="/Logo (1).png"
        display={{ md: 'none' }}
        justifySelf="center"
        alt="logo"
        w="200px"
      />
      <IconButton
        size={'md'}
        w="fit-content"
        variant="ghost"
        pl={2}
        fontSize="24"
        icon={<BiMenu />}
        aria-label={'Open Menu'}
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
      <Image
        src="/Logo (1).png"
        display={['none', 'block']}
        justifySelf="center"
        alt="logo"
        w="200px"
      />
      <HStack spacing="5" display={['none', 'block']}>
        {right.map((item) => (
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
                  <Link
                    textTransform="capitalize"
                    _hover={{ color: 'blue' }}
                    fontWeight="bold"
                  >
                    {item}
                  </Link>
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
