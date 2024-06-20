import React from 'react';
import style from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={` ${style.foot} fixed-bottom`}>
            <div className="container pt-5 pb-5">
            <h2 className='h4'>Get the freshCart app</h2>
           <p className='lead'>we will send you a link open it in your phone to download the app</p>
           <div className="row">
            <div className="col-md-9">
                <input type="email" className="form-control" placeholder='Email..'/>
            </div>
            <div className="col-md-3">
                <button className={`${style.bttn} btn btn-danger`}>share app link</button>
            </div>
           </div>
            </div>
          
        </footer>
    );
}
