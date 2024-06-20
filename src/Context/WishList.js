import axios from "axios";
import { createContext, useContext } from "react";
import { UserTokenContext } from "./UserToken";

export const UserWishList = createContext();

export default function UserWishListProvider({ children }) {
  const { userToken } = useContext(UserTokenContext);
  const headers = {
    token: userToken
  };

  async function AddToFav(id) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        productId: id,
      },
      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
  }
  async function GetUserFav() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
  }
  async function DeleteFromFav(id) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        headers,
      }
    )
    .then((res) => res)
    .catch((err) => err);
  }


  return (
    <UserWishList.Provider value={{ AddToFav,GetUserFav,DeleteFromFav}}>
      {children}
    </UserWishList.Provider>
  );
}
