import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { store } from './App';
import logo from './images/M-logo.png';

const Dashboard = () => {
  const [token] = useContext(store);

  return (
    <>
      {!token && (
        <div className="entry-section">
          <nav className='nav-bar'>
      <span className='logo-sec'>
        <Link to="/home" className='link'>
          <img className='logo-image' src={logo} alt='logo' />
          <p className='logo-title'>MealMOB</p>
        </Link>
      </span>
      
  </nav>
          <div className="bg-container"></div>
          <div className="title-sec">
            <h1>MealMOB</h1>
            <p>Discover the best food & drinks in Warangal</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

