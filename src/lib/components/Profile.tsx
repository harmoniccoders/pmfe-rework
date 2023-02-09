import {
  Box,
  Circle,
  Flex,
  FormLabel,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Cookies from 'js-cookie';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FaCamera } from 'react-icons/fa';
import { useOperationMethod } from 'react-openapi-client';
import { useToasts } from 'react-toast-notifications';
import { UpdateUserModel, MediaModel } from 'types/api';
import ButtonComponent from './Button';
import { Widget } from '@uploadcare/react-widget';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { DataAccess } from 'lib/Utils/Api';
import { UserContext } from 'lib/Utils/MainContext';

const mobile = /^([0]{1})[0-9]{10}$/;
const schema = yup.object().shape({
  phoneNumber: yup.string().matches(mobile, 'Invalid phone number'),
  profilePicture: yup.string(),
});

function Profile() {
  const { user, setUser } = useContext(UserContext);

  // console.log({ user });

  const [updateUser, { loading, data, error }] =
    useOperationMethod('Userupdate');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UpdateUserModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const { addToast } = useToasts();
  const router = useRouter();
  const [url, setUrl] = useState('');
  const widgetApi = useRef();

  const onSubmit = async (data: UpdateUserModel) => {
    // if (!data.profilePicture) {
    //   let media: MediaModel = {
    //     url: url,
    //     isImage: true,
    //     name: '',
    //     extention: '',
    //     base64String: '',
    //     isVideo: false,
    //     isDocument: false,
    //   };
    //   data.profilePicture = media;
    // }

    // data.profilePicture.url = url as string;

    data.id = user.id as number;

    console.log({ data });

    try {
      const result = await (await updateUser(undefined, data)).data;

      // console.log({ result });
      if (result.status) {
        addToast('Profile Update successful!', {
          appearance: 'success',
          autoDismiss: true,
        });
        Cookies.set('user', JSON.stringify(result.data));
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

  const bearer = `Bearer ${Cookies.get('token')}`;
  const _dataAccess = new DataAccess(bearer);

  const onChange = async (info: any) => {
    setUrl(info.originalUrl);

    const updates = {
      id: user.id,
      profilePicture: {
        url: info.originalUrl,
        isImage: true,
        name: '',
        extention: '',
        base64String: '',
        isVideo: false,
        isDocument: false,
      },
    };

    try {
      const result = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASEURL}${'/api/User/update'}`,
        updates,
        {
          headers: {
            Authorization: bearer,
          },
        }
      );
      if (result.data.status) {
        addToast('Profile Update successful!', {
          appearance: 'success',
          autoDismiss: true,
        });
        Cookies.set('user', JSON.stringify(result.data.data));
        setUser(result.data.data);
        return;
      }
      addToast(result.data.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      console.log({ result });
    } catch (error) {}
  };

  return (
    <Stack
      direction="row"
      justify="center"
      minH="89vh"
      w="85%"
      mx="auto"
      overflow="hidden"
      align="center"
      py="2rem"
    >
      <Box w="full" h="full" m="1rem unset" mt={['2rem', '1rem']}>
        <Flex align="flex-end" color="white">
          <Circle
            size="8rem"
            bg="grey"
            mb="1rem"
            role="group"
            pos="relative"
            mx={['auto', 'unset']}
          >
            <Box
              pos="absolute"
              top="0"
              right="0"
              //@ts-ignore
              onClick={() => widgetApi.current.openDialog()}
            >
              <FaCamera color="#0042ff" fontSize="1.5rem" />
            </Box>
            <Image
              src={user?.profilePicture || '/assets/user-icon.png'}
              w="full"
              h="full"
              borderRadius="50%"
              objectFit="cover"
              overflow="hidden"
            />
          </Circle>
          <Box pos="absolute" opacity="1" ml="9rem" mt="2rem">
            <Widget
              publicKey="fda3a71102659f95625f"
              imageShrink="480x480"
              imagesOnly
              previewStep
              onChange={onChange}
              //@ts-ignore
              ref={widgetApi}
            />
          </Box>
        </Flex>
        <Text
          fontSize=".8rem"
          fontWeight="bold"
          color="brand.100"
          textDecoration="underline dashed"
          mt="1rem"
        >
          Personal Information
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <VStack align="flex-start" gap={0} w={['full', '70%']}>
            <Box w="full">
              <FormLabel
                textTransform="capitalize"
                pos="relative"
                top={5}
                left={4}
                width="fit-content"
                zIndex={3}
                bg="brand.200"
                fontSize=".8rem"
                px=".2rem"
              >
                Full Name
              </FormLabel>
              <Input
                placeholder=""
                variant="outline"
                defaultValue={user?.fullName}
                disabled={true}
                borderColor="brand.100"
                border="2px solid"
              />
            </Box>
            <Box w="full">
              <FormLabel
                textTransform="capitalize"
                pos="relative"
                top={5}
                left={4}
                width="fit-content"
                zIndex={3}
                bg="brand.200"
                fontSize=".8rem"
                px=".2rem"
              >
                Email
              </FormLabel>
              <Input
                placeholder=""
                variant="outline"
                defaultValue={user?.email}
                disabled={true}
                borderColor="brand.100"
                border="2px solid"
              />
            </Box>
            <Box w="full">
              <PrimaryInput<UpdateUserModel>
                label="Phone Number"
                fontSize=".8rem"
                name="phoneNumber"
                error={errors.phoneNumber}
                defaultValue={user?.phoneNumber}
                register={register}
                border="2px solid"
                borderColor="#99b3ff"
              />
            </Box>
            <Box w="full">
              <FormLabel
                textTransform="capitalize"
                pos="relative"
                top={5}
                left={4}
                width="fit-content"
                zIndex={3}
                bg="brand.200"
                fontSize=".8rem"
                px=".2rem"
              >
                Occupation
              </FormLabel>
              <Input
                placeholder=""
                variant="outline"
                defaultValue={
                  user?.occupation ? user.occupation : 'No data available'
                }
                disabled={true}
                borderColor="brand.100"
                border="2px solid"
              />
            </Box>
            <Box w="full">
              <ButtonComponent
                content="Update User Information"
                isValid={isValid}
                loading={loading}
              />
            </Box>
          </VStack>
        </form>
      </Box>
      <Box
        w="full"
        h="full"
        mt="2rem !important"
        display={{ base: 'none', lg: 'block' }}
      >
        <Image src="/assets/Buy_Illustration.png" w="full" />
      </Box>
    </Stack>
  );
}

export default Profile;
