import { Grid, Text, Divider,Stack, useDisclosure,HStack, Box, Button } from '@chakra-ui/react';
import Icons from './Icons';
import LandlordModal from 'lib/styles/customTheme/components/Modals/LandlordModal';



const LandlordRentCard = () =>{
    const { isOpen, onOpen, onClose } = useDisclosure();

    return(
        <>
            <Box  w={['85vw', '50%','35%']}
            borderRadius="8px"
            overflow="hidden"
            boxShadow="0 23px 36px 4px rgba(0,0,0,0.14)" p='1.2rem' minH='150px'>
                <Text fontWeight='700' fontSize={['1.2em','1.2em','1.5em']} whiteSpace='nowrap'>4 Bedroom Duplex with BQ</Text>
                <HStack mt='.75rem'>
                    <Icons iconClass="fa-calendar" />
                    <Text fontWeight='400'>Next rent is due in 365 days</Text>
                </HStack>
                <Divider mt='1rem' display='block' w='100% !important'/>
                <Button onClick={onOpen} border='1px solid gray' color='gray' bg='#fff !important' mt='.5rem' mb='.75rem' cursor='pointer' w={['90%','']} >View Details</Button>
            </Box>
            
            <LandlordModal  isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default LandlordRentCard;