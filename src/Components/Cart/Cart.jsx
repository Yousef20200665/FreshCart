import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { Helmet } from 'react-helmet'
import { CartContext } from '../../Context/CartContext'

export default function Cart() {

  const [response, setResponse] = useState([])
  let { getMyCart, DeleteCart, UpdateCount } = useContext(CartContext)
  
  async function myCart() {
    let { data } = await getMyCart()
    setResponse(data?.data.products || [])
  }
  
  async function Update(id, newCount) {
    let { data } = await UpdateCount(id, newCount)
    setResponse(data?.data.products || [])
  }
  
  async function Delete(id) {
    let { data } = await DeleteCart(id)
    setResponse(data?.data.products || [])
  }
  
  useEffect(() => {
    myCart()
  }, [])
  
  // حساب مجموع الأسعار
  const totalCartPrice = response.reduce((acc, product) => acc + product.price * product.count, 0);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Cart</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className={`${style.bgc} mt-3 container`}>
        <h3 className='ms-5 pt-5 mb-3'>Shop Cart:</h3>
        <p className={`ms-5 h4 lead ${style.cl}`}>Total Cart Price :  EGP {totalCartPrice}</p>
        <div className="row mt-5">
          {response.map(product => (
            <div key={product.product.id} className={`col-md-4 d-flex justify-content-between w-100 mb-4`} >
              <div className="images d-flex ms-4">
                <img src={product.product.imageCover} alt={product.product.title} className={`${style.pic} me-3`} />
                <div className="cont mt-4">
                  <h5>{product.product.title}</h5>
                  <p className={` lead ${style.cl}`}>Price: {product.price}</p>
                  <p onClick={() => Delete(product.product.id)} className={`  ${style.pointt}`}>
                    <i className={`fa-solid fa-trash ${style.cl} ${style.pointt}`}></i> Remove
                  </p>
                </div>  
              </div>
              <div className="content d-flex align-items-center">
                <p className={`me-3 fs-3 ${style.point}`} onClick={() => Update(product.product.id, product.count + 1)}>+</p>
                <p className='me-3 mt-1'>{product.count}</p>
                <p className={`me-3 fs-3 ${style.point}`} onClick={() => Update(product.product.id, product.count - 1)}>-</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
