import React, { useContext, useState } from 'react';
import style from './FeaturedProducts.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { UserWishList } from '../../Context/WishList';

export default function FeaturedProducts() {
    let { AddToCart } = useContext(CartContext);
    let { AddToFav } = useContext(UserWishList);

    const [message, setMessage] = useState(null);

    async function AddFav(id) {
        let { data } = await AddToFav(id);
        setMessage(data.message);
        setTimeout(() => {
            setMessage(null);
        }, 4000);
    }

    async function addCart(id) {
        let { data } = await AddToCart(id);
        console.log(data);
    }

    function getProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }

    let { data, isLoading } = useQuery('getProducts', getProducts, {
        cacheTime: 3000
    });

    const getFirstTwoWords = (title) => {
        return title.split(' ').slice(0, 2).join(' ');
    }

    return (
        <>
            <div className="container">
                {message && (
                    <div className={`${style.alert} alert alert-success`} role="alert">
                        {message}
                    </div>
                )}
                <div className={`row mt-5 ${style.ov}`}>
                    {!isLoading ? (
                        data.data.data.map((product) => (
                            <div className={`col-md-2 mb-5 ${style.hov}`} key={product.id}>
                                <Link to={`/ProductDetails/${product.id}`} className={`${style.nodec}`}>
                                    <img src={product.imageCover} className={`w-100 ${style.imgg} mt-3`} alt="" />
                                    <p className={`text-success ${style.mr}`}>{product.category.name}</p>
                                    <h2 className='h6 '>{getFirstTwoWords(product.title)}</h2>
                                    <div className="d-flex justify-content-between">
                                        <p className='lead'>{product.price}EGP</p>
                                        <div className={`rating-container ${style['rating-container']}`}>
                                            <i className="fa-solid fa-star text-warning me-2 mb-3"></i>
                                            <p>{product.ratingsAverage}</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className={`heart-icon ${style.heartIcon}`}></div>
                                <button className={`w-100 btn bg-danger text-white mb-3 ${style.buton}`} onClick={() => AddFav(product.id)}>
                                    Add to Favourite
                                </button>
                                <button className={`w-100 btn bg-success text-white mb-3 ${style.buton}`} onClick={() => addCart(product.id)}>
                                    Add to Cart
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="d-flex justify-content-center align-items-center vh-75">
                            <i className="fa-solid fa-spinner"></i>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
