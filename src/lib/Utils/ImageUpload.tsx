import { Box, InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { Widget } from '@uploadcare/react-widget'
import {FaImage} from 'react-icons/fa'

export const ImageUpload = () => {
    return (
      <Box>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<FaImage color="gray.300" />}
          />
          <Input type="tel" placeholder="Phone number" />
            </InputGroup>
            <Widget publicKey="fda3a71102659f95625f"/>
      </Box>
    );
}
