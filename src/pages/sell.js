import {Box,Text,Button, Image, Grid} from '@chakra-ui/react';

const Sell = () =>{ 
    return (
        <>
             <Grid templateColumn='repeat(1, 1fr)'
 alignItems='center' justifyContent='center'
 w='100%' h='100%'>
              <Image alt='' scr=''/>
              <Text color='brand.600'></Text>
               <Button>Add a property</Button>
             <Grid/>
        </>
)
}
