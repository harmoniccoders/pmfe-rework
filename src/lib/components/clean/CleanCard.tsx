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
} from '@chakra-ui/react';
import React from 'react';
import Icons from '../Icons';
import CleanDetailsModal from 'lib/styles/customTheme/components/Modals/CleanDetailsModal';

type Props = {
  propertyType: string | undefined | null;
  bedroom: number | undefined;
  bathroom: number | undefined;
  floor: number | undefined;
  date: string | undefined;
  data: {};
};

const iconStyle = {
  color: '#0042ff',
};

const CleanCard = ({
  propertyType,
  bedroom,
  bathroom,
  date,
  floor,
  data,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            {propertyType ? (
              <Text fontWeight={600} fontSize="17px" textTransform="capitalize">
                {propertyType?.toLowerCase()}
              </Text>
            ) : (
              <Text
                fontWeight={600}
                fontSize="17px"
                visibility="hidden"
                textTransform="capitalize"
              >
                None
              </Text>
            )}
          </Flex>
          <Grid w="full" px=".8rem" templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Flex alignItems="center">
                <Icons iconClass="fa-bed" style={iconStyle} />
                <Text fontSize="13px" ml="4px">
                  {`${bedroom} ${
                    bedroom ? (bedroom > 1 ? 'Bedrooms' : 'Bedroom') : null
                  }`}
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex alignItems="center">
                <Icons iconClass="fa-toilet" style={iconStyle} />
                <Text fontSize="13px" ml="4px">
                  {`${bathroom} ${
                    bathroom ? (bathroom > 1 ? 'Bathrooms' : 'Bathroom') : null
                  }`}
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex alignItems="center">
                <Icons iconClass="fa-tags" style={iconStyle} />
                <Text fontSize="13px" ml="4px">
                  {`${floor} ${
                    floor ? (floor > 1 ? 'Floors' : 'Floor') : null
                  }`}
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex alignItems="center">
                <Icons iconClass="fa-calendar" style={iconStyle} />
                <Text fontSize="13px" ml="4px">
                  {date}
                </Text>
              </Flex>
            </GridItem>
          </Grid>
          <Divider borderColor="brand.50" />
          <Flex px=".8rem" justify="space-between" w="full">
            <Button
              variant="outline"
              height="40px"
              w="full"
              px="1.8rem"
              color="rgb(37,36,39)"
              onClick={onOpen}
            >
              View Details
            </Button>
          </Flex>
        </VStack>
      </Box>
      <CleanDetailsModal isOpen={isOpen} onClose={onClose} item={data} />
    </>
  );
};

export default CleanCard;
