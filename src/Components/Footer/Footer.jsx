import React from 'react';
import style from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={`${style.foot} bottom`}>
            <div className="container pt-5 pb-5">
                <h2 className='h4'>Get the freshCart app</h2>
                <p className='lead'>We will send you a link, open it on your phone to download the app</p>
                <div className="row">
                    <div className="col-md-9">
                        <input type="email" className="form-control" placeholder='Email..'/>
                    </div>
                    <div className="col-md-3">
                        <button className={`${style.bttn} btn text-white`}>Share App Link</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
