import { Box, Text, VStack, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import DateCarousel from './Carousel';
import {
  InspectionDateView,
  InspectionModel,
  InspectionTimeModel,
  InspectionTimeView,
  InspectionView,
} from 'types/api';
import moment from 'moment';
import ButtonComponent from './Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useOperationMethod } from 'react-openapi-client';
import { PrimarySelect } from 'lib/Utils/PrimarySelect';
import Cookies from 'js-cookie';

type Props = {
  item?: any;
  date: InspectionView | any;
  close: any;
  setStep: any;
};

const schema = yup.object().shape({
  inspectionDateId: yup.number().required(),
  inspectionTimeId: yup.number().required(),
});

const DateSliders = ({ item, date, close, setStep }: Props) => {
  const users = Cookies.get('user') as unknown as string;
  let user;
  if (users !== undefined) {
    user = JSON.parse(users);
  }

  const [scheduleInspection, { loading, data, error }] = useOperationMethod(
    'Propertyinspectionsschedule'
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<InspectionModel>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      propertyId: item.id,
      userId: user.id,
    },
  });

  const [selctedDate, setSelectedDate] = useState<InspectionDateView>();
  setValue('inspectionDateId', selctedDate?.id);

  const onSubmit = async (data: InspectionModel) => {
    close();

    try {
      const result = await (await scheduleInspection(undefined, data)).data;
      console.log({ result });
      if (result.status) {
        setStep(1);
        close();
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box w="89%" mx="auto">
        <DateCarousel
          item={date.map((item: any, index: any) => {
            return (
              <Box
                w="fit-content"
                cursor="pointer"
                onClick={() => setSelectedDate(item)}
              >
                <Flex
                  border="1px solid"
                  borderColor={
                    selctedDate?.id === item.id ? 'brand.100' : '#DCE1E7'
                  }
                  height="90px"
                  bgColor={selctedDate?.id === item.id ? '#edf6ff' : 'unset'}
                  w="90px"
                  key={index}
                  borderRadius="5px"
                >
                  <VStack
                    spacing={2}
                    justifyContent="center"
                    width="100%"
                    height="100%"
                  >
                    <Text
                      fontWeight={600}
                      fontSize="16px"
                      textTransform="uppercase"
                    >
                      {moment(item.date).format('ddd')}
                    </Text>
                    <Text fontWeight={600} fontSize="16px">
                      {moment(item.date).format('MMM DD')}
                    </Text>
                  </VStack>
                </Flex>
              </Box>
            );
          })}
        />
        {selctedDate && (
          <Box w="full">
            <PrimarySelect<InspectionModel>
              register={register}
              error={errors.inspectionTimeId}
              label="Select a time"
              placeholder="Select a conveinent time"
              name="inspectionTimeId"
              options={
                <>
                  {selctedDate.times
                    ? selctedDate.times.map((x: InspectionTimeView) => {
                        return (
                          <option value={x.id}>
                            {moment(x.time).format('LT')}
                          </option>
                        );
                      })
                    : null}
                </>
              }
            />
          </Box>
        )}
      </Box>

      <ButtonComponent
        content="Request Time"
        isValid={isValid}
        loading={loading}
      />
    </form>
  );
};

export default DateSliders;
