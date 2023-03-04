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
import { Register, ReportModel } from 'types/api';
import { useOperationMethod } from 'react-openapi-client';
import { useToasts } from 'react-toast-notifications';
import { FaInstagram, FaPhone } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Link from 'next/link';
import React, { useContext, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { ContactInput, ContactTextArea } from 'lib/Utils/ContactInput';
import { useRouter } from 'next/router';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { UserContext } from 'lib/Utils/MainContext';
import { PrimaryTextArea } from 'lib/Utils/PrimaryTextArea';

const schema = yup.object().shape({
  userName: yup.string().required(),
  email: yup.string().required(),
  description: yup.string().required(),
});

const NewContact = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const [SendMessage, { loading: isLoad }] =
    useOperationMethod('Reportcontact');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ReportModel>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      userName: user.fullName,
      email: user.email,
    },
  });
  const { addToast } = useToasts();
  const router = useRouter();

  const onSubmit = async (data: ReportModel) => {
    try {
      const result = await (await SendMessage(undefined, data)).data;

      if (result.status) {
        addToast('Message sent sucessfully', {
          appearance: 'success',
          autoDismiss: true,
        });
        router.push('/');
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    } catch (err: any) {
      addToast(err.message || err.body.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  //   const form = useRef<any>();

  //   const sendEmail = (e: any) => {
  //     e.preventDefault();
  //     setLoading(true);

  //     emailjs
  //       .sendForm(
  //         'service_i9nnz0w',
  //         'template_kljdmey',
  //         form.current,
  //         'OcKaWyrr-i5DX0B2c'
  //       )
  //       .then(
  //         (result) => {
  //           setLoading(false);
  //           addToast('Message sent sucessfully', {
  //             appearance: 'success',
  //             autoDismiss: true,
  //           });
  //           router.push('/');
  //         },
  //         (error) => {
  //           setLoading(false);
  //           addToast(error.text, {
  //             appearance: 'error',
  //             autoDismiss: true,
  //           });
  //         }
  //       );
  //   };

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
              src="/assets/Buy_Illustration.png"
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
              src="/assets/Clean_Illustration.png"
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
              src="/assets/Sell Illustration.png"
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
              src="/assets/Rent_Illustration.png"
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
            <Text
              fontSize=".8rem"
              color="#33333"
              w={['98%', '80%']}
              textAlign="center"
            >
              Let's help you with anything related to our platform as we
              promised nothing but outstanding customer services
            </Text>
          </VStack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PrimaryInput<ReportModel>
              label="Full Name"
              name="userName"
              error={errors.userName}
              placeholder="Enter your Name"
              defaultValue={user?.fullName || ''}
              register={register}
            />
            <PrimaryInput<ReportModel>
              label="Email"
              name="email"
              error={errors.email}
              placeholder="Enter your email"
              defaultValue={user?.email || ''}
              register={register}
            />
            <ContactInput
              label="Phone number"
              name="phoneNumber"
              defaultValue=""
              placeholder="Type in a valid phone number"
            />
            <PrimaryTextArea<ReportModel>
              label="Message"
              name="description"
              error={errors.description}
              placeholder="Type your message here"
              defaultValue={''}
              register={register}
            />
            {/* <ContactInput
              label="Full Name"
              name="fullName"
              defaultValue=""
              placeholder="Pade Omotosho"
            />
            <ContactInput
              label="Email"
              name="email"
              defaultValue=""
              type="email"
              placeholder="padeomotoso@gmail.com"
            />
            <ContactInput
              label="Phone number"
              name="phoneNumber"
              defaultValue=""
              placeholder="Type in a valid phone number"
            />
            <ContactTextArea
              label="Message"
              name="message"
              placeholder="Type your message here"
            /> */}

            <ButtonComponent
              content="Send"
              isValid={true}
              loading={isSubmitting}
            />
          </form>

          <Box display={['none', 'block']}>
            <HStack spacing={4} justify="center">
              <Flex align="center">
                <Circle bgColor="brand.100" color="white" size="1rem">
                  <FaPhone fontSize=".4rem" />
                </Circle>
                <Box pl=".3rem">
                  <Text fontSize=".8rem" fontWeight="600">
                    09090002394
                  </Text>
                </Box>
              </Flex>

              <Flex align="center" mb="10px">
                <Circle bgColor="brand.100" color="white" size="1rem">
                  <GrMail fontSize=".4rem" />
                </Circle>
                <Box pl=".3rem">
                  <Text fontSize=".8rem" fontWeight="600">
                    hello@propertymataaz.com
                  </Text>
                </Box>
              </Flex>
              <Flex align="center" mb="10px">
                <Circle bgColor="brand.100" color="white" size="1rem">
                  <FaInstagram fontSize=".4rem" />
                </Circle>
                <Box pl=".3rem">
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

export default NewContact;
