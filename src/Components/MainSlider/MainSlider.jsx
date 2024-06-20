import React from 'react';
import style from './MainSlider.module.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from '../../Assets/images/slider-image-1.jpeg';
import imgg from '../../Assets/images/slider-image-2.jpeg';
import imggg from '../../Assets/images/slider-image-3.jpeg';

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2
  };

  return (
    <div className={`${style.over} container mt-4`}>
      <Slider {...settings}>
        <div className={style.slide}>
          <img src={img} alt="" className='w-100' height={280} />
        </div>
        <div className={style.slide}>
          <img src={imgg} alt="" className='w-100' height={140} />
          <img src={imggg} alt="" className='w-100' height={140} />
        </div>
      </Slider>
    </div>
  );
}
