import { Box, Text, Grid,Stack, FormLabel, Image, Input, Button, InputGroup } from "@chakra-ui/react";
import TextField from '@mui/material/TextField'

const Login = () =>{
    return(
        <Grid templateColumns="repeat(2,1fr)"  gap={5}>
            
                <Box w='50vw' h={['35vh','65vh']} bg='#ccc' my='5rem'  mx='1.3rem' borderRadius='8px' />
            
            <Stack alignItems='center !important' my='10rem' justifyContent='center' p='2rem' spacing={2} >
                <InputGroup >
                    <Input placeholder="Enter your username" shadow='none' borderRadius='4px' size='sm' />
                </InputGroup>
                <InputGroup>
                    <Input placeholder="" type='password' shadow='none' size='sm' />
                </InputGroup>
                <InputGroup mt='1rem'> 
                    <Button color='#fff' bg='blue' w='100%'>Login</Button>
                </InputGroup>
                {/* //you are to use react hooks form for this Login */}
            </Stack>
        </Grid>
    )
}

export default Login