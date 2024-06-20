import React, { useContext } from 'react';
import style from './ProductDetails.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext';
export default function ProductDetails() {
  let {AddToCart}=useContext(CartContext)
  let { id } = useParams();
 
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  async function addCart(id){
    let {data}= await AddToCart(id)
    console.log(data);
  }
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data, isLoading, isFetching } = useQuery('productDetails', getProductDetails,{
    cacheTime:3000
  });


  const product = data?.data?.data;
  

  return <>
     <Helmet>
                <meta charSet="utf-8" />
                <title>Product</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    <div className="container">
      {isLoading || isFetching ? (
      <div className="d-flex justify-content-center align-items-center vh-75">
      <i className="fa-solid fa-spinner"></i>
    </div>
      ) : (
        <div className={`row ${style.marg}`} >
          <div className="col-md-3">
            {/* <img src={product?.imageCover} alt="" className={`w-100 ${style.photo}`} /> */}
          <Slider {...settings}>
            {product.images.map((img)=>
            <img src={img} alt="" className={`w-100 ${style.photo}`} />
            )}
          </Slider>
  
          </div>
          <div className="col-md-9">
            <h4>{product?.title}</h4>
            <p className='lead'>{product?.description}</p>
            <p>{product?.category?.name}</p>
            <p>{product?.price} EGP</p>
            <button className={`${style.color} btn  w-100`} onClick={()=>addCart(product.id)}>Add to Cart</button>
          </div>
        </div>
      )}
    </div>
    </>
}
