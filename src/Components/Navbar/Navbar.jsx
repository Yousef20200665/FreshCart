import React, { useContext, useState } from 'react';
import style from './Navbar.module.css';
import img from '../../Assets/images/freshcart-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserTokenContext } from '../../Context/UserToken';

export default function Navbar() {
    const { userToken, setUserToken } = useContext(UserTokenContext);
    const [menuOpen, setMenuOpen] = useState(false);
    let nav = useNavigate();

    function Logout() {
        localStorage.removeItem('userToken');
        setUserToken(null);
        nav('/login');
    }

    function toggleMenu() {
        setMenuOpen(!menuOpen);
    }

    return (
        <nav className={style.navbar}>
            <div className={style.navbarLogoLinks}>
                <div className={style.navbarLogo}>
                    <img src={img} alt="FreshCart Logo" />
                </div>
                <div className={style.navbarLinks}>
                    {userToken ? (
                        <>
                            <Link to={'/home'} className={`${style.deco} me-4 ms-4`}>Home</Link>
                            <Link to={'/cart'} className={`${style.deco} me-4`}>Cart</Link>
                            <Link to={'/category'} className={`${style.deco} me-4`}>Category</Link>
                            <Link to={'/brand'} className={`${style.deco} me-4`}>Brands</Link>
                            <Link to={'/WishList'} className={`${style.deco} me-4`}>WishList</Link>

                        </>
                    ) : null}
                </div>
            </div>
            <div className={style.navbarAuthLinks}>
                {userToken ? (
                    <div className={style.navbarSignOut}>
                       <button onClick={Logout} className={`${style.deco} btn `}>Logout</button>
                    </div>
                ) : (
                    <>
                        <Link to={'/login'} className={`${style.deco} me-4`}>Login</Link>
                        <Link to={''} className={`${style.deco} `}>Register</Link>
                    </>
                )}
            </div>
            <div className={style.navbarToggle} onClick={toggleMenu}>
                &#9776;
            </div>
            <div className={`${style.navbarMenu} ${menuOpen ? style.show : ''}`}>
                {userToken ? (
                    <>
                        <Link to={'/home'} className={style.deco} onClick={toggleMenu}>Home</Link>
                        <Link to={'/cart'} className={style.deco} onClick={toggleMenu}>Cart</Link>
                        <Link to={'/category'} className={style.deco} onClick={toggleMenu}>Category</Link>
                        <Link to={'/brand'} className={style.deco} onClick={toggleMenu}>Brands</Link>
                        <Link to={'/WishList'} className={style.deco} onClick={toggleMenu}>ًWishList</Link>
                        <button onClick={() => { Logout(); toggleMenu(); }} className={`${style.deco} btn`}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to={'/login'} className={style.deco} onClick={toggleMenu}>Login</Link>
                        <Link to={'/register'} className={style.deco} onClick={toggleMenu}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
