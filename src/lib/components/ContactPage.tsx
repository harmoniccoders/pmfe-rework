import {
  Box,
  Text,
  VStack,
  Stack,
  Image,
  HStack,
  Flex,
  Circle,
} from '@chakra-ui/react';
import ButtonComponent from 'lib/components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Register } from 'types/api';
import { useOperationMethod } from 'react-openapi-client';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { useToasts } from 'react-toast-notifications';
import { PrimaryTextArea } from 'lib/Utils/PrimaryTextArea';
import { FaInstagram, FaPhone } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Link from 'next/link';

const schema = yup.object().shape({
  firstname: yup.string().required(),
  email: yup.string().required(),
  lastName: yup.string().required(),
});

const ContactPage = () => {
  const [SendMessage, { loading }] = useOperationMethod('');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Register>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const { addToast } = useToasts();

  const onSubmit = async (data: Register) => {
    try {
      const result = await (await SendMessage(undefined, data)).data;

      if (result.status) {
        addToast('Message sent sucessfully', {
          appearance: 'success',
          autoDismiss: true,
        });
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    } catch (err) {}
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Stack minH="100vh" direction="row">
      <Flex
        w="50%"
        bgColor="brand.100"
        h="full"
        align="center"
        justify="center"
        display={['none', 'block']}
        overflow="hidden"
        pos="relative"
      >
        <Link href="/" passHref>
          <Image
            cursor="pointer"
            src="/assets/PropertyMataaz-white.png"
            alt="PropertyMataaz"
            w={['52']}
            pos="absolute"
            top="15%"
            left="50%"
            transform="translateX(-50%)"
            zIndex={9}
          />
        </Link>
        <Carousel
          responsive={responsive}
          showDots
          arrows={false}
          autoPlay
          infinite
        >
          <Box
            w="400px"
            h="300px"
            overflow="hidden"
            borderRadius="8px"
            bgColor="white"
            mx="auto"
            p="2rem"
          >
            <Image
              src="/assets/Buy_illustration.png"
              h="full"
              w="full"
              objectFit="cover"
            />
          </Box>
          <Box
            w="400px"
            h="300px"
            overflow="hidden"
            borderRadius="8px"
            bgColor="white"
            p="2rem"
            mx="auto"
          >
            <Image
              src="/assets/Clean_illustration.png"
              h="full"
              w="full"
              objectFit="cover"
            />
          </Box>
          <Box
            w="400px"
            h="300px"
            overflow="hidden"
            borderRadius="8px"
            bgColor="white"
            p="2rem"
            mx="auto"
          >
            <Image
              src="/assets/Sell illustration.png"
              h="full"
              w="full"
              objectFit="cover"
            />
          </Box>
          <Box
            w="400px"
            h="300px"
            overflow="hidden"
            borderRadius="8px"
            bgColor="white"
            p="2rem"
            mx="auto"
          >
            <Image
              src="/assets/Rent_illustration.png"
              h="full"
              w="full"
              objectFit="cover"
            />
          </Box>
        </Carousel>
      </Flex>
      <Flex w={['full', '50%']} align="center" py={['10', '0']}>
        <Box w={['80%', '70%']} mx="auto">
          <Box>
            <Image />
          </Box>
          <VStack spacing={0}>
            <Text
              fontWeight={600}
              textAlign="center"
              fontSize="2rem"
              color="brand.100"
            >
              Hi there!
            </Text>
            <Text fontSize=".8rem" color="#33333" w="80%" textAlign="center">
              Let's help you with anything related to our platform as we
              promised nothing but outstanding customer services
            </Text>
          </VStack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PrimaryInput<Register>
              label="Name"
              name="firstName"
              error={errors.firstName}
              defaultValue=""
              register={register}
            />
            <PrimaryInput<Register>
              label="Email "
              name="email"
              error={errors.email}
              defaultValue=""
              register={register}
            />
            <PrimaryTextArea<Register>
              label="Message"
              name="lastName"
              error={errors.lastName}
              defaultValue=""
              minH="100px"
              register={register}
            />

            <ButtonComponent
              content="Send"
              isValid={isValid}
              loading={loading}
            />
          </form>

          <Box display="block">
            <HStack spacing={3} justify="center" px="2rem" flexWrap="wrap">
              <Flex align="center">
                <Circle bgColor="brand.100" color="white" size="1.3rem">
                  <FaPhone fontSize=".5rem" />
                </Circle>
                <Box pl=".5rem">
                  <Text fontSize=".8rem" fontWeight="600">
                    09090002394
                  </Text>
                </Box>
              </Flex>

              <Flex align="center">
                <Circle bgColor="brand.100" color="white" size="1.3rem">
                  <GrMail fontSize=".5rem" />
                </Circle>
                <Box pl=".5rem">
                  <Text fontSize=".8rem" fontWeight="600">
                    hello@propertymataaz.com
                  </Text>
                </Box>
              </Flex>
              <Flex align="center">
                <Circle bgColor="brand.100" color="white" size="1.3rem">
                  <FaInstagram fontSize=".5rem" />
                </Circle>
                <Box pl=".5rem">
                  <Text fontSize=".8rem" fontWeight="600">
                    @PropertyMataaz
                  </Text>
                </Box>
              </Flex>
            </HStack>
          </Box>
        </Box>
      </Flex>
    </Stack>
  );
};

export default ContactPage;
