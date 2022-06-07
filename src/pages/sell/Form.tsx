import {
    Box,
    Text,
    Grid,
    Stack,
    FormControl,
    Select,
    Option,
    FormLabel,
    Image,
    Input,
    Button,
    Checkbox,
    InputGroup,
    Flex,
    Divider,
    HStack,
  } from '@chakra-ui/react';
 
  import { PrimaryInput } from 'lib/Utils/PrimaryInput';
  //import { PrimarySelect } from 'lib/Uti;s/PrimarySelect'
  import { PropertyModel } from 'types/api';
import ButtonComponent from 'lib/components/Button';
import React, { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { useOperationMethod } from 'react-openapi-client';
import { PrimaryNumberInput } from 'lib/Utils/PrimaryNumberInput';

const schema = yup.object().shape({
    id: yup.string(),
    dateCreated: yup.string(),
    dateModified: yup.string(),
    name: yup.string().required(),
    address: yup.string().required(),
    description: yup.string().required(),
    title: yup.string().required(),
    numberOfBedrooms: yup.number().required(),
    numberOfBathrooms: yup.number().required(),
  });

const Form = () =>{

    const [formStep, setFormStep] = useState(0);
    const { watch } = useForm();

    const [PropertyUser, {loading, data, error}] =
     useOperationMethod('PropertyCreate');

    const completeFormStep = () =>{
        setFormStep(cur => cur + 1)
    }

    const RenderButton = () =>{
        if (formStep > 1){
            return null;
        }
        else if( formStep  === 1 ){
            return (
                <>
                    <Box>
                        <HStack spacing={3}>
                            <Button>Save as Draft</Button>
                            <Button>Submit</Button>
                        </HStack>
                        <Button>Cancel</Button>
                    </Box>
                </>
            )
        } else(            
                <Button onClick={completeFormStep} color='white' bg='brand.100' w='100%' borderRadius='8px' cursor='pointer' >Next</Button>
              
        )
    }

    const { 
        register,
         handleSubmit,
          formState: {errors, isValid},
        } = useForm<PropertyModel>({
        resolver: yupResolver(schema),
        mode:'all',
    });

    const { addToast } = useToasts();
    const router = useRouter();

    const onSubmit = async (data: PropertyModel) => {
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
                   { formStep === 0 &&(
                   
                    <>
                    <PrimaryInput<PropertyModel>
                    label="Name"
                    name="name"
                    error={errors.name}
                    defaultValue=""
                    placeholder='Give your listing a merit maker it is easy to find'
                    register={register}
                    />
                    <FormControl>
                        <FormLabel
                            htmlFor="Type"
                            textTransform="capitalize"
                            pos="relative"
                            top={5}
                            left={4}
                            width="fit-content"
                            zIndex={3}
                            bg="brand.200"
                        >
                           Type
                        </FormLabel>
                        <Select placeholder="Give your property a type" size="lg" fontSize="md">
                            {/* {result.map((options: any) => {
                            return <option key={options.name}>{options.name}</option>;
                            })} */}
                            <Option>Lagos</Option>
                            <Option>Kwara</Option>
                            <Option>Kastina</Option>
                        </Select>
                    </FormControl>
                    <PrimaryInput
                    label="Property Title"
                    name="title"
                    placeholder='Give your property a title'
                    error={errors.title}
                    defaultValue=""
                    register={register}
                    />
                   
                     <FormControl>
                        <FormLabel
                            htmlFor="State?"
                            textTransform="capitalize"
                            pos="relative"
                            top={5}
                            left={4}
                            width="fit-content"
                            zIndex={3}
                            bg="brand.200"
                        >
                            State
                        </FormLabel>
                        <Select placeholder="Give your property a state" size="lg" fontSize="md">
                            {/* {result.map((options: any) => {
                            return <option key={options.name}>{options.name}</option>;
                            })} 
                            */}
                            <Option>Lagos</Option>
                            <Option>Kwara</Option>
                            <Option>Kastina</Option>
                        </Select>
                    </FormControl>
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
                    <Select placeholder="LGA" size="lg" fontSize="md">
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
                     <PrimaryInput
                    label="Address"
                    name="address"
                    error={errors.address}
                    defaultValue=""
                    register={register}
                    />
                    <PrimaryInput
                    label="Description"
                    name="description"
                    error={errors.description}
                    defaultValue=""
                    register={register}
                    />
                    
                    <Checkbox>I want to sell myself</Checkbox>
                    <Checkbox>Help me sell </Checkbox>
                    </>
                     )}
                     { formStep === 1 &&(
                   
                    <>
                        <PrimaryInput
                        label="Price"
                        name="price"
                        error={errors.price}
                        placeholder='N0'
                        defaultValue=""
                        register={register}
                        />
                        <PrimaryNumberInput<PropertyModel>
                        label="Number of Bedrooms"
                        name="numberOfBedrooms"
                        error={errors.numberOfBedrooms}
                        placeholder="0"
                        defaultValue=""
                        register={register}
                        />
                        <PrimaryNumberInput<PropertyModel>
                        label="Number of Bathrooms/Toilets"
                        name="numberOfBathrooms"
                        error={errors.numberOfBathrooms}
                        placeholder="0"
                        defaultValue=""
                        register={register}
                        />
                    </>

                     )}

                    {RenderButton}
                  
                    </form>
                </Stack>
            </Box>
        </>
    );
};

export default Form;