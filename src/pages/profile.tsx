import Cookies from 'js-cookie';
import Profile from 'lib/components/Profile';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function profile() {
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
