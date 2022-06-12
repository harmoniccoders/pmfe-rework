import {
  Box,
  Button,
  Grid,
  Stack,
  Text,
  Center,
  Image,
  useDisclosure,
  GridItem,
  Flex,
} from '@chakra-ui/react';
import { PropertyTitle, PropertyType, PropertyView } from 'types/api';
import AddPropertyModal from 'lib/styles/customTheme/components/Modals/AddPropertyModal';
import ListingsCard from 'lib/components/ListingsCard';
import Pagination from 'lib/components/Pagination';

const sell = ({
  propertyTitles,
  propertyTypes,
  getStates,
  listings,
}: {
  propertyTypes: PropertyType[];
  propertyTitles: PropertyTitle[];
  getStates: any;
  listings: any;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const data = listings.value;

  const result = data?.filter((property: PropertyView) => !property.isDraft);

  return (
    <Box w="90%" mx="auto" py="4">
      {result && result.length > 0 ? (
        <Box>
          <Flex justify="space-between" align="center" my="8">
            <Text fontWeight="bold" color="brand.100" fontSize="lg">
              My Listings
            </Text>
            <Button
              bg="brand.100"
              onClick={onOpen}
              height="3rem"
              color="#fff"
              borderRadius="8px"
            >
              + &nbsp; Add Property
            </Button>
          </Flex>

          <Grid
            templateColumns={['repeat(1,1fr)', 'repeat(3,1fr)']}
            columnGap="8"
            rowGap={5}
          >
            <>
              {result.map((item: PropertyView) => {
                return (
                  <>
                    <GridItem key={item.id}>
                      <ListingsCard
                        item={item}
                        propertyTypes={propertyTypes}
                        propertyTitles={propertyTitles}
                        getStates={getStates}
                      />
                    </GridItem>
                  </>
                );
              })}
            </>
          </Grid>
        </Box>
      ) : (
        <Grid templateColumns="repeat(1, 1fr)" w="100%" h="100%">
          <Stack alignItems="center" justifyContent="center" spacing={[3, 6]}>
            <Box
              w={['90%', '100%','75%']}
              h={['100%', '100%','75%']}
              mt={{ base: '2rem', lg: '4.5rem' }}
              borderRadius="8px"
            >
              <Center>
                <Image
                src="/assets/admin.png"
                h="100%"
                w="100%"
                objectFit="contain"
              />
              </Center>
            </Box>
            <Text textAlign="center">
              You have no current property listed for sale.
            </Text>

            <Button
              bg="brand.100"
              onClick={onOpen}
              color="#fff"
              borderRadius="8px"
            >
              + &nbsp; Add Property
            </Button>
          </Stack>
        </Grid>
      )}
      <AddPropertyModal
        isOpen={isOpen}
        onClose={onClose}
        propertyTypes={propertyTypes}
        propertyTitles={propertyTitles}
        getStates={getStates}
      />
    </Box>
  );
};

export default sell;
