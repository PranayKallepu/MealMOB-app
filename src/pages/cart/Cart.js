import React, { useState, useEffect } from 'react';
import { API_URL } from "../../components/data";
// import './cart.css'

const Cart = ({ cart, setCart, handleChange }) => {
  const cartArray = cart;
  const [price, setPrice] = useState(0);

  const handlePrice = () => {
    let ans = 0;
    cartArray.forEach((item) => {
      ans += parseInt(item.price) ;
    });
    setPrice(ans);
  }

  const handleRemove = (id) => {
    const arr = cartArray.filter((item) => item._id !== id);
    setCart(arr);
  }

  useEffect(() => {
    handlePrice();
  }, [cartArray]);

  return (
    <article className='cart-container'>
      {cartArray.length === 0 ? (
        <div className="empty-cart">
          <img style={{width:'300px'}} src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png" alt='no-items-added' />
          <h3>No Items added</h3>
        </div>
      ) : (
        cartArray.map((item) => (
          <>
          <div className="cart_box" key={item._id}>
            <div className="cart_img">
              <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} />
            </div>

            <div className='details-sec'>
              <h4>{item.productName}</h4>
              <div className='handle-item'>
                <button className='plus' onClick={() => handleChange(item, +1)}> + </button>
                <span className='count'>{item.price}</span>
                <button className='minus' onClick={() => handleChange(item, -1)}> - </button>
              </div>
              <div className='remove-item'>
                <h4>₹{item.price}/-</h4>
                <button onClick={() => handleRemove(item._id)} >Remove</button>
              </div>
            </div>
          </div>
          <hr/>
          </>
        ))
      )}
      {cartArray.length > 0 && (
        <div className='total'>
          <span>Total Price of your Cart: </span>
          <h4>{price} Rs/-</h4>
        </div>
      )}
    </article>
  );
}

export default Cart;
