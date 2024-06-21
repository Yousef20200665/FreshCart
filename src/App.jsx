import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Category from './Components/Category/Category'
import Brand from './Components/Brand/Brand'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import UserTokenProvider from './Context/UserToken'
import Notfound from './Components/Notfound/Notfound'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { Offline, Online } from "react-detect-offline";
import CartContextProvider from './Context/CartContext'
import BrandContextProvider, { BrandContext } from './Context/BrandContext'
import SpecificBrand from './Components/SpecificBrand/SpecificBrand'
import Categories from './Components/Categories/Categories'
import WishList from './Components/WishList/WishList'
import CheckOut from './Components/CheckOut/CheckOut'
import UserWishListProvider from './Context/WishList'
import CategoriesContextProvider from './Context/CategoriesContext'
export default function App() {
  let routers =createBrowserRouter([
    {path:'',element:<Layout/>, children:[
      {index:true,element:<Register/>},
      {path:'Login',element:<Login/>},
      {path:'Home',element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'brand',element:<ProtectedRoute><Brand/></ProtectedRoute>},
      {path:'WishList',element:<ProtectedRoute><WishList/></ProtectedRoute>},
      {path:'Category',element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'Cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'ProductDetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'SpecificBrand/:id',element:<ProtectedRoute><SpecificBrand/></ProtectedRoute>},
      {path:'CheckOut/:id',element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
      {path:'*',element:<ProtectedRoute><Notfound/></ProtectedRoute>},
     
    ]}
  ])
  return <><UserTokenProvider>
    <CartContextProvider>
      <BrandContextProvider>
      <UserWishListProvider>
        <CategoriesContextProvider>

  <div>
    <Online><RouterProvider router={routers}></RouterProvider></Online>
    <Offline>Only shown offline (surprise!)</Offline>
  </div>
  </CategoriesContextProvider>
  </UserWishListProvider>
  </BrandContextProvider>
  </CartContextProvider>
  </UserTokenProvider>
  </>
}
