import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

type Props = {
  item: any;
};

const DateCarousel = ({ item }: Props) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <Carousel
      responsive={responsive}
      showDots={false}
      arrows
      swipeable={true}
      autoPlay={false}
      className="dateslider"
    >
      {item}
    </Carousel>
  );
};

export default DateCarousel;
