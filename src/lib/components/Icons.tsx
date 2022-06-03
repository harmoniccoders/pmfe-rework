import React from 'react';

type Props = {
  iconClass: string;
};

const Icons = ({ iconClass }: Props) => {
  return (
    <>
      <i className={`fal ${iconClass}`} style={{ color: '#0042ff' }}></i>
    </>
  );
};

export default Icons;
