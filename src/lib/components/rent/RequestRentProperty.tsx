import { Box, Stack, Grid } from '@chakra-ui/react';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { PropertyRequestInput, PropertyType } from 'types/api';
import ButtonComponent from 'lib/components/Button';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { useOperationMethod } from 'react-openapi-client';
import { PrimarySelectKey } from 'lib/Utils/PrimarySelectKey';
import { StateSelect } from 'lib/Utils/StateSelect';
import axios from 'axios';
import NumberCounter from 'lib/Utils/NumberCounter';
import { PrimaryTextArea } from 'lib/Utils/PrimaryTextArea';

interface Props {
  propertyTypes: PropertyType[];
  getStates: any[];
}
const RequestRentProperty = ({ propertyTypes, getStates }: Props) => {
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
    console.log({ data });

    try {
      const result = await (await requestProperty(undefined, data)).data;
      console.log({ result });
      if (result.status) {
        addToast('Request Succesful', {
          appearance: 'success',
          autoDismiss: true,
        });
        router.push('rent/request-property');
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
            <Grid templateColumns="repeat(3,1fr)" gap={10}>
              <Box w="full">
                <PrimarySelectKey<PropertyRequestInput>
                  label="Type"
                  name="propertyTypeId"
                  register={register}
                  error={errors.propertyTypeId}
                  control={control}
                  options={propertyTypes}
                  placeholder="Choose a Property"
                />

                <StateSelect<PropertyRequestInput>
                  label="State"
                  name="state"
                  register={register}
                  error={errors.state}
                  control={control}
                  options={getStates}
                  placeholder="Which state in Nigeria is your property located"
                />
                {getValues('state') !== undefined ? (
                  <StateSelect<PropertyRequestInput>
                    label="Area"
                    name="lga"
                    register={register}
                    error={errors.lga}
                    control={control}
                    options={lgas}
                    placeholder="Choose a Local Government"
                  />
                ) : null}
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
                <PrimaryInput<PropertyRequestInput>
                  label="Budget"
                  name="budget"
                  error={errors.budget}
                  defaultValue=""
                  register={register}
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
            </Grid>
          </form>
        </Stack>
      </Box>
    </>
  );
};

export default RequestRentProperty;
