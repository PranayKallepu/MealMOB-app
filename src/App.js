import React, { useState, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Cart from './components/Menu/Cart';

// ROUTES
import Dashboard from './Dashboard';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import ProductMenu from './components/Menu/ProductMenu';
import NotFound from './NotFound';

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
