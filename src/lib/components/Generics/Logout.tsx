import Cookies from 'js-cookie';

export const LogUserOut = (redirect: any) => {
  Cookies.remove('user');
  Cookies.remove('token');
  Cookies.remove('userIn');
  window.location.href = `${redirect}`;
};
