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
import { useRef, useState } from 'react';

const mobile = /^([0]{1})[0-9]{10}$/;
const schema = yup.object().shape({
  phoneNumber: yup.string().matches(mobile, 'Invalid phone number'),
  profilePicture: yup.string(),
});

function Profile() {
  const users = Cookies.get('user') as unknown as string;
  let user: any;
  if (users !== undefined) {
    user = JSON.parse(users);
  }
  console.log({ user });

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

  const onChange = (info: any) => {
    setUrl(info.originalUrl);
    console.log('Uploaded', info);
  };

  const onSubmit = async (data: UpdateUserModel) => {
    console.log(url);

    if (!data.profilePicture) {
      let media: MediaModel = {
        url: url,
        isImage: true,
        name: '',
        extention: '',
        base64String: '',
        isVideo: false,
        isDocument: false,
      };
      data.profilePicture = media;
    }

    data.profilePicture.url = url as string;

    data.id = user.id as number;
    console.log({ data });

    try {
      const result = await (await updateUser(undefined, data)).data;
      console.log({ result });
      if (result.status) {
        addToast('Update succesful, Please login again!', {
          appearance: 'success',
          autoDismiss: true,
        });
        router.push('/login');
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    } catch (err) {}
  };
  return (
    <Stack
      direction="row"
      justify="center"
      h="89vh"
      w="85%"
      mx="auto"
      overflow="hidden"
      align="center"
    >
      <Box w="full" h="full" m="1rem unset" mt={['2rem', '1rem']}>
        <Flex align="flex-end" color="white">
          <Circle
            size="8rem"
            bg="grey"
            mb="1rem"
            role="group"
            pos="relative"
            overflow="hidden"
            mx={['auto', 'unset']}
          >
            <Box
              pos="absolute"
              left="50%"
              top="50%"
              w="full"
              h="full"
              display="flex"
              justifyContent="center"
              alignItems="center"
              transition=".5s ease all"
              opacity="0"
              cursor="pointer"
              transform="translate(-50%, -50%)"
              _groupHover={{ opacity: 1, bgColor: 'rgba(0,0,0,.3)' }}
              //@ts-ignore
              onClick={() => widgetApi.current.openDialog()}
            >
              <FaCamera color="white" fontSize="2rem" />
            </Box>
            <Image
              src={user?.profilePicture || '/assets/user-icon.png'}
              w="full"
              h="full"
              objectFit="cover"
              overflow="hidden"
            />
          </Circle>
          <Box pos="absolute" opacity="1" ml="9rem" mt="2rem">
            <Widget
              publicKey="fda3a71102659f95625f"
              imageShrink="480x480"
              imagesOnly
              onChange={onChange}
              previewStep
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
          <VStack
            align="flex-start"
            gap={0}
            w={['full', '70%']}
            //   p="2rem"
          >
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
      <Box w="full" h="full" mt="2rem !important" display={['none', 'block']}>
        <Image src="/assets/Buy_illustration.png" w="full" />
      </Box>
    </Stack>
  );
}

export default Profile;
