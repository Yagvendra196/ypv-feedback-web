import React from "react";
// import PropTypes from 'prop-types';
import Slider from "react-slick";
import "../../../assets/slick-carousel/slick/slick.css";
import "../../../assets/slick-carousel/slick/slick-theme.css"; 
import styles from './Slider.module.scss';

const SliderItem = () => {
  const settings = {
    dot : true,
    infinite : true,
    speed : 500,
    slidesToShow : 3,
    slidesToScroll : 1,
    cssEase : "linear" 
  }

  return (
    <>
      <Slider {...settings}>
          <div className={`${styles.sliderWraper}`}>
            <div className={`${styles.sliderItem}`}>
              <h1>12345</h1>
            </div>                        
          </div>
      </Slider>
    </>
  );
};


export default SliderItem;