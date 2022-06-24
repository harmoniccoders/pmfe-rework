import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  Image,
  Text,
  Box,
  Heading,
  ModalBody,
  VStack,
  Button,
  SimpleGrid,
  Divider,
} from '@chakra-ui/react';

import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { Application } from 'types/api';
import moment from 'moment';
import { useOperationMethod } from 'react-openapi-client';
import { Parameters } from 'openapi-client-axios';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  item: Application;
}

const ViewTenantsInfo = ({ isOpen, onClose, item }: Props) => {
  const { addToast } = useToasts();
  const router = useRouter();
  const [reviewTenant, { loading, data, error }] = useOperationMethod(
    'Applicationreview{id}'
  );

  const ReviewTenant = async () => {
    const params: Parameters = {
      id: item.id as number,
    };
    try {
      const result = await(await reviewTenant(params)).data;

      if (result.status) {
        onClose();
        addToast('Application under review', {
          appearance: 'success',
          autoDismiss: true,
        });
        router.reload();

        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    } catch (err) {}
  };

  const [rejectTenant, { loading: isLoading, data: isData, error: isError }] =
    useOperationMethod('Applicationreject{id}');

  const RejectTenant = async () => {
    const params: Parameters = {
      id: item.id as number,
    };
    try {
      const result = await (await rejectTenant(params)).data;
      onClose();
      if (result.status) {
        addToast('Application rejected succesfully', {
          appearance: 'success',
          autoDismiss: true,
        });
        router.reload();
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size="lg"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="0"
        overflowY="auto"
        h="100vh"
        pos="fixed"
      >
        <ModalHeader>
          <Flex justifyContent="space-between" alignItems="center">
            <Text
              onClick={onClose}
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
          <Box px={5}>
            <VStack spacing="5">
              <Image
                rounded="lg"
                src={
                  item?.user?.passportPhotograph?.url || '/assets/user-icon.png'
                }
                h="150px"
                w="150px"
                objectFit="cover"
                alt="name"
              />
              <Heading fontSize="17px" textTransform="capitalize">{`${
                item?.user?.firstName
              } ${item?.user?.middleName || ''} ${
                item?.user?.lastName
              }`}</Heading>
            </VStack>

            {item.status === 'ACTIVE' ? (
              <Box>
                <Flex
                  w="full"
                  justifyContent="space-between"
                  alignItems="center"
                  bgColor="brand.700"
                  borderRadius="4px"
                  px="1rem"
                  my="5"
                  h="3rem"
                  border="1px solid #96FFC9"
                >
                  <Text fontWeight="500">Suitability Rating</Text>
                  <Flex gap="2">
                    <FaStar color="blue" />
                    <FaStar color="blue" />
                    <FaStarHalfAlt color="blue" />
                    <FaStarHalfAlt color="blue" />
                  </Flex>
                </Flex>
                <Text color="gray.600" px="3">
                  We recommend you only consider applicants with a suitability
                  rating of 3 stars or higher
                </Text>
                <SimpleGrid columns={2} spacing="5" my="7">
                  <Button
                    w="full"
                    variant="outline"
                    isLoading={isLoading}
                    onClick={RejectTenant}
                  >
                    Decline
                  </Button>
                  <Button
                    w="full"
                    variant="outline"
                    isLoading={loading}
                    onClick={ReviewTenant}
                  >
                    Accept as Tenant
                  </Button>
                </SimpleGrid>
              </Box>
            ) : (
              <VStack spacing="3" my="7">
                <Heading fontSize="20px">Tenancy Status</Heading>
                <Text
                  borderRadius="4px"
                  border="1px solid #96FFC9"
                  px="1.5rem"
                  fontWeight="600"
                  py="2"
                  bgColor="brand.700"
                >
                  {item.status === 'APPROVED'
                    ? 'Payment Confirmed'
                    : item.status === 'REJECTED'
                    ? 'Rejected'
                    : item.status === 'ACCEPTED'
                    ? 'Awaiting Payment'
                    : 'Under Review'}
                </Text>
              </VStack>
            )}

            <VStack w="full" align="flex-start" spacing="3">
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Mobile Number</Heading>
                <Text fontSize="14px">{item?.user?.phoneNumber || ''}</Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Email</Heading>
                <Text fontSize="14px">{item?.user?.email || ''}</Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Current Residential Address</Heading>
                <Text fontSize="14px" textTransform="capitalize">
                  {item?.user?.address || ''}
                </Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Date of Birth</Heading>
                <Text fontSize="14px">
                  {(item.user?.dateOfBirth &&
                    moment(item.user.dateOfBirth).format('Do MMMM YYYY')) ||
                    ''}
                </Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Nationality</Heading>
                <Text fontSize="14px">{item?.user?.nationality || ''}</Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Marital Status</Heading>
                <Text fontSize="14px">{item.user?.maritalStatus || ''}</Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Occupation</Heading>
                <Text fontSize="14px" textTransform="capitalize">
                  {item?.user?.occupation || ''}
                </Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Work Address</Heading>
                <Text fontSize="14px" textTransform="capitalize">
                  {item?.user?.workAddress || ''}
                </Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Annual Income</Heading>
                <Text fontSize="14px">{item?.user?.annualIncome}</Text>
                <Divider />
              </VStack>
            </VStack>
            <Heading my="5" fontSize="18px">
              Next of Kin
            </Heading>
            <VStack w="full" align="flex-start" spacing="3">
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">First Name</Heading>
                <Text fontSize="14px" textTransform="capitalize">
                  {item?.nextOfKin?.firstName || ''}
                </Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Surname</Heading>
                <Text fontSize="14px" textTransform="capitalize">
                  {item?.nextOfKin?.lastName || ''}
                </Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Address</Heading>
                <Text fontSize="14px" textTransform="capitalize">
                  {item?.nextOfKin?.address || ''}
                </Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Relationship</Heading>
                <Text fontSize="14px" textTransform="capitalize">
                  {item?.nextOfKin?.relationship || ''}
                </Text>
                <Divider />
              </VStack>
              <VStack align="flex-start" w="full" spacing="2">
                <Heading fontSize="15px">Work ID</Heading>
                {item?.user?.workId ? (
                  <Image
                    src={item?.user?.workId?.url}
                    h="100px"
                    objectFit="cover"
                    alt="id card"
                  />
                ) : (
                  'No work ID uploaded'
                )}
              </VStack>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewTenantsInfo;
