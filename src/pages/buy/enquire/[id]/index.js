import React from 'react';
import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();

  const { id } = router.query;

  return (
    <div>
      dynamic route
      <p> {id} is the id </p>
    </div>
  );
};

export default index;
