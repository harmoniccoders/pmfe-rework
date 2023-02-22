import { Box, Divider, Flex, Heading, Image, Text } from '@chakra-ui/react';
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
import { Parameters } from 'openapi-client-axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const schema = yup.object().shape({
  token: yup.string().required(),
});

const verify = () => {
  const router = useRouter();
  const userEmail = Cookies.get('userEmail')?.replaceAll('"', '');

  const [VerifyUser, { loading, data, error }] = useOperationMethod(
    'UserverifyUser{token}{email}'
  );
  const [ReverifyUser, { loading:load, data:datas, error:errored }] = useOperationMethod(
    'Userreverify{email}' 
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserverifyUserTokenEmailParameters>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: userEmail,
    },
    mode: 'all',
  });
  const { addToast } = useToasts();
  const [minutes, setMinutes] = useState(1); 
  const [seconds,setSeconds] = useState(59);
   console.log({seconds})
  const resendCode =async () => {
    try {
      const result = await (await ReverifyUser(userEmail)).data 
      console.log({result})
      if (result.status) {
        addToast('Code has been sent, check your mail', {
          appearance: 'success',
          autoDismiss: true,
        });
        setMinutes(1); setSeconds(59)
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
  }
  const onSubmit = async (data: UserverifyUserTokenEmailParameters) => {
    const params: Parameters = {
      token: data.token as string,
      email: data.email as string,
    };
    try {
      const result = await (await VerifyUser(params)).data;

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
    } catch (err: any) {
      addToast(err.message || err.body.message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };
useEffect(()=>{
  const timeInterval = setInterval (()=>{
     if (seconds > 0 ) {
      setSeconds(seconds - 1)
     }
     if (seconds === 0) {
       if (minutes === 0) {
         clearInterval(timeInterval)
       } else {
         setMinutes(minutes - 1)
         setSeconds (59)
       }
     }
  }, 1000)
   return() => {
    clearInterval(timeInterval)
   }
}, [seconds, minutes])
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
              fontSize={['1.8rem', '1.875rem', '2.3rem']}
              w={['100%', '60%', '100%']}
              textAlign={['center', 'left']}
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
                src="assets/admin.png"
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
            <Text
              color="black"
              lineHeight={1.5}
              mt="10px"
              mb="5px"
              w="80%"
              mx="auto"
              textAlign="center"
            >
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
            
              <Text
              color="black"
              lineHeight={1.5}
              mt="10px"
              mb="5px"
              w="80%"
              mx="auto"
              textAlign="center"
            >
              Didnt receive code? <Box cursor={"pointer"} as="span" color={seconds > 0 || minutes > 0? "gray.300":"brand.100"} onClick={seconds > 0 || minutes > 0? ()=> void(0): ()=> resendCode()}>resend code</Box>
              {(seconds > 0 || minutes > 0) && <Box as="span"> In {minutes} {minutes > 1? "minutes":"minute"}:{seconds} {seconds > 1? "seconds":"second"} </Box>}
                
            </Text>


            <Divider borderColor="brand.50" />

            <Flex
              w="100%"
              align="center"
              mb="1rem"
              mt=".5rem"
              justify="center"
              fontSize=".7rem"
            >
              <Text textAlign="center" padding="10px 0">
                By creating an account you agree to our &nbsp;
              </Text>
              <NextLink href="#" passHref>
                <Text color="brand.100" cursor="pointer">
                  terms &amp; conditions
                </Text>
              </NextLink>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default verify;