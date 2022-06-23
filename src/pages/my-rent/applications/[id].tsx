import { VStack, Heading, SimpleGrid, Box } from '@chakra-ui/react';
import ApplicationsPage from 'lib/components/my-rent/ApplicationsPage';
import TenantInfo from 'lib/components/TenantInfo';
import { DataAccess } from 'lib/Utils/Api';
import { returnUserData } from 'lib/Utils/userData';
import { GetServerSideProps } from 'next';
import { Application } from 'types/api';

type Props = {
  data: Application;
};
const applications = ({ data }: Props) => {
  return (
    <ApplicationsPage data={data} />
    // <div>
    //
    //   {application.length > 0 ? (
    //     noAccepted.length === 0 ? (
    //       <VStack align="flex-start" spacing="5" mt="5">
    //         <Heading fontSize="15px">Tenant Applications</Heading>
    //         <SimpleGrid spacing="5" w="full">
    //           {application.map((item) => (
    //             <TenantInfo key={item.id} item={item} />
    //           ))}
    //         </SimpleGrid>
    //       </VStack>
    //     ) : (
    //       noAccepted.length > 0 && (
    //         <Box>
    //           <VStack align="flex-start" spacing="5" mt="5">
    //             <Heading fontSize="15px">Accepted Tenant</Heading>
    //             <SimpleGrid spacing="5" w="full">
    //               {application
    //                 ?.filter((item) => item?.status === 'ACCEPTED')
    //                 .map((item) => (
    //                   <TenantInfo key={item.id} item={item} />
    //                 ))}
    //             </SimpleGrid>
    //           </VStack>
    //           <VStack align="flex-start" spacing="5" mt="7">
    //             <Heading fontSize="15px">Other Applicants</Heading>
    //             <SimpleGrid spacing="5" w="full">
    //               {application
    //                 ?.filter((item) => item?.status !== 'ACCEPTED')
    //                 .map((item) => (
    //                   <TenantInfo key={item.id} disabled={true} item={item} />
    //                 ))}
    //             </SimpleGrid>
    //           </VStack>
    //         </Box>
    //       )
    //     )
    //   ) : (
    //     <Heading fontSize="15px" mt="5">
    //       No applications yet
    //     </Heading>
    //   )}
    // </div>
  );
};

export default applications;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    data: { user, redirect },
  } = returnUserData(ctx);
  if (redirect)
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    };
  const bearer = `Bearer ${ctx.req.cookies.token}`;
  const _dataAccess = new DataAccess(bearer);
  const id = ctx.params?.id;

  try {
    const data = (await _dataAccess.get(`/api/Application/list/${id}`)).data;

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
      },
    };
  }
};
