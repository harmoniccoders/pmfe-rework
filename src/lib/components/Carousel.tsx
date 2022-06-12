import { Box } from '@chakra-ui/react';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import DateSliders from './DateSliders';

type Props = {
  item: any;
};

const DateCarousel = ({ item }: Props) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel
      responsive={responsive}
      showDots={false}
      arrows
      swipeable={true}
      autoPlay={false}
    >
      {item}
    </Carousel>
  );
};

export default DateCarousel;
