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
  HStack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { MdVerified } from 'react-icons/md';
import Icons from './Icons';
import { FaPen } from 'react-icons/fa';
import {
  PropertyModel,
  PropertyTitle,
  PropertyType,
  PropertyView,
  RentCollectionType,
  Application,
  TenantType,
} from 'types/api';
import ViewListedProperty from 'lib/styles/customTheme/components/Modals/ViewListedProperty';
import ViewListedRentProperty from 'lib/styles/customTheme/components/Modals/ViewListedRentProperty';
import DeleteListings from 'lib/styles/customTheme/components/Modals/DeleteLiting';
import EditPropertyModal from 'lib/styles/customTheme/components/EditPropertyModal';
import { useOperationMethod } from 'react-openapi-client';
import { Parameters } from 'openapi-client-axios';

type Props = {
  item: PropertyView;
  propertyTitles: PropertyType[];
  propertyTypes: PropertyTitle[];
  propertyTenants: TenantType[];
  propertyCollection: RentCollectionType[];
  getBanks?: any;
  getStates?: any;
};

const iconStyle = {
  color: '#0042ff',
};

const ListingsCard = ({
  item,
  propertyTitles,
  propertyTypes,
  getStates,
  propertyTenants,
  propertyCollection,
  getBanks,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showModal, setShowModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [applications, setApplications] = useState <Application[]>([]);

  const [GetApplication, { loading: isLoading, data: isData, error: isError }] =
    useOperationMethod('Applicationlist{propertyId}');

  const getApplication = async () => {
    const params: Parameters = {
      propertyId: item.id as number,
    };
    try {
      const result = await (await GetApplication(params)).data;
      setApplications(result?.data.value);
    } catch (err) {}
  };
  

  return (
    <>
      <Box
        w="full"
        pb="1rem"
        borderRadius="8px"
        overflow="hidden"
        boxShadow="0 23px 36px 4px rgba(0,0,0,0.14)"
      >
        <Box w="full" h="150px" pos="relative">
          <>
            {item.mediaFiles && item.mediaFiles?.length > 0 ? (
              <>
                {item.mediaFiles[0].isImage && (
                  <Image
                    src={item.mediaFiles[0].url as string}
                    alt="propery-image"
                    w="100%"
                    height="100%"
                    objectFit="cover"
                  />
                )}
              </>
            ) : (
              <Image
                src="/assets/nb.webp"
                alt="propery-image"
                w="100%"
                height="100%"
                objectFit="cover"
              />
            )}
          </>
          <Flex
            fontSize=".8rem"
            fontWeight="600"
            justify="space-between"
            color={
              item.isDraft || item.status === 'REJECTED' ? 'white' : 'black'
            }
            bgColor={
              item.isDraft
                ? 'rgba(108,117,125,.9)'
                : item.status === 'PENDING'
                ? 'brand.600'
                : item.status === 'REJECTED'
                ? 'brand.800'
                : '#96FFC9'
            }
            pos="absolute"
            bottom="0"
            h="2rem"
            align="center"
            w="full"
            px="1rem"
          >
            <Text textTransform="capitalize">
              {item.isDraft
                ? 'Only visible to you'
                : item.status === 'PENDING'
                ? 'Listing is pending'
                : item.status === 'REJECTED'
                ? `Rejected: ${item.rejectionReason}`
                : 'Listing is live'}
            </Text>
            <HStack cursor="pointer" onClick={() => setUpdateModal(true)}>
              <Text>Edit</Text>
              <FaPen />
            </HStack>
          </Flex>
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
            {item.lga}
          </Flex>
        </Box>
        <VStack align="flex-start" spacing={4}>
          <Flex justify="space-between" px=".8rem" mt="1rem" w="full">
            <Text
              fontWeight={600}
              fontSize="14px"
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
                <Text
                  fontSize="13px"
                  ml="4px"
                  w="150px"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
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
                <Text
                  fontSize="13px"
                  ml="4px"
                  w={{ base: '100px', lg: '50px', xl: '100px' }}
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
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
                <Text
                  fontSize="13px"
                  ml="4px"
                  w={{ base: '100px', lg: '50px', xl: '100px' }}
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {item.title}
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
              Delete
            </Button>
            <Button
              variant="solid"
              height="40px"
              width="full"
              onClick={() => {
                getApplication();
                onOpen();
              }}
            >
              Details
            </Button>
          </HStack>
        </VStack>
      </Box>
      {item.isForSale && (
        <ViewListedProperty
          isOpen={isOpen}
          onClose={onClose}
          item={item}
          openModal={() => setUpdateModal(true)}
        />
      )}
      {item.isForRent && (
        <ViewListedRentProperty
          isOpen={isOpen}
          onClose={onClose}
          item={item}
          openModal={() => setUpdateModal(true)}
          applications={applications}
        />
      )}
      <DeleteListings
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        item={item}
      />
      <EditPropertyModal
        item={item as PropertyModel}
        isOpen={updateModal}
        onClose={() => setUpdateModal(false)}
        propertyTypes={propertyTypes}
        propertyTitles={propertyTitles}
        propertyTenants={propertyTenants}
        propertyCollection={propertyCollection}
        getBanks={getBanks}
        getStates={getStates}
      />
    </>
  );
};

export default ListingsCard;
