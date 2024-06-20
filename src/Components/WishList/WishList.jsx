import React, { useContext, useEffect, useState } from 'react';
import style from './WishList.module.css';
import { UserWishList } from '../../Context/WishList';

export default function WishList() {
    const { GetUserFav,DeleteFromFav} = useContext(UserWishList);
    const [favorites, setFavorites] = useState([]);

    async function GetFav() {
        let { data } = await GetUserFav();
        setFavorites(data?.data || []);
    }
    async function deleteProduct(id) {
        let { data } = await DeleteFromFav(id);
       console.log('deleted succeffuly');
       setFavorites(data?.data || []);
       
    }

    useEffect(() => {
        GetFav();
    }, []);
    function CutWord(word) {
      if (!word) return ''; // التحقق من أن الكلمة ليست undefined
      return word.split(' ').slice(0, 8).join(' ');
  }
  
    return (
        <div className="container mt-5">
            <h1 className="mb-4">My Wishlist</h1>
            <div className="row">
                {favorites.map(product => (
                    <div className="col-md-4 mb-4" key={product._id}>
                        <div className="card h-100">
                            <img src={product.imageCover} className="card-img-top" alt={product.title} height={400} />
                            <div className="card-body position-relative mb-5">
                                <h5 className="card-title">{CutWord(product.title)}</h5>
                                <p className="card-text">{CutWord(product.description)}</p>
                                <p className="card-text"><strong>Price:</strong> {product.price} EGP</p>
                                <p className="card-text"><strong>Rating:</strong> {product.ratingsAverage} / 5</p>
                            </div>
                            <button className="btn btn-danger position-absolute bottom-0 ms-1 mb-1" onClick={()=>deleteProduct(product._id)} >Remove from Wishlist</button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


