import {
  GridItem,
  Box,
  Grid,
  FormControl,
  FormLabel,
  Select,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';
import Icons from 'lib/components/Icons';
import React from 'react';
import Counter from './Counter';

type Props = {};

const RequestProperty = (props: Props) => {
  return (
    <Box>
      <form>
        <Grid
          templateColumns={['repeat(1,1fr)', 'repeat(3,1fr)']}
          columnGap={[0, 5]}
        >
          <GridItem>
            <FormControl>
              <FormLabel
                htmlFor="select-type"
                textTransform="capitalize"
                pos="relative"
                top={6}
                left={4}
                width="fit-content"
                zIndex={3}
                bg="brand.200"
              >
                Type
              </FormLabel>
              <Select
                placeholder="choose a property type"
                icon={<Icons iconClass="fa-angle-right" />}
                variant="outline"
                height="48px"
              >
                <option value="bungalow">bungalow</option>
                <option value="duplex">duplex</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel
                htmlFor="select-state"
                textTransform="capitalize"
                pos="relative"
                top={6}
                left={4}
                width="fit-content"
                zIndex={3}
                bg="brand.200"
              >
                State
              </FormLabel>
              <Select
                placeholder="what state in Nigeria do you want your property?"
                icon={<Icons iconClass="fa-angle-right" />}
                variant="outline"
                height="48px"
              >
                <option value="bungalow">bungalow</option>
                <option value="duplex">duplex</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel
                htmlFor="select-type"
                textTransform="capitalize"
                pos="relative"
                top={6}
                left={4}
                width="fit-content"
                zIndex={3}
                bg="brand.200"
              >
                Area(optional)
              </FormLabel>

              <Input
                type="text"
                placeholder="which area do you want your property in"
                h="40px"
              />
            </FormControl>

            <FormControl>
              <FormLabel
                htmlFor="text-area"
                textTransform="capitalize"
                pos="relative"
                top={5}
                left={4}
                width="fit-content"
                zIndex={3}
                bg="brand.200"
              >
                Comments
              </FormLabel>

              <Textarea
                placeholder="Type in whatever you want"
                size="sm"
                resize="vertical"
              />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel
                htmlFor="price"
                textTransform="capitalize"
                pos="relative"
                top={6}
                left={4}
                width="fit-content"
                zIndex={3}
                bg="brand.200"
              >
                Budget
              </FormLabel>

              <Input type="text" placeholder="&#8358;0" h="40px" />
            </FormControl>

            <Counter room="Bedrooms" />
            <Counter room="Bathroom" />

            <Button variant="solid" height="40px" my="20px" width="100%">
              Submit Request
            </Button>
          </GridItem>
        </Grid>
      </form>
    </Box>
  );
};

export default RequestProperty;
