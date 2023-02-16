import {
  Grid,
  Text,
  Divider,
  VStack,
  HStack,
  Box,
  Button,
} from '@chakra-ui/react';
import Icons from './Icons';
import { useRouter } from 'next/router';
import { TenancyView } from 'types/api';
import moment from 'moment';

const LandlordRentCard = ({ data }: any) => {
  const router = useRouter();

  const iconStyle = {
    color: '#0042ff',
  };

  return (
    <Grid
      width="100%"
      templateColumns={['repeat(1,1fr)', 'repeat(2,1fr)', 'repeat(3,1fr)']}
      columnGap={6}
      rowGap={8}
      mt="25px"
    >
      {data.map((item: TenancyView) => (
        <Box
          w="100%"
          boxShadow="0 5px 5px 2px rgba(0,0,0,0.14)"
          py="15px"
          borderRadius="8px"
        >
          <Box w="100%">
            <VStack
              alignItems="flex-start"
              spacing={4}
              mx="auto"
              my="20px"
              w="90%"
            >
              <Text
                w="200px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                fontWeight={600}
                lineHeight={1.5}
              >
                {item.property?.name}
              </Text>

              <HStack w="100%">
                <Icons iconClass="fa-calendar-day" style={iconStyle} />

                <Text>{`Next rent is due in ${moment(item.rentDueDate).diff(
                  moment(),
                  'days'
                )} days`}</Text>
              </HStack>
            </VStack>

            <Divider />

            <Box width="90%" height="45px" mx="auto" mt="20px">
              <Button
                width="100%"
                height="100%"
                variant="outline"
                textTransform="capitalize"
                onClick={() =>
                  router.push(`/my-rent/tenancy/landlord/${item.id}`)
                }
              >
                view details
              </Button>
            </Box>
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default LandlordRentCard;
