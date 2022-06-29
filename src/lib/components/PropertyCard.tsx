import {
  Flex,
  Box,
  Image,
  VStack,
  Text,
  Icon,
  Grid,
  GridItem,
  Divider,
  Button,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdVerified } from 'react-icons/md';
import Icons from './Icons';
import SeemoreModal from 'lib/components/Modals/SeemoreModal';
import { Parameters } from 'openapi-client-axios';
import { useOperationMethod } from 'react-openapi-client';
import { useRouter } from 'next/router';
import { PropertyView, UserView } from 'types/api';
import Cookies from 'js-cookie';
import RentReliefModal from 'lib/components/Modals/RentReliefModal';
import { useToasts } from 'react-toast-notifications';
import naira from 'lib/components/Generics/Naira';
import DeleteListings from './Modals/DeleteLiting';
import RejectMatchModal from './Modals/RejectMatchModal';

type Props = {
  item: PropertyView;
  matchId?: number;
};

const iconStyle = {
  color: '#0042ff',
};
const users = Cookies.get('user') as unknown as string;
let user: UserView;
if (users !== undefined) {
  user = JSON.parse(users);
}

const PropertyCard = ({ item, matchId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: open, onOpen: opened, onClose: close } = useDisclosure();
  const [openRelief, setOpenRelief] = useState<boolean>(false);

  const openReliefModal = () => {
    setOpenRelief(true);
  };

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
    } catch (err) {}
  };

  const router = useRouter();
  const curPage = router.asPath;
  const relief = router.asPath == '/rent/rent-relief';
  const enquiry = router.asPath == '/enquires';

  const [addEnquiry, { loading: isLoading, data: isData, error: isError }] =
    useOperationMethod('Propertyaddenquiries{Id}');
  const userIn = Cookies.get('userIn');
  const AddEnquireView = async () => {
    if (userIn != 'true') {
      router.push('/login');
    }
    const params: Parameters = {
      Id: item.id as number,
    };

    try {
      const result = await (await addEnquiry(params)).data;
    } catch (err) {}
  };

  const isRequest = router.pathname.startsWith('/requests/');

  const [createEnquiry, { loading: isLoad, data: isDatas, error: isErrors }] =
    useOperationMethod('Userenquire{PropertyId}');
  let result;
  const CreateEnquireView = async () => {
    const params: Parameters = {
      PropertyId: item.id as number,
    };
    try {
      result = await (await createEnquiry(params)).data;

      AddEnquireView();
      if (result.status) {
        enquiry && item.isForRent
          ? router.push(`/rent/enquire/${item.id}`)
          : enquiry && item.isForSale
          ? router.push(`/buy/enquire/${item.id}`)
          : router.pathname.startsWith('/rent')
          ? router.push(`/rent/enquire/${item.id}`)
          : router.push(`/buy/enquire/${item.id}`);
      }
    } catch (err) {}
  };
  const { addToast } = useToasts();

  function doEnquiry() {
    if (enquiry && item.isForRent) {
      router.push(`/rent/enquire/${item.id}`);
      return;
    }
    if (enquiry && item.isForSale) {
      router.push(`/buy/enquire/${item.id}`);
      return;
    }
  }

  const [
    acceptRequest,
    { loading: isLoader, data: isDataer, error: isErrorer },
  ] = useOperationMethod('PropertyRequestmatchaccept{matchId}');

  const AcceptRequest = async () => {
    const params: Parameters = {
      matchId: matchId as number,
    };

    try {
      const result = await (await acceptRequest(params)).data;

      if (result.status) {
        addToast('Successful', {
          appearance: 'success',
          autoDismiss: true,
        });
        CreateEnquireView();
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
    <>
      <Box
        w="full"
        pb="1rem"
        borderRadius="8px"
        overflow="hidden"
        boxShadow="0 5px 5px 2px rgba(0,0,0,0.14)"
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
            {item.lga}
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
                  {naira(item.price as unknown as number)}
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
          {enquiry ? (
            <HStack px=".8rem" w="full" spacing={5}>
              <Button
                variant="outline"
                height="40px"
                width="full"
                color="rgb(37,36,39)"
                disabled={true}
                textTransform="uppercase"
              >
                {item.isForRent ? 'To Rent' : 'To Buy'}
              </Button>

              <Button
                variant="solid"
                height="40px"
                bgColor={isRequest ? '#2FDF84' : 'brand.100'}
                w="full"
                disabled={item.createdByUser === user?.id}
                onClick={doEnquiry}
              >
                Details
              </Button>
            </HStack>
          ) : isRequest ? (
            <Box w="full">
              <Text fontSize=".9rem" mb=".5rem" pl="1rem" fontWeight="500">
                Do you like this property?
              </Text>

              <HStack px=".8rem" w="full" spacing={5}>
                <Button
                  variant="outline"
                  height="40px"
                  width="full"
                  color="white"
                  bgColor="brand.800"
                  textTransform="capitalize"
                  onClick={opened}
                  _hover={{
                    bgColor: 'transparent',
                    color: 'brand.800',
                    borderColor: 'brand.800',
                  }}
                >
                  Reject
                </Button>

                <Button
                  variant="solid"
                  height="40px"
                  bgColor="#2FDF84"
                  w="full"
                  disabled={item.createdByUser?.id === user?.id}
                  onClick={() => AcceptRequest()}
                  _hover={{
                    bgColor: 'transparent',
                    color: '#2FDF84',
                    border: ' 1px solid',
                    borderColor: '#2FDF84',
                  }}
                >
                  Accept
                </Button>
              </HStack>
            </Box>
          ) : relief ? (
            <HStack px=".8rem" w="full" spacing={5}>
              <Button
                variant="outline"
                height="40px"
                width="full"
                textTransform="capitalize"
                onClick={() => AddViewToProperty()}
              >
                See More
              </Button>

              <Button
                variant="solid"
                height="40px"
                w="full"
                bgColor={
                  item.createdByUser?.id === user?.id ? 'gray.300' : 'brand.100'
                }
                disabled={item.createdByUser?.id === user?.id}
                onClick={() => openReliefModal()}
              >
                {item.createdByUser?.id === user?.id
                  ? 'Disabled'
                  : 'Get Relief'}
              </Button>
            </HStack>
          ) : (
            <HStack px=".8rem" w="full" spacing={5}>
              <Button
                variant="outline"
                height="40px"
                width="full"
                textTransform="capitalize"
                onClick={() => AddViewToProperty()}
              >
                See More
              </Button>

              <Button
                variant="solid"
                height="40px"
                w="full"
                bgColor={
                  item.createdByUser?.id === user?.id ? 'gray.300' : 'brand.100'
                }
                disabled={item.createdByUser?.id === user?.id}
                onClick={() => CreateEnquireView()}
              >
                {item.createdByUser?.id === user?.id ? 'Disabled' : 'Enquire'}
              </Button>
            </HStack>
          )}
        </VStack>
      </Box>
      <RentReliefModal
        onClose={() => setOpenRelief(false)}
        isOpen={openRelief}
        item={item}
      />
      <SeemoreModal
        isOpen={isOpen}
        openReliefModal={openReliefModal}
        AddEnquireView={CreateEnquireView}
        onClose={onClose}
        item={item}
      />
      {isRequest && (
        <RejectMatchModal onClose={close} isOpen={open} item={matchId} />
      )}
    </>
  );
};

export default PropertyCard;
