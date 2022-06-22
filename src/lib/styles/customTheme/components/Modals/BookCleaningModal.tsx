import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  ModalBody,
  ModalHeader,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import ButtonComponent from 'lib/components/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CleaningModel, PropertyType } from 'types/api';
import { useOperationMethod } from 'react-openapi-client';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { PrimarySelectKey } from 'lib/Utils/PrimarySelectKey';
import NumberCounter from 'lib/Utils/NumberCounter';
import { useState } from 'react';
import { buildingState } from 'lib/Utils/BuildingStates';
import { PrimarySelectLabel } from 'lib/Utils/PrimarySelectLabel';
import { PrimaryDate } from 'lib/Utils/PrimaryDate';
import { PrimarySelect } from 'lib/Utils/PrimarySelect';

const schema = yup.object().shape({
  buildingType: yup.string(),
  buildingState: yup.string(),
  propertyTypeId: yup.number().required(),
  dateNeeded: yup.string().required(),
});

const BookCleaningModal = ({
  result,
  closeModal,
  isOpen,
}: {
  result: PropertyType[];
  closeModal: () => void;
  isOpen: boolean;
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

  watch('numberOfBedrooms');
  watch('numberOfBathrooms');
  watch('numberOfFloors');

  const onSubmit = async (data: CleaningModel) => {
    data.dateNeeded = new Date(
      data.dateNeeded as unknown as Date
    ).toLocaleDateString();

    try {
      const result = await (await RequestCleaning(undefined, data)).data;

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
    } catch (err) {}
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      size="lg"
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="0"
        overflowY="scroll"
        maxH="100vh"
        pos="fixed"
      >
        <ModalHeader>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            onClick={closeModal}
          >
            <Text
              display="flex"
              alignItems="center"
              fontSize="14px"
              cursor="pointer"
            >
              <span
                className="fal fa-angle-left"
                style={{ marginRight: '5px' }}
              ></span>
              Back
            </Text>
          </Flex>
        </ModalHeader>
        <ModalBody>
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
                    variant={
                      buildingType == 'residential' ? 'solid' : 'outline'
                    }
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
              <PrimarySelect<CleaningModel>
                register={register}
                error={errors.propertyTypeId}
                label="What type of building is it?"
                placeholder="Choose an option"
                name="propertyTypeId"
                fontSize="sm"
                options={
                  <>
                    {result.map((x: PropertyType) => {
                      return <option value={x.id}>{x.name}</option>;
                    })}
                  </>
                }
              />
              <PrimarySelect<CleaningModel>
                register={register}
                error={errors.buildingState}
                label=" What is the state of the building?"
                placeholder="Choose an option"
                name="buildingState"
                fontSize="sm"
                options={
                  <>
                    {buildingState.map((x: any) => {
                      return <option value={x.name}>{x.name}</option>;
                    })}
                  </>
                }
              />

              <PrimaryDate<CleaningModel>
                label="When do you want the cleaning done?"
                name="dateNeeded"
                error={errors.dateNeeded}
                register={register}
                control={control}
                minDate={new Date()}
                maxDate={new Date(2023, 10, 1)}
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

            <VStack spacing="1" mt=".5rem" pb="10" fontSize="sm">
              <Text textAlign="center">
                By sending this request you agree to our
              </Text>
              <NextLink href="#" passHref>
                <Text color="brand.100" fontWeight="600" cursor="pointer">
                  Terms &amp; Conditions
                </Text>
              </NextLink>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BookCleaningModal;
