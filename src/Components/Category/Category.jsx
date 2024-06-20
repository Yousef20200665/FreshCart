import React from 'react';
import style from './Category.module.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';

export default function Category() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2
  };

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data, isLoading, isFetching } = useQuery('productDetails', getProductDetails, {
    cacheTime: 3000
  });

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (!data || !data.data || !data.data.data) {
    return <div>No data available</div>;
  }

  return (
    <div className={`${style.over} container`}>
      <div className={`row ${style.marg}`}>
      <p className='ms-2 mt-4 lead fs-3'>shop popular categories:</p>
      <div className="col-md-12">
        <Slider {...settings}>
          {data.data.data.map((category) => (
            <div key={category._id}>
              <img src={category.image} alt={category.name} className={`w-100 ${style.photo} ${style.pointer}`} height={200} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
    </div>
    
  );
}
