import {
    Box,
    Text,
    Grid,
    Stack,
    FormLabel,
    Image,
    Input,
    Button,
    CheckBox,
    InputGroup,
    Flex,
    Divider,
  } from '@chakra-ui/react';
  import { PrimaryInput } from 'lib/Utils/PrimaryInput';
  import { Property } from 'types/api';
import ButtonComponent from 'lib/components/Button';
import React, { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { useOperationMethod } from 'react-openapi-client';

const schema = yup.object().shape({
    name: yup.string().required(),
    address: yup.string().required(),
    description: yup.string().required(),
    title: yup.string().required(),
  });

const Form = () =>{

    const [PropertyUser, {loading, data, error}] =
     useOperationMethod('PropertyCreate');

    const { 
        register,
         handleSubmit,
          formState: {errors, isValid},
        } = useForm<Property>({
        resolver: yupResolver(schema),
        mode:'all',
    });

    const { addToast } = useToasts();
    const router = useRouter();

    const onSubmit = async (data: Property) => {
        try{
            const result = await (await PropertyUser(undefined, data)).data;
            console.log({result});
            if (result.status) {
                addToast('Property Added',{
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
        <>
            <Box>
                <Stack>
                    <form  onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    
                    <PrimaryInput
                    label="Name"
                    name="name"
                    error={errors.name}
                    defaultValue=""
                    register={register}
                    />
                    <PrimaryInput
                    label="Address"
                    name="Address"
                    error={errors.address}
                    defaultValue=""
                    register={register}
                    />
                    <PrimaryInput
                    label="Property Title"
                    name="title"
                    error={errors.title}
                    defaultValue=""
                    register={register}
                    />
                    <PrimaryInput
                    label="Area"
                    name="area"
                    error={errors.area}
                    defaultValue=""
                    register={register}
                    />
                    <PrimaryInput
                    label="Description"
                    name="Description"
                    error={errors.description}
                    defaultValue=""
                    register={register}
                    />
                    </form>
                </Stack>
            </Box>
        </>
    );
};

export default Form;