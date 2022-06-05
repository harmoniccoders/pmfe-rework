import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
  Link,
  Button,
  Select,
  FormControl,
  FormLabel,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import ButtonComponent from 'lib/components/Button';
import React, { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { Register } from 'types/api';
import { CleaningModel, PropertyType } from 'types/api';
import { useOperationMethod } from 'react-openapi-client';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import cookies from 'js-cookie';
import { PrimaryNumberInput } from 'lib/Utils/PrimaryNumberInput';

const schema = yup.object().shape({
  // fileName: yup.string(),
  buildingType: yup.string(),
  buildingState: yup.string(),
  dateNeeded: yup.string().required(),
  numberOfBedrooms: yup.number().required(),
  numberOfBathrooms: yup.number().required(),
  numberOfFloors: yup.number().required(),
});

const BookCleaning = ({
  result,
  closeModal,
}: {
  result: PropertyType[];
  closeModal: any;
}) => {
  const [RequestCleaning, { loading, data, error }] =
    useOperationMethod('Cleanrequest');
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CleaningModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const { addToast } = useToasts();
  const router = useRouter();

  const onSubmit = async (data: CleaningModel) => {
    try {
      const result = await (await RequestCleaning(undefined, data)).data;
      console.log({ result });
      if (result.status) {
        addToast('Application created sucessfully', {
          appearance: 'success',
          autoDismiss: true,
        });
        router.push('/clean');
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    } catch (err) {
      console.log(err);
      console.log('errr');
    }
  };
  return (
    <Box width="90%" mx="auto" mt={['1.875rem', '2.3rem']}>
      <Text fontWeight="600" color="brand.100" fontSize="sm">
        Book Cleaning Session
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel
            htmlFor="What type of building is it?"
            textTransform="capitalize"
            pos="relative"
            top={5}
            left={4}
            width="fit-content"
            zIndex={3}
            bg="brand.200"
          >
            What type of building is it?
          </FormLabel>
          <Select placeholder="Choose an option" size="lg" fontSize="md">
            {result.map((options: any) => {
              return (
                <option key={options.name} value={options.name}>
                  {options.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <FormControl>
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
        </FormControl>
        <PrimaryInput<CleaningModel>
          label="When do you want the cleaning done?"
          name="dateNeeded"
          error={errors.dateNeeded}
          placeholder=""
          defaultValue=""
          type="date"
          register={register}
        />
        <PrimaryNumberInput<CleaningModel>
          label="Number of Bedrooms"
          name="numberOfBedrooms"
          error={errors.numberOfBedrooms}
          placeholder="0"
          defaultValue=""
          register={register}
        />
        <PrimaryNumberInput<CleaningModel>
          label="Number of Bathrooms/Toilets"
          name="numberOfBathrooms"
          error={errors.numberOfBathrooms}
          placeholder="0"
          defaultValue=""
          register={register}
        />
        <PrimaryNumberInput<CleaningModel>
          label="Number of Floors"
          name="numberOfFloors"
          error={errors.numberOfFloors}
          placeholder="0"
          defaultValue=""
          register={register}
        />
        <ButtonComponent
          content="Get Qoute"
          isValid={isValid}
          loading={loading}
        />
      </form>
      <Button
        variant="outline"
        w="full"
        onClick={closeModal}
        color="gray"
        fontWeight="100"
      >
        Cancel
      </Button>
      <VStack spacing="1" mt=".5rem" pb="14" fontSize="sm">
        <Text textAlign="center">By sending this request you agree to our</Text>
        <NextLink href="#" passHref>
          <Text color="brand.100" fontWeight="600" cursor="pointer">
            Terms &amp; Conditions
          </Text>
        </NextLink>
      </VStack>
    </Box>
  );
};

export default BookCleaning;
