import React from 'react'
import style from './Notfound.module.css'
import img from '../../Assets/images/error.png'
import { Helmet } from 'react-helmet'

export default function Notfound() {
  return <>
   <Helmet>
                <meta charSet="utf-8" />
                <title>NotFound</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  <div className='d-flex justify-content-center vh-75 align-items-center'>
  <img src={img} className='' alt="" />
  </div>
  </>
}
