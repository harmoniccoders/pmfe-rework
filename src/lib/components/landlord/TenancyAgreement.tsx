import React from 'react'
import {Box, Text, Stack,  } from '@chakra-ui/react'

const TenancyAgreement = () => {
  return (
    <>
          <Box>
            <Text fontWeight="700" fontSize="1.25em">
              Tenancy Agreement
            </Text>
            <Text fontSize="1.25em">Between</Text>
            <Text fontWeight="700" fontSize="1.25em">
              Gideon Oluwasegun Emokpae
            </Text>
            <Text fontSize="1.35em">And</Text>
            <Text fontWeight="700" fontSize="1.35em">
              PropertyMataaz Limited
            </Text>
            <Stack fontSize=".95em" mt="1rem">
              <Text fontWeight="600">
                In respect of the 4 Bedroom Duplex at No. 16 Admiralty Way,
                lekki Phase 1, lekki, Lagos, Nigeria
              </Text><br/>
              <Text>
                <span style={{ textTransform: 'uppercase' }}>
                  THIS TENANCY IS MADE THIS 10TH DAY OF APRIL 2021 BETWEEN
                </span>
                <br />
                <span style={{ textTransform: 'uppercase', fontWeight: '600' }}>
                  GIDEON OLUWASEGUN EMOKPAE
                </span>{' '}
                of 10 Adebayo Titilope Street, Omole Phase 4, Ikeja, Lagos,
                Nigeria (hereinafter to referred to as The Tenant which
                expression shall where the context so admit include his
                successors in title and assigns) of the one part
                <br />
                <br />
                <span style={{ textTransform: 'uppercase' }}> and</span>
                <br />
                <br />
                <span style={{ textTransform: 'uppercase', fontWeight: '600' }}>
                  PROPERTYMATAAZ LIMITED
                </span>
                , a company incorporated in nigeria having its registered office
                at Km 24 Lekki Epe Expressway, oko Ado, Lagos, Nigeria
                <br />
                <br />
                <span style={{ textTransform: 'uppercase', fontWeight: '600' }}>
                  WHEREAS
                </span>
                :
              </Text>
            </Stack>
          </Box>
        </>
  )
}

export default TenancyAgreement