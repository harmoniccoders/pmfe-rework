import {
  Flex,
  Box,
  Image,
  VStack,
  Text,
  Grid,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import Icons from '../../Icons';
import { TenancyView } from 'types/api';
import React from 'react';
import LandlordModal from 'lib/components/Modals/LandlordModal';
import TenancyAgreement from './TenancyAgreement';
import moment from 'moment';

const LandlordOptions = ({ singles }: { singles: TenancyView }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: opened, onOpen: onOpened, onClose: closed } = useDisclosure();

  return (
    <>
      <Box w={['90%', '70%']} mx="auto" py="2rem">
        <Box w="full" h={['300px', '400px']} pos="relative">
          <>
            {singles.property?.mediaFiles &&
            singles.property?.mediaFiles?.length > 0 ? (
              <>
                {singles.property?.mediaFiles[0].isImage && (
                  <Image
                    src={singles.property?.mediaFiles[0].url as string}
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
            px="4rem"
            h="35px"
            top="18%"
            fontSize="14px"
            align="center"
            justify="center"
            borderRadius="4px 0 0 4px"
            right="0"
            textTransform="capitalize"
          >
            {singles?.property?.lga}
          </Flex>
        </Box>

        <VStack my="3rem" alignItems="flex-start">
          <Text fontWeight="600" whiteSpace="nowrap" fontSize="2rem">
            {singles.property?.name}
          </Text>
          <HStack>
            <Icons iconClass="fa-calendar" />
            <Text>{`Next rent is due in ${moment(singles.rentDueDate).diff(
              moment(singles.transaction?.dateCreated),
              'day'
            )} days`}</Text>
          </HStack>
        </VStack>
        <Grid
          mt={['.5rem', '.75rem']}
          mb="4rem"
          alignItems="center !important"
          justifyContent="center !important"
          templateColumns={['repeat(1,1fr)', 'repeat(2,1fr)']}
          gap={4}
        >
          <Box
            w="full"
            border="1px solid gray"
            mt=".2rem"
            p=".75rem"
            borderRadius="4px"
            cursor="pointer"
          >
            <HStack onClick={onOpen}>
              <Icons iconClass="fa-house" />
              <Text fontSize="1rem" ml="4px" fontWeight="600">
                Complaints
              </Text>
            </HStack>
          </Box>
          <Box
            w="full"
            border="1px solid gray"
            mt=".2rem"
            p=".75rem"
            borderRadius="4px"
            cursor="pointer"
          >
            <HStack>
              <Icons iconClass="fa-money-bill-wave" />
              <Text
                fontSize="1rem"
                whiteSpace="nowrap"
                ml="4px"
                fontWeight="600"
              >
                Payments
              </Text>
            </HStack>
          </Box>
          <Box
            w="full"
            border="1px solid gray"
            mt=".2rem"
            p=".75rem"
            borderRadius="4px"
            cursor="pointer"
          >
            <HStack>
              <Icons iconClass="fa-scroll" />
              <Text
                fontSize="1rem"
                whiteSpace="nowrap"
                ml="4px"
                fontWeight="600"
              >
                Recipts
              </Text>
            </HStack>
          </Box>
          <Box
            w="full"
            border="1px solid gray"
            mt=".2rem"
            p=".75rem"
            borderRadius="4px"
            cursor="pointer"
          >
            <HStack onClick={onOpened}>
              <Icons iconClass="fa-copy" />
              <Text
                fontSize="1rem"
                whiteSpace="nowrap"
                ml="4px"
                fontWeight="600"
              >
                Tenancy Agreements
              </Text>
            </HStack>
          </Box>
          <Box
            w="full"
            border="1px solid gray"
            mt=".2rem"
            p=".75rem"
            borderRadius="4px"
            cursor="pointer"
          >
            <HStack>
              <Icons iconClass="fa-life-ring" />
              <Text
                fontSize="1rem"
                whiteSpace="nowrap"
                ml="4px"
                fontWeight="600"
              >
                Renew Tenancy
              </Text>
            </HStack>
          </Box>
        </Grid>
      </Box>

      <LandlordModal isOpen={isOpen} onClose={onClose} data={singles} />
      <TenancyAgreement isOpen={opened} onClose={closed} data={singles} />
    </>
  );
};

export default LandlordOptions;
