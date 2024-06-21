import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserTokenContext } from "./UserToken";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { userToken } = useContext(UserTokenContext); // Move useContext inside the component
  const headers = {
    token: userToken
  };
  async function DeleteCart(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
            headers
        }
    ).then((res)=>res)
    .catch((err)=>err)
  }
  async function AddToCart(id) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
      productId: id
    }, {
      headers
    }).then((res) => res)
      .catch((err) => err);
  }
  async function OnlinePayment(CartId,shippingAdress) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:3000`, {
      shippingAdress
    }, {
      headers
    }).then((res) => res)
      .catch((err) => err);
  }
  async function getMyCart(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers
    }).then((res)=>res)
    .catch((err)=>err)
  }
  async function UpdateCount(id, count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        count:count
    },{
        headers
    }).then((res)=>res).catch((err)=>err)
  }

  return (
    <CartContext.Provider value={{ OnlinePayment,AddToCart, getMyCart,DeleteCart,UpdateCount}}>
      {children}
    </CartContext.Provider>
  );
}
