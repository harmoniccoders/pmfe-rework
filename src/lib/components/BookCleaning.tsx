import { Box, Text, Button, VStack, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import ButtonComponent from 'lib/components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CleaningModel, PropertyType } from 'types/api';
import { useOperationMethod } from 'react-openapi-client';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import cookies from 'js-cookie';
import { PrimarySelectKey } from 'lib/Utils/PrimarySelectKey';
import NumberCounter from 'lib/Utils/NumberCounter';
import { useState } from 'react';
import { buildingState } from 'lib/Utils/BuildingStates';
import { PrimarySelectLabel } from 'lib/Utils/PrimarySelectLabel';
import { PrimaryDate } from 'lib/Utils/PrimaryDate';

const schema = yup.object().shape({
  buildingType: yup.string(),
  buildingState: yup.string(),
  propertyTypeId: yup.number().required(),
  dateNeeded: yup.string().required(),
  numberOfBedrooms: yup.number(),
  numberOfBathrooms: yup.number(),
  numberOfFloors: yup.number(),
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
    control,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<CleaningModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const { addToast } = useToasts();
  const router = useRouter();
  const [buildingType, setBuildingType] = useState('');

  setValue('buildingType', buildingType);

  const clearFieldsOnClose = () => {
    reset({
      buildingType: '',
      dateNeeded: '',
      numberOfBathrooms: 0,
      numberOfFloors: 0,
      numberOfBedrooms: 0,
    });
    closeModal();
  };

  console.log(watch('numberOfBedrooms'));
  console.log(watch('numberOfBathrooms'));
  console.log(watch('numberOfFloors'));

  const onSubmit = async (data: CleaningModel) => {
    data.dateNeeded = new Date(
      data.dateNeeded as unknown as Date
    ).toLocaleDateString();

    try {
      const result = await (await RequestCleaning(undefined, data)).data;
      console.log({ result });
      if (result.status) {
        addToast('Application created sucessfully', {
          appearance: 'success',
          autoDismiss: true,
        });
        closeModal();
        router.push('/clean');
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      closeModal();
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
        <Box mt="5">
          <Text fontSize="sm" fontWeight="500">
            Is the building residential or commercial?
          </Text>

          <HStack mt={1} spacing={4}>
            <Button
              height="2.5rem"
              fontSize="sm"
              onClick={() => setBuildingType('residential')}
              variant={buildingType == 'residential' ? 'solid' : 'outline'}
            >
              Residential
            </Button>
            <Button
              fontSize="sm"
              height="2.5rem"
              onClick={() => setBuildingType('commercial')}
              variant={buildingType == 'commercial' ? 'solid' : 'outline'}
            >
              Commercial
            </Button>
          </HStack>
        </Box>
        <PrimarySelectKey<CleaningModel>
          label="What type of building is it?"
          name="propertyTypeId"
          register={register}
          error={errors.propertyTypeId}
          control={control}
          options={result}
          fontSize="sm"
          placeholder="Choose an option"
        />
        <PrimarySelectLabel<CleaningModel>
          label=" What is the state of the building?"
          name="buildingState"
          register={register}
          error={errors.buildingState}
          control={control}
          options={buildingState}
          fontSize="sm"
          placeholder="Choose an option"
        />
        <PrimaryDate<CleaningModel>
          label="When do you want the cleaning done?"
          name="dateNeeded"
          error={errors.dateNeeded}
          register={register}
          control={control}
          minDate={new Date()}
          fontSize="sm"
        />

        <NumberCounter
          valueName="numberOfBedrooms"
          setValue={setValue}
          getValues={getValues}
          label="Number of Bedrooms"
          fontSize="sm"
        />
        <NumberCounter
          valueName="numberOfBathrooms"
          setValue={setValue}
          getValues={getValues}
          label="Number of Bathrooms"
          fontSize="sm"
        />
        <NumberCounter
          valueName="numberOfFloors"
          setValue={setValue}
          getValues={getValues}
          label="Number of Floors"
          fontSize="sm"
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
        // type="reset"
        onClick={clearFieldsOnClose}
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
