import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { UserTokenContext } from '../../Context/UserToken'

export default function Layout() {
  let {setUserToken} = useContext(UserTokenContext)
  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      setUserToken(localStorage.getItem('userToken'))
    }
  },[])
  return <>
  <Navbar/>
  <Outlet></Outlet>
  {/* <Footer/> */}
  
  </>
}
