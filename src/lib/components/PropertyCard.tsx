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
import React from 'react';
import { MdVerified } from 'react-icons/md';
import Icons from './Icons';
import SeemoreModal from 'lib/styles/customTheme/components/SeemoreModal';
import { Parameters } from 'openapi-client-axios';
import { useOperationMethod } from 'react-openapi-client';
import { useRouter } from 'next/router';
import { PropertyView, UserView } from 'types/api';
import Cookies from 'js-cookie';

type Props = {
  item: PropertyView;
};

const iconStyle = {
  color: '#0042ff',
};
const users = Cookies.get('user') as unknown as string;
let user: UserView;
if (users !== undefined) {
  user = JSON.parse(users);
}

const PropertyCard = ({ item }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [addViews, { loading, data, error }] = useOperationMethod(
    'Propertyaddview{Id}'
  );

  const AddViewToProperty = async () => {
    const params: Parameters = {
      Id: item.id as number,
    };
    onOpen();

    try {
      const result = await (await addViews(params)).data;
    } catch (err) {
      console.log(err);
    }
  };

  const router = useRouter();
  const curPage = router.asPath;
  const enquiry = router.asPath == '/enquires';

  const [addEnquiry, { loading: isLoading, data: isData, error: isError }] =
    useOperationMethod('Propertyaddenquiries{Id}');

  const AddEnquireView = async () => {
    const params: Parameters = {
      Id: item.id as number,
    };
    try {
      const result = await (await addEnquiry(params)).data;
      console.log({ result });

      // if (result.status) {
      //   enquiry && item.isForRent
      //     ? router.push(`/rent/enquire/${item.id}`)
      //     : enquiry && item.isForSale
      //     ? router.push(`/buy/enquire/${item.id}`)
      //     : router.pathname.startsWith('/rent')
      //     ? router.push(`/rent/enquire/${item.id}`)
      //     : router.push(`buy/enquire/${item.id}`);
      // }
    } catch (err) {
      console.log(err);
    }
  };
  const [createEnquiry, { loading: isLoad, data: isDatas, error: isErrors }] =
    useOperationMethod('Userenquire{PropertyId}');
  let result;
  const CreateEnquireView = async () => {
    const params: Parameters = {
      PropertyId: item.id as number,
    };
    try {
      result = await (await createEnquiry(params)).data;
      console.log({ result });
      AddEnquireView();
      if (result.status) {
        enquiry && item.isForRent
          ? router.push(`/rent/enquire/${item.id}`)
          : enquiry && item.isForSale
          ? router.push(`/buy/enquire/${item.id}`)
          : router.pathname.startsWith('/rent')
          ? router.push(`/rent/enquire/${item.id}`)
          : router.push(`buy/enquire/${item.id}`);
      }
    } catch (err) {
      console.log(err);
    }
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
                <Text fontSize="11px" ml="4px">
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
                  fontSize="11px"
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
                <Text fontSize="11px" ml="4px">
                  &#8358;
                  {item.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex alignItems="center">
                <Icons iconClass="fa-award" style={iconStyle} />
                <Text
                  fontSize="11px"
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
          <HStack px=".8rem" w="full" spacing={5}>
            {enquiry ? (
              <Button
                variant="outline"
                height="40px"
                width="full"
                color="rgb(37,36,39)"
                disabled={true}
                textTransform="uppercase"
                onClick={() => AddViewToProperty()}
              >
                {item.isForRent ? 'To Rent' : 'To Buy'}
              </Button>
            ) : (
              <Button
                variant="outline"
                height="40px"
                width="full"
                color="rgb(37,36,39)"
                onClick={() => AddViewToProperty()}
              >
                See more
              </Button>
            )}

            {!item.sellMyself && (
              <Button
                variant="solid"
                height="40px"
                w="full"
                disabled={item.createdByUser?.id == user?.id ? true : false}
                onClick={() => CreateEnquireView()}
              >
                Enquire
              </Button>
            )}
          </HStack>
        </VStack>
      </Box>
      <SeemoreModal
        isOpen={isOpen}
        AddEnquireView={CreateEnquireView}
        onClose={onClose}
        item={item}
      />
    </>
  );
};

export default PropertyCard;
