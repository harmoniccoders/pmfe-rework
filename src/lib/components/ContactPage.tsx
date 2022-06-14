import {
  Box,
  Text,
  VStack,
  SimpleGrid,
  Stack,
  Image,
  HStack,
  Flex,
  Circle,
  keyframes,
} from '@chakra-ui/react';
import ButtonComponent from 'lib/components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Register } from 'types/api';
import { useOperationMethod } from 'react-openapi-client';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { PrimaryTextArea } from 'lib/Utils/PrimaryTextArea';
import { FaInstagram, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
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
    <Stack h="100vh" direction="row">
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
            // p="1rem"
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
            // transform="rotate(-3deg)"
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
            // transform="rotate(3deg)"
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
            // transform="rotate(-3deg)"
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
            // transform="rotate(-3deg)"
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
      <Flex w={['full', '50%']} align="center">
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
                <Circle
                  bgColor="brand.100"
                  // p=".1rem"
                  color="white"
                  size="1.3rem"
                >
                  <FaPhone fontSize=".5rem" />
                </Circle>
                <Box pl=".5rem">
                  <Text fontSize=".8rem" fontWeight="600">
                    09090002394
                  </Text>
                </Box>
              </Flex>

              <Flex align="center">
                <Circle
                  bgColor="brand.100"
                  // p=".1rem"
                  color="white"
                  size="1.3rem"
                >
                  <GrMail fontSize=".5rem" />
                </Circle>
                <Box pl=".5rem">
                  <Text fontSize=".8rem" fontWeight="600">
                    hello@propertymataaz.com
                  </Text>
                </Box>
              </Flex>
              <Flex align="center">
                <Circle
                  bgColor="brand.100"
                  // p=".1rem"
                  color="white"
                  size="1.3rem"
                >
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
{
  /* <Stack minH="calc(100vh - 77px)" justify="center" w="90%" mx="auto">
      <Text
        fontWeight={600}
        textAlign="center"
        fontSize="1.1rem"
        color="brand.100"
        pt="5"
        pb="1"
      >
        Need any help? contact us
      </Text>
      <SimpleGrid columns={[1, 2]} alignItems="center" pb="10">
        <VStack spacing="10" p="10" align="flex-start">
          <VStack align="flex-start" spacing="2">
            <FaPhone fontSize="20" color="blue" />
            <Text fontWeight="600" fontSize="1.2rem" lineHeight="1">
              Phone
            </Text>
            <Text>0909 000 2394</Text>
          </VStack>
          <VStack align="flex-start" spacing="2">
            <GrMail fontSize="20" color="blue" />
            <Text fontWeight="600" fontSize="1.2rem" lineHeight="1">
              Email
            </Text>
            <Text>hello@propertymataaz.com</Text>
          </VStack>
          <VStack align="flex-start" spacing="2">
            <FaMapMarkerAlt fontSize="20" color="blue" />
            <Text fontWeight="600" fontSize="1.2rem" lineHeight="1">
              Address
            </Text>
            <Text>
              1st Floor, Providence House, <br /> 15 Admiralty Way, Lekki Phase
              I 106104, Lagos
            </Text>
          </VStack>
        </VStack>

        <Box
          w={['100%', '80%', '100%']}
          border="2px hidden blue"
          pl={[0, 0, '2.5rem']}
          mt={[0, '20px', 0]}
          margin="auto"
        >
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
              minH="200px"
              register={register}
            />

            <ButtonComponent
              content="Send"
              isValid={isValid}
              loading={loading}
            />
          </form>
        </Box>
      </SimpleGrid>
    </Stack> */
}
