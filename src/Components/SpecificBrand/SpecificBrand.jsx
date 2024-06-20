import React, { useContext, useEffect } from 'react';
import style from './SpecificBrand.module.css';
import { BrandContext } from '../../Context/BrandContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

export default function SpecificBrand() {
  let { id } = useParams();

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  }

  let { data, isLoading, isFetching } = useQuery(['BrandDetails', id], getProductDetails, {
    
  });

  const brand = data?.data.data;
  console.log(brand);

  return (
    <div className={style.container}>
      {isLoading || isFetching ? (
        <p className={style.loading}>Loading...</p>
      ) : (
        <>
          <img src={brand.image} alt={brand.name} className={style['brand-image']} />
          <div className={style['brand-details']}>
            <h1 className={style['brand-name']}>{brand.name}</h1>
            <p className={style['brand-slug']}>{brand.slug}</p>
          </div>
        </>
      )}
    </div>
  );
}
