import React from 'react'
import style from './UnProtected.module.css'
import Login from '../Login/Login'
import { Navigate } from 'react-router-dom'
export default function UnProtected(props) {
  console.log(props);
 if(!localStorage.getItem('userToken')){
  return props.children
 }
 else{
  return <Navigate to={'/Home'}></Navigate>
 }
}
