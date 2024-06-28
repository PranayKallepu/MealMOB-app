import React, { useContext, useEffect } from 'react';
import { store } from '../../App';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
// components
import ItemsDisplay from '../../components/ItemsDisplay';
import Chains from '../../components/Chains';
import FirmCollections from '../../components/FirmCollections';
import Footer from '../../pages/home/Footer';

const Home = () => {
  const [token] = useContext(store);

  useEffect(() => {
    if (token) {
      axios.get('https://mealmob-server.onrender.com/home', {
        headers: {
          'x-token': token
        }
      })
      .then(res => {
        // Set data if needed
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    }
  }, [token]);

  const jwtToken = localStorage.getItem('token');

  if (!jwtToken) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='home-container'>
      
      <section className='body-container'>
        <ItemsDisplay />
        <Chains />
        <FirmCollections />
      </section>
      <section className='footer-section'><Footer /></section>
    </div>
  );
};

export default Home;
