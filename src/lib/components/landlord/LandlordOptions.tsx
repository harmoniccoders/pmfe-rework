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
  import Icons from '../Icons';

const LandOptions =()=>{
    return(
        <>
            <Box w={['95%','50vw','30vw']} borderRadius='8px !important' boxShadow='0 23px 36px 4px rgba(0,0,0,0.14)'>

                <Box w='full' h='150px' pos='relative'>
                    <Image src='/assets/nb.webp' alt='property-image' w='100%' height='100%' objectFit='cover'/>
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
                        Lekki phase 1
                    </Flex>
                </Box>
                
                <VStack mt='.5rem' f>
                    <Text textAlign='left' fontWeight='700' fontSize={['1em','1.2em','1.5em']} whiteSpace='nowrap'>4 Bedroom Duplex with BQ</Text>
                    <HStack float='left' mt='.75rem'>
                        <Icons iconClass="fa-calendar" />
                        <Text fontWeight='400' fontSize={['.75em','1em']}>Next rent is due in 365 days</Text>
                    </HStack>
                </VStack>
                <Grid mt={['.5rem','.75rem']} p='.5rem' alignItems='center !important' justifyContent='center !important' templateColumns={['repeat(1,1fr)','repeat(2,1fr)']} gap={4}>
                    <Box w='95%' border='1px solid gray' mt='.2rem' p='.75rem' borderRadius='4px' cursor='pointer'>
                        <HStack>
                            <Icons iconClass='fa-house'/>
                            <Text fontSize='1rem' whiteSpace='nowrap' ml='4px'>Complaints</Text>
                        </HStack>
                    </Box>
                    <Box w='95%' border='1px solid gray' mt='.2rem' p='.75rem' borderRadius='4px' cursor='pointer'>
                        <HStack>
                            <Icons iconClass='fa-bill'/>
                            <Text fontSize='1rem' whiteSpace='nowrap' ml='4px'>Payments</Text>
                        </HStack>
                    </Box>
                    <Box w='95%' border='1px solid gray' mt='.2rem' p='.75rem' borderRadius='4px' cursor='pointer'>
                        <HStack>
                            <Icons iconClass='fa-scroll'/>
                            <Text fontSize='1rem' whiteSpace='nowrap' ml='4px'>Recipts</Text>
                        </HStack>
                    </Box>
                    <Box w='95%' border='1px solid gray' mt='.2rem' p='.75rem' borderRadius='4px' cursor='pointer'>
                        <HStack>
                            <Icons iconClass='fa-copy'/>
                            <Text fontSize='1rem' whiteSpace='nowrap' ml='4px'>Tenancy Agreements</Text>
                        </HStack>
                    </Box>
                    <Box w='95%' border='1px solid gray' mt='.2rem' p='.75rem' borderRadius='4px' cursor='pointer'>
                        <HStack>
                            <Icons iconClass='fa-world'/>
                            <Text fontSize='1rem' whiteSpace='nowrap' ml='4px'>Renew Tenancy</Text>
                        </HStack>
                    </Box>
                </Grid>
            </Box>
        </>
    )
}

export default LandOptions;