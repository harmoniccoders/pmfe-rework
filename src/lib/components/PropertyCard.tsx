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

type Props = {
  location: string | undefined | null;
  description: string | undefined;
  bedroom: number | undefined;
  bathroom: number | undefined;
  price: number | undefined;
  title: string;
};

const iconStyle = {
  color: '#0042ff',
};

const PropertyCard = ({
  location,
  description,
  bedroom,
  bathroom,
  price,
  title,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            {location}
          </Flex>
        </Box>
        <VStack align="flex-start" spacing={4}>
          <Flex justify="space-between" px=".8rem" mt="1rem" w="full">
            <Text fontWeight={600} fontSize="17px">
              {description}
            </Text>

            <Icon as={MdVerified} w="20px" h="20px" color="brand.100" />
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
                  &#8358;{price}
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex alignItems="center">
                <Icons iconClass="fa-award" style={iconStyle} />
                <Text fontSize="13px" ml="4px">
                  {title}
                </Text>
              </Flex>
            </GridItem>
          </Grid>
          <Divider borderColor="brand.50" />
          <Flex px=".8rem" justify="space-between" w="full">
            <Button
              variant="outline"
              height="40px"
              w="fit-content"
              px="1.8rem"
              color="rgb(37,36,39)"
              onClick={onOpen}
              width="120px"
            >
              See more
            </Button>
            <Button variant="solid" height="40px" w="fit-content" px="2.2rem">
              Enquire
            </Button>
          </Flex>
        </VStack>
      </Box>
      <SeemoreModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default PropertyCard;
