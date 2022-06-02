import { Stack, Grid, Box, Image, Text, Flex, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { useOperationMethod } from 'react-openapi-client';
import { Parameters } from 'openapi-client-axios';
import { PasswordReset, UserresetinitiateEmailParameters } from 'types/api';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import ButtonComponent from 'lib/components/Button';
import { useState } from 'react';
import Link from 'next/link';

const schema = yup.object().shape({
  newPassword: yup.string().required(),
});

const PasswordReset = () => {
  const [ResetComplete, { loading, data, error }] =
    useOperationMethod('Userresetcomplete');

  const router = useRouter();
  const { id } = router.query;
  console.log({ id });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PasswordReset>({
    resolver: yupResolver(schema),
    defaultValues: {
      code: id as unknown as string,
    },
    mode: 'all',
  });

  const { addToast } = useToasts();
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data: PasswordReset) => {
    try {
      const result = await (await ResetComplete(undefined, data)).data;
      console.log({ data });
      if (result.status) {
        addToast('Password Reset Succesfull', {
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
                  type="password"
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
