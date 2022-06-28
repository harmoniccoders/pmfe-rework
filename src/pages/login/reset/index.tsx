import { Stack, Grid, Box, Image, Heading } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { useOperationMethod } from 'react-openapi-client';
import { Parameters } from 'openapi-client-axios';
import { UserresetinitiateEmailParameters } from 'types/api';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import ButtonComponent from 'lib/components/Button';

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const ForgotPassword = () => {
  const [InitiateEmail, { loading, data, error }] = useOperationMethod(
    'Userresetinitiate{email}'
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserresetinitiateEmailParameters>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const { addToast } = useToasts();
  const router = useRouter();

  const onSubmit = async (data: UserresetinitiateEmailParameters) => {
    const params: Parameters = {
      email: data.email as string,
    };
    try {
      const result = await (await InitiateEmail(params)).data;

      if (result.status) {
        addToast(
          'We have sent a message to your registered email to help you reset your password',
          {
            appearance: 'success',
            autoDismiss: true,
          }
        );
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
    <>
      <Box w="90%" mx="auto" h="80vh" mt="1.5rem" overflow="hidden">
        <Grid templateColumns={['repeat(1,1fr)', 'repeat(2,1fr)']} gap={5}>
          <Box
            w={['90%', '100%', '40vw']}
            h={['100%', '100%', '60vh']}
            display={['none', 'flex']}
            justifyContent="center"
            textAlign="center"
            mx="1.3rem"
            borderRadius="8px"
          >
            <Image
              src="/assets/admin.png"
              my={['1rem', '2rem !important', '5rem']}
            />
          </Box>

          <Stack
            alignItems="center !important"
            justifyContent="center"
            h={['60vh', 'auto']}
            spacing={2}
            w="full"
          >
            <Heading fontSize="1.5rem" mb="4">
              Reset Password
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
              <PrimaryInput<UserresetinitiateEmailParameters>
                label="Username"
                name="email"
                error={errors.email}
                defaultValue=""
                register={register}
              />
              <ButtonComponent
                content="Proceed"
                isValid={isValid}
                loading={loading}
              />
            </form>
          </Stack>
        </Grid>
      </Box>
    </>
  );
};

export default ForgotPassword;
