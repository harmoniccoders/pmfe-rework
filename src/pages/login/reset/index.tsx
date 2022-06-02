import { Stack, Grid, Box, Image } from '@chakra-ui/react';
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
      console.log({ result });
      if (result.status) {
        addToast(result.message, {
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
    <>
      <Box w="90%" mx="auto" h="80vh" overflow="hidden">
        <Grid templateColumns={['repeat(1,1fr)', 'repeat(2,1fr)']} gap={5}>
          <Box
            w="45vw"
            h={['33vh', '60vh']}
            // bg="#ccc"
            my="5rem"
            mx="1.3rem"
            borderRadius="8px"
          >
            <Image src="/assets/admin.png" />
          </Box>

          <Stack
            alignItems="center !important"
            my="10rem"
            justifyContent="center"
            p="2rem"
            spacing={2}
            w="full"
          >
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
