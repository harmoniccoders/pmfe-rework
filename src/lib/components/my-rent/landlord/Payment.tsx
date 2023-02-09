// import {
//   Box,
//   Center,
//   Text,
//   Stack,
//   Flex,
//   Spacer,
//   Button,
// } from '@chakra-ui/react';

// import {
//   Tenancy,
//   RentCollectionType,
//   ComplaintsCategory,
//   ComplaintsModel,
// } from 'types/api';
// import React, { useEffect, useRef, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useToasts } from 'react-toast-notifications';
// import { useOperationMethod } from 'react-openapi-client';
// import { Parameters } from 'openapi-client-axios';
// import axios from 'axios';
// import { PrimaryInput } from 'lib/Utils/PrimaryInput';
// import { PrimarySelect } from 'lib/Utils/PrimarySelect';

// interface Props {
//   Tenancylandlord: any;
//   getBanks: any[];
//   category: ComplaintsCategory[];
// }

// // const Payment = () => {
// //   const onSubmit = async (data: Tenancy) => {
// //     try {
// //       const result = await (await Tenancy(undefined, data)).data;

// //       const { addToast } = useToasts();

// //       if (result.status != 400) {
// //         addToast(result.message, {
// //           appearance: 'success',
// //           autoDismiss: true,
// //         });
// //         return;
// //       }
// //       addToast(result.message, {
// //         appearance: 'error',
// //         autoDismiss: true,
// //       });
// //       return;
// //      } catch (err: any) {
        addToast(err.message || err.body.message, {
          appearance: 'error',
          autoDismiss: true,
        });}
// //   };

// //   return (
// //     <>
// //       <Box w="full">
// //         <Center>
// //           <Text mt="1rem" color="#545454">
// //             Total Rent Remitted
// //           </Text>
// //         </Center>
// //         <Center>
// //           <Text mb="1rem" fontWeight="700" fontSize="2rem">
// //             ₦0.00
// //           </Text>
// //         </Center>

// //         <Stack mt="1rem">
// //           <Text fontWeight="700" fontSize={['1rem', '']}>
// //             Upcoming Remitance
// //           </Text>
// //           <Flex
// //             w="full"
// //             h="3rem"
// //             borderRadius="8px"
// //             bgColor="rgba(154,167,179,0.06)"
// //             align="center"
// //             p=".55rem"
// //             mb="1rem"
// //           >
// //             <Text textAlign="left">₦2,500,000</Text>
// //             <Spacer />
// //             <Text textAlign="right">30 Jun 2021</Text>
// //           </Flex>
// //           <Button
// //             type="button"
// //             w="100%"
// //             h="100%"
// //             mt="2rem"
// //             variant="solid"
// //             textTransform="capitalize"
// //           >
// //             Request Payment
// //           </Button>
// //         </Stack>
// //         <Stack mt="2rem !important">
// //           <Text fontWeight="700" fontSize={['1rem', '']}>
// //             Rent Collection
// //           </Text>
// //           <form style={{ width: '100%' }}>
// //             <PrimarySelect<RentCollectionType>
// //               label="How frequently do you want to collect rent?"
// //               name="name"
// //               error={errors.name}
// //               placeholder="How frequently do you want to collect rent?"
// //               defaultValue=""
// //               register={register}
// //               options={['Anually', 'Monthly', 'Daily']}
// //             />
// //             <PrimarySelect<Tenancy>
// //               label="Your Bank"
// //               name="bank"
// //               error={errors.bank}
// //               placeholder="Your Bank"
// //               defaultValue=""
// //               register={register}
// //               options={
// //                 <>
// //                   {getBanks.map((x: any) => {
// //                     return <option value={x.name}>{x.name}</option>;
// //                   })}
// //                 </>
// //               }
// //             />
// //             <PrimaryInput<Tenancy>
// //               label="Your account number"
// //               name="accountNumber"
// //               error={errors.accountNumber}
// //               placeholder="Your account number"
// //               defaultValue=""
// //               register={register}
// //             />
// //             <Button
// //               type="button"
// //               w="100%"
// //               h="100%"
// //               mt="1rem"
// //               variant="solid"
// //               textTransform="capitalize"
// //             >
// //               Update
// //             </Button>
// //           </form>
// //           <Stack>
// //             <Text
// //               mt="1.5rem !important"
// //               fontWeight="700"
// //               fontSize={['1rem', '']}
// //             >
// //               Payment History
// //             </Text>
// //             <Flex w="full" p=".55rem" mb="1rem">
// //               <Box textAlign="left">
// //                 <Text color="#3F931D">Rent Remittance</Text>
// //                 <Text color="#545454">
// //                   <small>23 April 2021</small>
// //                 </Text>
// //               </Box>
// //               <Spacer />
// //               <Box textAlign="right">
// //                 <Text fontWeight="700">₦2,500,000</Text>
// //                 <Text color="#545454">
// //                   <small>GTBank Account</small>
// //                 </Text>
// //               </Box>
// //             </Flex>
// //           </Stack>
// //         </Stack>
// //       </Box>
// //     </>
// //   );
// // };
  

// // export default Payment;

import React from 'react'

const Payment = () => {
  return (
    <div>Payment</div>
  )
}

export default Payment