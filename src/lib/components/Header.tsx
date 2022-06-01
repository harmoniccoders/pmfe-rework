import {
  HStack,
  Stack,
  Link,
  Image,
  useDisclosure,
  IconButton,
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
      justify="space-around"
      py="5"
    >
      <Image
        src="/Logo (1).png"
        display={{ md: 'none' }}
        justifySelf="center"
        alt="logo"
        w="150px"
      />
      <IconButton
        size={'md'}
        icon={isOpen ? <BiMenu /> : <BiMenu />}
        aria-label={'Open Menu'}
        display={{ md: 'none' }}
        onClick={isOpen ? onClose : onOpen}
      />
      <HStack spacing="5">
        {left.map((item) => (
          <NextLink key={item} href={`/${item}`} passHref>
            <Link textTransform="capitalize">{item}</Link>
          </NextLink>
        ))}
      </HStack>
      <Image
        src="/Logo (1).png"
        display={{ base: 'none', md: 'block' }}
        justifySelf="center"
        alt="logo"
        w="200px"
      />
      <HStack spacing="5">
        {right.map((item) => (
          <NextLink key={item} href={`/${item}`} passHref>
            <Link textTransform="capitalize">{item}</Link>
          </NextLink>
        ))}
      </HStack>
    </HStack>
  );
};

export default Header;
