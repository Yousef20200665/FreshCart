import { createContext, useContext, useState } from "react";
import { UserTokenContext } from "./UserToken";
import axios from "axios";

export const CategoriesContext = createContext();

export default function CategoriesContextProvider({ children }) {
    let {userToken}=useContext(UserTokenContext)
    async function getAllCategories(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then((res)=>res).catch((err)=>err)
    }

   
  
  return (
    <CategoriesContext.Provider value={{ getAllCategories}}>
      {children}
    </CategoriesContext.Provider>
  );
}
