import React, {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/M-logo.png';
import { FaCartPlus } from "react-icons/fa";
// import { store } from '../App'; // import the context

const Header = ({ size }) => {
  const [loginToken, setLoginToken] = useState(false);
  const token = localStorage.getItem('token');
  
  useEffect(()=>{
    if(token){
      setLoginToken(true)
      console.log('Token:', token);
    }else{
      setLoginToken(false)
      console.log(token)
    }
  },[token])
  const logoutHandler = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  };

  return (
    <nav className='nav-bar'>
      <span className='logo-sec'>
        <Link to="/home" className='link'>
          <img className='logo-image' src={logo} alt='logo' />
          <p className='logo-title'>MealMOB</p>
        </Link>
      </span>

      <div className="nav-details">
        {loginToken ? (
          <div className='logout-details'>
            <div className='cart'>
              <Link to='/cart'>
                <span className="fas fa-cart-plus">
                  <FaCartPlus />
                </span>
                <span>{size}</span>
              </Link>
            </div>
            <span className='logout-btn' onClick={logoutHandler}>Logout</span>
          </div>
        ) : (
          <div className='login-details'>
            <div className='link-text'>
              <Link to="/login">Log in</Link> / <Link to="/signup">Sign up</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
