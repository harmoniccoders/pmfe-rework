import { Box, Text, VStack, Flex } from '@chakra-ui/react';
import React from 'react';
import DateCarousel from './Carousel';
import {
  InspectionDateView,
  InspectionTimeModel,
  InspectionTimeView,
} from 'types/api';
import moment from 'moment';
import ButtonComponent from './Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useOperationMethod } from 'react-openapi-client';
import { PrimarySelectKey } from 'lib/Utils/PrimarySelectKey';
import { PrimarySelectLabel } from 'lib/Utils/PrimarySelectLabel';

type Props = {
  item?: any;
  date: InspectionDateView | any;
  inspectionTime?: InspectionTimeView;
};

const schema = yup.object().shape({
  availableTime: yup.string().required(),
});

const DateSliders = ({ item, date, inspectionTime }: Props) => {
  const [CreateInspectionTime, { loading, data, error }] = useOperationMethod(
    'Propertyinspectiontimecreate'
  );
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm<InspectionTimeModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit = async (data: InspectionTimeModel) => {
    try {
      const result = await (await CreateInspectionTime(undefined, data)).data;
      console.log({ result });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DateCarousel
        item={date.map((item: any, index: any) => {
          return (
            <Flex
              border="1px solid #DCE1E7"
              height="90px"
              w="90px"
              mx="auto"
              key={index}
              align="center"
              borderRadius="5px"
            >
              <VStack
                spacing={2}
                justifyContent="center"
                width="100%"
                height="100%"
              >
                <Text fontWeight={600} fontSize="16px">
                  WED
                  {/* {moment(item.date).day()} */}
                </Text>
                <Text fontWeight={600} fontSize="16px">
                  {moment(item.date).format('MMMM DD')}
                </Text>
              </VStack>
            </Flex>
          );
        })}
      />

      <PrimarySelectKey<InspectionTimeModel>
        label="Select a time"
        name="availableTime"
        register={register}
        error={errors.availableTime}
        control={control}
        options={inspectionTime}
        placeholder="9:00a.m"
      />

      <ButtonComponent content="Request Time" isValid={true} loading={false} />
    </form>
  );
};

export default DateSliders;
