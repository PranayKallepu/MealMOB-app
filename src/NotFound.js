import React from 'react'
import Header from './components/Header'
import {  useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();
    const goHomeHandler = () =>{
        navigate('/home')
    }
  return (
    <>
      <Header />
    <div className='not-found-section'>
      <img src='https://cdni.iconscout.com/illustration/premium/thumb/not-found-7621869-6167023.png?f=webp' alt='not-found' />
      <button onClick={goHomeHandler}>Go back</button>
    </div>
    </>
  )
}

export default NotFound
