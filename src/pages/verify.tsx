import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
  Link,
} from '@chakra-ui/react';
import ButtonComponent from 'lib/components/Button';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UserverifyUserTokenEmailParameters } from 'types/api';
import { useOperationMethod } from 'react-openapi-client';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import cookies from 'js-cookie';

const schema = yup.object().shape({
  token: yup.string().required(),
});

const verify = () => {
  const router = useRouter();

  const usersEmail = cookies.get('email');

  let userEmail;

  if (usersEmail !== undefined) {
    userEmail = JSON.parse(usersEmail);
  } else {
    userEmail = '';
  }

  const [VerifyUser, { loading, data, error }] = useOperationMethod(
    'UserverifyUser{token}{email}'
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserverifyUserTokenEmailParameters>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: userEmail as unknown as string,
    },
    mode: 'all',
  });
  const { addToast } = useToasts();

  const onSubmit = async (data: UserverifyUserTokenEmailParameters) => {
    try {
      const result = await (await VerifyUser(undefined, data)).data;
      console.log({ result });
      if (result.status) {
        addToast('Verification Complete', {
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box w="100%">
      <Box
        w="90%"
        mx="auto"
        border="2px hidden green"
        h={['80vh', 'auto']}
        display="flex"
        flexDir="column"
        justifyContent={['center', 'flex-start']}
        mt="30px"
      >
        <Flex width="100%" direction={['column', 'column', 'row']}>
          <Box w="100%" border="2px hidden red" pr={[0, 0, '1.25rem']}>
            <Heading
              sx={{
                '::first-letter': {
                  textTransform: 'uppercase',
                },
              }}
              lineHeight={1.5}
              mb={['1.8rem', '2.4rem']}
              fontSize={['1.6rem', '1.875rem', '2.3rem']}
              w={['100%', '60%', '100%']}
            >
              enter your very own property one-stop shop!
            </Heading>

            <Box
              display={['none', 'block']}
              w="100%"
              h={[0, '18rem', '20rem']}
              // bg="brand.100"
            >
              <Image
                src="admin.png"
                alt="an image to display"
                w="100%"
                h="100%"
                objectFit="contain"
              />
            </Box>
          </Box>
          <Box
            w={['100%', '100%', '100%']}
            border="2px hidden blue"
            pl={[0, 0, '2.5rem']}
            pt={[0, 0, '1.5rem']}
            mt={[0, '20px', 0]}
            margin="auto"
            h={['auto', 'auto', '88vh']}
            display="flex"
            flexDirection="column"
            justifyContent={['flex-start', 'flex-start', 'center']}
          >
            <Text color="brand.50" lineHeight={1.5} mt="10px" mb="5px">
              A confirmation mail was sent to you. Please check your mail to
              verify your account.
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <PrimaryInput<UserverifyUserTokenEmailParameters>
                label="Email verification code"
                name="token"
                error={errors.token}
                placeholder="Enter verifiation code"
                defaultValue=""
                register={register}
              />

              <ButtonComponent
                content="Verify"
                isValid={isValid}
                loading={loading}
              />
            </form>

            <Box bg="brand.50" w="100%" h="1px" my="10px"></Box>

            <Box w="100%" margin="20px 0 30px">
              <Text textAlign="center" padding="10px 0 10px">
                By creating an account you agree to our <br />
                <NextLink href="#" passHref>
                  <Link color="brand.100">terms &amp; conditions</Link>
                </NextLink>
              </Text>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default verify;
