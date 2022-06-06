import { Grid, Text,Stack, Box, Button, Image , useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import {ChevronLeftIcon} from '@chakra-ui/icons'
import Link from 'next/link'
import ButtonComponent from 'lib/components/Button';
import Form from './Form'

const Sell =()=>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <Grid templateColumns='repeat(1, 1fr)' w='100%' h='100%'  >
            <Stack alignItems='center' justifyContent='center' spacing={[3,6]}>
                <Box
            w="35vw"
            h={['25vh', '35vh']}
            // bg="#ccc"
            my="5rem"
            mx="1.3rem"
            borderRadius="8px"
            >
            <Image src="/assets/admin.png" />
            </Box>
            <Text>You have no current property listed for sale.</Text>
            
            <Button bg='brand.100' onClick={onOpen} color='#fff' borderRadius='8px'>
            + &nbsp; Add Property
            </Button>

            </Stack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <Text color='brand.100' p='1.2rem' onClick={onClose}><ChevronLeftIcon/>  Back </Text>
                <ModalBody>
                    <Form/>
                </ModalBody>

                {/* <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter> */}
                </ModalContent>
            </Modal>
        </Grid>
    );
}

export default Sell;