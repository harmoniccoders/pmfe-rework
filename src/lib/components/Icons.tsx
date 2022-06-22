import React from 'react';

type Props = {
  iconClass?: any;
  style?: any;
};

const Icons = ({ iconClass, style }: Props) => {
  return (
    <>
      <i className={`fal ${iconClass}`} style={style}></i>
    </>
  );
};

export default Icons;
