import { Stack, Grid, Box, Image, Text, Flex, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useOperationMethod } from 'react-openapi-client';
import { PasswordReset } from 'types/api';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import ButtonComponent from 'lib/components/Button';
import { useState } from 'react';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';

const schema = yup.object().shape({
  newPassword: yup.string().required(),
  code: yup.string(),
});

const PasswordReset = ({ code }: { code: string }) => {
  const [ResetComplete, { loading, data, error }] =
    useOperationMethod('Userresetcomplete');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PasswordReset>({
    resolver: yupResolver(schema),
    defaultValues: {
      code: code,
    },
    mode: 'all',
  });

  const { addToast } = useToasts();
  const [showPassword, setShowPassword] = useState(true);
  const changePasswordField = () => {
    setShowPassword(!showPassword);
  };

  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data: PasswordReset) => {
    try {
      const result = await (await ResetComplete(undefined, data)).data;
      if (result.status) {
        addToast('Password Reset successfull', {
          appearance: 'success',
          autoDismiss: true,
        });
        setShowSuccess(true);
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

  return (
    <>
      <Box w="90%" mx="auto" h="80vh" mt="1.5rem" overflow="hidden">
        <Grid templateColumns={['repeat(1,1fr)', 'repeat(2,1fr)']} gap={5}>
          <Box
            w={['90%', '100%', '40vw']}
            h={['100%', '100%', '60vh']}
            justifyContent="center"
            display={['none', 'flex']}
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
            spacing={2}
            w="full"
          >
            {showSuccess ? (
              <Flex flexDirection="column" align="center">
                <Text
                  fontSize="1rem"
                  w="70%"
                  fontWeight="500"
                  textAlign="center"
                >
                  Password reset completed, you can now login with new
                  credentials
                </Text>

                <Link href="/login" passHref>
                  <Button
                    type="submit"
                    w="100%"
                    h="50px"
                    my="25px"
                    variant="solid"
                    textTransform="capitalize"
                  >
                    Go to Login
                  </Button>
                </Link>
              </Flex>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <PrimaryInput<PasswordReset>
                  label="New Password"
                  name="newPassword"
                  error={errors.newPassword}
                  defaultValue=""
                  register={register}
                  changePasswordType={changePasswordField}
                  type={showPassword ? 'password' : 'text'}
                  iconClass={showPassword ? 'fa-eye' : 'fa-eye-slash'} 
        
                />

                <ButtonComponent
                  content="Submit"
                  isValid={isValid}
                  loading={loading}
                />
              </form>
            )}
          </Stack>
        </Grid>
      </Box>
    </>
  );
};

export default PasswordReset;

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;
  return {
    props: {
      code: id,
    },
  };
};
