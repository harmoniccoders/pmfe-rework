import {
  Flex,
  Box,
  VStack,
  Text,
  Grid,
  GridItem,
  Divider,
  Button,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { PropertyRequestView } from 'types/api';
import { useRouter } from 'next/router';
import CancelRequest from '../Modals/CancelRequest';
import Icons from 'lib/components/Icons';

type Props = {
  item: PropertyRequestView;
};

const iconStyle = {
  color: '#0042ff',
};

const RequestCard = ({ item }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  return (
    <>
      <Box
        w="full"
        py="2rem"
        px="1rem"
        borderRadius="8px"
        overflow="hidden"
        boxShadow="0 23px 36px 4px rgba(0,0,0,0.14)"
      >
        <VStack align="flex-start" spacing={4}>
          <Flex px=".8rem" mt="1rem" w="full">
            <Text fontWeight={500} fontSize="13px" textTransform="capitalize">
              {item.comment}
            </Text>
          </Flex>
          <Grid w="full" px=".8rem" templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Flex alignItems="center">
                <Icons iconClass="fa-bed" style={iconStyle} />
                <Text fontSize="13px" ml="4px">
                  {`${item.numberOfBedRooms} ${
                    item.numberOfBedRooms
                      ? item.numberOfBedRooms > 1
                        ? 'Bedrooms'
                        : 'Bedroom'
                      : null
                  }`}
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex alignItems="center">
                <Icons iconClass="fa-toilet" style={iconStyle} />
                <Text fontSize="13px" ml="4px">
                  {`${item.numberOfBathrooms} ${
                    item.numberOfBathrooms
                      ? item.numberOfBathrooms > 1
                        ? 'Bathrooms'
                        : 'Bathroom'
                      : null
                  }`}
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex alignItems="center">
                <Icons iconClass="fa-tags" style={iconStyle} />
                <Text fontSize="13px" ml="4px">
                  {item.budget}
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex alignItems="center">
                <Icons iconClass="fa-calendar" style={iconStyle} />
                <Text fontSize="13px" ml="4px">
                  {item.propertyType?.name}
                </Text>
              </Flex>
            </GridItem>
          </Grid>
          <Divider borderColor="brand.50" />
          <HStack px=".8rem" spacing={4} w="full">
            <Button
              variant="outline"
              height="40px"
              width="full"
              color="rgb(37,36,39)"
              onClick={() => setShowModal(true)}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              height="40px"
              width="full"
              disabled={item.matches && item.matches.length == 0 ? true : false}
              onClick={() => router.push(`/requests/${item.id}`)}
            >
              {item.matches && item.matches.length > 0
                ? 'View Matches'
                : 'No matches found'}
            </Button>
          </HStack>
        </VStack>
      </Box>
      <CancelRequest
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        item={item}
      />
    </>
  );
};

export default RequestCard;
