import axios from "axios";
import { createContext, useState } from "react";

export const BrandContext = createContext();

export default function BrandContextProvider({ children }) {
    async function GetBrands(){
        return  axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
        .then((res)=>res).catch((err)=>err)
    }
    async function getSpecificBrand(id){
        return  axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
        .then((res)=>res).catch((err)=>err)
    }
  return (
    <BrandContext.Provider value={{GetBrands,getSpecificBrand}}>
      {children}
    </BrandContext.Provider>
  );
}
