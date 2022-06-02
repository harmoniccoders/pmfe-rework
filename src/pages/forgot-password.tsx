import { PrimaryInput } from './../lib/Utils/PrimaryInput';
import {Stack, Grid, Box, Image} from '@chakra-ui/react'
import { LoginModel } from 'types/api';
import ButtonComponent from 'lib/components/Button';
import React, { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { useOperationMethod } from 'react-openapi-client';
import Cookies from 'js-cookie';


const schema = yup.object().shape({
    email: yup.string().email().required(),
  });

const ForgotPassword = () =>{

    const [LoginModelUser, {loading, data, error} ] = useOperationMethod('Usertoken');

    const {register, handleSubmit, formState: {errors, isValid},} = useForm<LoginModel>({
        resolver: yupResolver(schema),
        mode: 'all',
    });

    const { addToast } = useToasts();
    const router = useRouter();

    const onSubmit = async (data: LoginModel) =>{
        try{
            const result = await(await LoginModelUser(undefined, data)).data;
            console.log({ result });
            if (result.status) {
                addToast('Token sent!', {
                    appearance:'success',
                    autoDismiss: true,
                });
                Cookies.set('token', result.data.token);
                router.push('/password-reset');
                return;
            }
            addToast(result.message, {
                appearance: 'error',
                autoDismiss:true,
            });
            return;
        } catch (err) {}
    };

    return(
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
                <Image src="/admin.png" />
                </Box>

                <Stack
                alignItems="center !important"
                my="10rem"
                justifyContent="center"
                p="2rem"
                spacing={2}
                w="full"
                >
                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }} >
                        <PrimaryInput<LoginModel>
                        label="Username"
                        name="email"
                        error={errors.email}
                        defaultValue=""
                        register={register}
                        />
                        <ButtonComponent
                    content="Submit"
                    isValid={isValid}
                    loading={loading}
                    />
                    </form>
                </Stack>
            </Grid>
        </Box>
        </>
    )
}

export default ForgotPassword