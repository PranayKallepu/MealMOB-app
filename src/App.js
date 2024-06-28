import React, { useState, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './pages/home/Header';
import Cart from './pages/cart/Cart';

// ROUTES
import Dashboard from './pages/Authentication/Dashboard';
import Signup from './pages/Authentication/Signup';
import Login from './pages/Authentication/Login';
import Home from './pages/home/Home';
import ProductMenu from './pages/products/ProductMenu';
import NotFound from './pages/notfound/NotFound';

export const store = createContext();

const App = () => {
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);

  const handleClick = (item) => {
    let isPresent = false;
    console.log('itemID: ', item._id)
    cart.forEach((product) => {
      console.log('productID: ', product.id)
      if (item._id === product._id) {
        isPresent = true;
      }
    });

    if (isPresent) {
      setWarning(true);
			setTimeout(()=>{
				setWarning(false);
			}, 2000);
			return ;
    } else {
      setCart([...cart, item]);
      console.log(item)
    }
  };

  const handleChange = (item, d) =>{
		let ind = -1;
		cart.forEach((data, index)=>{
			if (data.id === item.id)
				ind = index;
		});
		const tempArr = cart;
		tempArr[ind].amount += d;
		
		if (tempArr[ind].amount === 0)
			tempArr[ind].amount = 1;
		setCart([...tempArr])
	}

  return (
    <div>
      <store.Provider value={[token, setToken]}>
        <React.Fragment>
          <section className='header-section'>
          <Header size={cart.length} />
            {warning && <div className="warning">Item is already in the cart</div>}
          </section>
        </React.Fragment>
        <Routes>
          <Route path='/cart' element={<Cart path='/cart' cart={cart} setCart={setCart} handleChange={handleChange}/>} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/products/:firmId' element={<ProductMenu handleClick={handleClick} cart={cart} />} />
        </Routes>
      </store.Provider>
    </div>
  );
};

export default App;
