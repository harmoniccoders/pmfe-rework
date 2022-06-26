import { Box, Stack, SimpleGrid } from '@chakra-ui/react';
import { PropertyRequestInput, PropertyType } from 'types/api';
import ButtonComponent from 'lib/components/Button';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { useOperationMethod } from 'react-openapi-client';
import axios from 'axios';
import NumberCounter from 'lib/Utils/NumberCounter';
import { PrimaryTextArea } from 'lib/Utils/PrimaryTextArea';
import { CurrencyField } from 'lib/Utils/CurrencyInput';
import { PrimarySelect } from 'lib/Utils/PrimarySelect';

interface Props {
  propertyTypes: PropertyType[];
}
const Form = ({ propertyTypes }: Props) => {
  const [requestProperty, { loading, data, error }] =
    useOperationMethod('PropertyRequestnew');

  const schema = yup.object().shape({
    budget: yup.string().required(),
    comment: yup.string().required(),
    lga: yup.string().required(),
    state: yup.string().required(),
    propertyTypeId: yup.number().required(),
    numberofBathrooms: yup.number(),
    numberOfBedRooms: yup.number(),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<PropertyRequestInput>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  watch('numberOfBedRooms');
  watch('numberOfBathrooms');

  const [lgas, setLgas] = useState([]);

  useEffect(() => {
    const getLga = async (state: string) => {
      const result = (
        await axios.get(
          `http://locationsng-api.herokuapp.com/api/v1/states/${state}/lgas`
        )
      ).data;

      if (Array.isArray(result) === true) {
        setLgas(
          result.map((value: string) => {
            return { name: value };
          })
        );
      }
    };
    getLga(getValues('state') as unknown as string);
  }, [watch('state')]);

  const { addToast } = useToasts();
  const router = useRouter();

  const onSubmit = async (data: PropertyRequestInput) => {
    try {
      const result = await (await requestProperty(undefined, data)).data;

      if (result.status) {
        addToast('Request Succesful', {
          appearance: 'success',
          autoDismiss: true,
        });
        router.push('/requests');
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
      <Box>
        <Stack>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={[2, 10]}>
              <Box w="full">
                <PrimarySelect<PropertyRequestInput>
                  register={register}
                  error={errors.propertyTypeId}
                  label="Type"
                  placeholder="Choose a Property"
                  name="propertyTypeId"
                  options={
                    <>
                      {propertyTypes.map((x: PropertyType) => {
                        return <option value={x.id}>{x.name}</option>;
                      })}
                    </>
                  }
                />

                {/* <PrimarySelect<PropertyRequestInput>
                  register={register}
                  error={errors.state}
                  label="State"
                  placeholder="Which state in Nigeria is your property located"
                  name="state"
                  options={
                    <>
                      {getStates.map((x: any) => {
                        return <option value={x.name}>{x.name}</option>;
                      })}
                    </>
                  }
                />

                {getValues('state') !== undefined ? (
                  <PrimarySelect<PropertyRequestInput>
                    register={register}
                    error={errors.lga}
                    label="LGA"
                    placeholder="Local Government Area"
                    name="lga"
                    options={
                      <>
                        {lgas.map((x: any) => {
                          return <option value={x.name}>{x.name}</option>;
                        })}
                      </>
                    }
                  />
                ) : null} */}
                <PrimaryTextArea<PropertyRequestInput>
                  label="Comments"
                  name="comment"
                  minH="150px"
                  error={errors.comment}
                  defaultValue=""
                  register={register}
                />
              </Box>
              <Box w="full">
                <CurrencyField<PropertyRequestInput>
                  placeholder="₦0.00"
                  defaultValue=""
                  register={register}
                  error={errors.budget}
                  name={'budget'}
                  control={control}
                  label="Budget"
                />
                <NumberCounter
                  valueName="numberOfBedRooms"
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
                <ButtonComponent
                  isValid={isValid}
                  loading={loading}
                  content="submit"
                />
              </Box>
            </SimpleGrid>
          </form>
        </Stack>
      </Box>
    </>
  );
};

export default Form;
