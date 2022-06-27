import Cookies from 'js-cookie';
import Profile from 'lib/components/Profile';
import { DataAccess } from 'lib/Utils/Api';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function profile({ data }: any) {
  const router = useRouter();
  const isUser = Cookies.get('userIn');
  useEffect(() => {
    if (isUser !== 'true') {
      router.push({ pathname: '/login', query: { from: router.pathname } });
      return;
    }
  });
  return <Profile />;
}

export default profile;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const bearer = `Bearer ${ctx.req.cookies.token}`;
//   const _dataAccess = new DataAccess(bearer);
//   let { url } = ctx.query;
//   url = 'limit=25&offset=14';
//   try {
//     const data = (await _dataAccess.get(`/api/user/list?${url}`)).data;

//     return {
//       props: {
//         data,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         propertyTypes: {},
//         listings: [],
//       },
//     };
//   }
// };
