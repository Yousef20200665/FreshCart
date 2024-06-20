import React, { useContext, useEffect, useState } from 'react';
import style from './Brand.module.css';
import { Helmet } from 'react-helmet';
import { BrandContext } from '../../Context/BrandContext';
import { Link } from 'react-router-dom';

export default function Brand() {
  const { GetBrands } = useContext(BrandContext);
  const [brands, setBrands] = useState([]);

  async function fetchBrands() {
    const { data } = await GetBrands();
    setBrands(data?.data || []);
    
  }

  useEffect(() => {
    fetchBrands();
  }, []);
  

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brands</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className={style.container}>
        {brands.length > 0 ? (
          brands.map((brand) => (
            <Link to={`/SpecificBrand/${brand._id}`} key={brand._id} className={style.Link}>
              <div className={style['brand-item']}>
                <img src={brand.image} alt={brand.name} className={style['brand-image']} />
                <div className={style['brand-details']}>
                  <h2 className={style['brand-name']}>{brand.name}</h2>
                  <p className={style['brand-slug']}>{brand.slug}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
