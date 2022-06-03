import { GetServerSidePropsContext } from 'next';

export const returnUserData = (ctx: GetServerSidePropsContext) => {
  const { user, userIn } = ctx.req.cookies;
  return {
    data: {
      user: user,
      redirect: !userIn,
    },
  };
};
