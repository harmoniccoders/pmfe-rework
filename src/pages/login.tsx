import { Box, Text, Grid,Stack, FormLabel, Image, Input, Button, InputGroup } from "@chakra-ui/react";
import {PrimaryInput} from 'lib/Utils/PrimaryInput'
import { LoginModel } from 'types/api';
import  ButtonComponent  from 'lib/components/Button'
import React, { FormEvent } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { useOperationMethod } from 'react-openapi-client';



const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  }).required();

const Login = () =>{

    
    const [LoginModelUser, { loading, data, error }] = useOperationMethod('Usertoken');   

    const { login, handleSubmit, formState:{ errors, isValid } } = useForm<LoginModel>({
        resolver: yupResolver(schema),
        mode: 'all,'
      });

    const { addToast } = useToasts();
    const router = useRouter();

    const onSubmit = async (data: LoginModel) => {
        try {
        const result = await (await LoginModelUser(undefined, data)).data;
        console.log({ result });
        if (result.status) {
            addToast('Login Successful', {
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
        } catch (err) {}
    };
    
    return(
        <Grid templateColumns={["repeat(1,1fr)","repeat(2,1fr)"]}  gap={5}>
            
            <Box w='50vw' h={['35vh','65vh']} bg='#ccc' my='5rem'  mx='1.3rem' borderRadius='8px' />
            
            <Stack alignItems='center !important' my='10rem' justifyContent='center' p='2rem' spacing={2} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <PrimaryInput<LoginModel>
                        label="Email"
                        name="email"
                        error={errors.email}
                        defaultValue=""
                        login={login}
                    />
                    <PrimaryInput<LoginModel>
                        label="Password"
                        name="password"                
                        defaultValue=""
                        error={errors.password}
                        type="password"
                    />
                        <ButtonComponent
                        content="Login"
                        isValid={isValid}
                        loading={loading}
                    />
                </form>
            </Stack>
        </Grid>
    )
}

export default Login