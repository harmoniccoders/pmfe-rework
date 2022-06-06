import {
    Box,
    Text,
    Grid,
    Stack,
    FormLabel,
    Image,
    Input,
    Button,
    Checkbox,
    InputGroup,
    Flex,
    Divider,
  } from '@chakra-ui/react';
 
  import { PrimaryInput } from 'lib/Utils/PrimaryInput';
  //import { PrimarySelect } from 'lib/Uti;s/PrimarySelect'
  import { Property } from 'types/api';
import ButtonComponent from 'lib/components/Button';
import React, { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { useOperationMethod } from 'react-openapi-client';
import { PrimarySelect } from './../../lib/Utils/PrimarySelect';

const schema = yup.object().shape({
    id: yup.string(),
    dateCreated: yup.string(),
    dateModified: yup.string(),
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
                <Stack p='2rem'>
                    <form  onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <PrimaryInput
                    label="id"
                    name="id"
                    error={errors.id}
                    defaultValue=""
                    register={register}
                    style={{display:'none'}}
                    />
                    <PrimaryInput
                    label="id"
                    name="dateCreated"
                    error={errors.dateCreated}
                    defaultValue=""
                    register={register}
                    style={{display:'none'}}
                    />
                    <PrimaryInput
                    label="id"
                    name="dateModified"
                    error={errors.dateModified}
                    defaultValue=""
                    register={register}
                    style={{display:'none'}}
                    />

                    <PrimaryInput
                    label="Name"
                    name="name"
                    error={errors.name}
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
                    label="Address"
                    name="Address"
                    error={errors.address}
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
                     {/* <FormControl>
                        <FormLabel
                            htmlFor="What is the state of the building?"
                            textTransform="capitalize"
                            pos="relative"
                            top={5}
                            left={4}
                            width="fit-content"
                            zIndex={3}
                            bg="brand.200"
                        >
                            What is the state of the building?
                        </FormLabel>
                        <Select placeholder="Choose an option" size="lg" fontSize="md">
                            {result.map((options: any) => {
                            return <option key={options.name}>{options.name}</option>;
                            })}
                        </Select>
                        </FormControl> */}
                    
                    <PrimaryInput
                    label="Area"
                    name="area"
                    error={errors.area}
                    defaultValue=""
                    register={register}
                    />
                    
                    <Checkbox>I want to sell myself</Checkbox>
                    <Checkbox>Help me sell </Checkbox>
                    <Button color='white' bg='brand.100' w='100%' borderRadius='8px' cursor='pointer' >Next</Button>
                    </form>
                </Stack>
            </Box>
        </>
    );
};

export default Form;