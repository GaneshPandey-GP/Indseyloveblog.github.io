import { Typography } from '@material-ui/core';
import React, {useState} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { useAuthState } from '../../context';


function LinkCarousel() {
    const [index, setIndex] = useState(0);
  const [{links}] = useAuthState()
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    return (
        <Carousel activeIndex={index} onSelect={handleSelect} className="mt-2 mb-4" indicators={false}>
        {links.map(({link, linktitle, linkid}) =>
            (<Carousel.Item className="text-center" key={linkid}>
                <Typography variant="h6" gutterBottom>{linktitle}</Typography>
                <Typography variant="body2" gutterBottom>{link}</Typography>
            </Carousel.Item>))}
        </Carousel>
    );
}

export default LinkCarousel
