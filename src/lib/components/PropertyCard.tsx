import {
  Flex,
  Box,
  Image,
  Badge,
  VStack,
  Text,
  Icon,
  Grid,
  GridItem,
  Divider,
  Button,
  ButtonGroup,
  useDisclosure,
  Hide,
} from '@chakra-ui/react';
import React from 'react';
import { MdVerified } from 'react-icons/md';
import Icons from './Icons';
import SeemoreModal from 'lib/styles/customTheme/components/SeemoreModal';
import { useRouter } from 'next/router';
import { PropertyView } from 'types/api';

type Props = {
  item: PropertyView;
};

const iconStyle = {
  color: '#0042ff',
};

const PropertyCard = ({ item }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  return (
    <>
      <Box
        w="full"
        pb="1rem"
        borderRadius="8px"
        overflow="hidden"
        boxShadow="0 23px 36px 4px rgba(0,0,0,0.14)"
      >
        <Box w="full" h="140px" pos="relative">
          <Image
            src="/assets/property-img.png"
            alt="propery-image"
            w="100%"
            height="100%"
            objectFit="cover"
          />
          <Flex
            bg="brand.100"
            color="white"
            pos="absolute"
            w="fit-content"
            px="1.5rem"
            h="24px"
            top="18%"
            fontSize="14px"
            align="center"
            justify="center"
            borderRadius="4px 0 0 4px"
            right="0"
            textTransform="capitalize"
          >
            {item.area}
          </Flex>
        </Box>
        <VStack align="flex-start" spacing={4}>
          <Flex
            justify="space-between"
            px=".8rem"
            mt="1rem"
            w="full"
            alignItems="center"
          >
            <Text
              fontWeight={600}
              fontSize="16px"
              w="200px"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {item.name}
            </Text>

            {!item.sellMyself ? (
              <Icon as={MdVerified} w="20px" h="20px" color="brand.100" />
            ) : (
              <Icons iconClass="fa-exclamation-triangle" />
            )}
          </Flex>
          <Grid w="full" px=".8rem" templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Flex alignItems="center">
                <Icons iconClass="fa-bed" style={iconStyle} />
                <Text fontSize="13px" ml="4px">
                  {`${item.numberOfBedrooms} ${
                    item.numberOfBedrooms
                      ? item.numberOfBedrooms > 1
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
                  &#8358;
                  {item.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex alignItems="center">
                <Icons iconClass="fa-award" style={iconStyle} />
                <Text fontSize="13px" ml="4px">
                  {item.title}
                </Text>
              </Flex>
            </GridItem>
          </Grid>
          <Divider borderColor="brand.50" />
          <Flex px=".8rem" justify="space-between" w="full">
            <Button
              variant="outline"
              height="40px"
              // width="fit-content"
              width={item.sellMyself ? '100%' : 'fit-content'}
              px="1.8rem"
              color="rgb(37,36,39)"
              onClick={onOpen}
            >
              See more
            </Button>

            {!item.sellMyself && (
              <Button
                variant="solid"
                height="40px"
                w="fit-content"
                px="2.2rem"
                onClick={() => router.push('/enquiries')}
              >
                Enquire
              </Button>
            )}
          </Flex>
        </VStack>
      </Box>
      <SeemoreModal
        isOpen={isOpen}
        onClose={onClose}
        item={item}
        // location={location}
        // description={description}
        // bedroom={bedroom}
        // bathroom={bathroom}
        // price={price}
        // title={title}
        // overview={overview}
      />
    </>
  );
};

export default PropertyCard;
