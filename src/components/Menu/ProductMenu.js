import React, { useState, useEffect } from "react";
import { API_URL } from "../data";
import { Link, useParams } from "react-router-dom";
import { MdStar } from "react-icons/md";
import { RotatingLines } from 'react-loader-spinner';
import Footer from "../Footer";
import { FaPlus } from "react-icons/fa";

const ProductMenu = ({ handleClick, cart }) => {
    const [collapse, setCollapse] = useState(false);
    const [btnShow, setBtnShow] = useState(true);

    const [products, setProducts] = useState([]);
    const [firmImage, setFirmImage] = useState('');
    const [rest, setRestName] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(true);

    const { firmId } = useParams();

    useEffect(() => {
        if (collapse) {
            setBtnShow(false);
        }
    }, [collapse]);

    const productHandler = async () => {
        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductData = await response.json();
            setFirmImage(newProductData.firmImage);
            setProducts(newProductData.products);
            setRestName(newProductData.restaurantName);
            setAddress(newProductData.address);
            setLoading(false);
        } catch (error) {
            console.error("Product failed to fetch", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        productHandler();
    }, [firmId]);
    const isItemInCart = (itemId) => {
        return cart.some(item => item._id === itemId);
    };

    return (
        <div>
            <section className="productSection">
                {loading ? (
                    <div className="loaderSection">
                        <div className="loader">Loading..</div>
                        <RotatingLines
                            visible={true}
                            height="36"
                            width="36"
                            color="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>
                ) : products.length === 0 ? (
                    <div className="empty-products">
                        No products available
                        <br />
                        <div className="back-button">
                            <Link to='/home'>
                                <button>Back</button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="">
                        <div className="rest-details">
                            <div>
                                <h1 >{rest}</h1>
                                <p style={{ color: 'gray' }}>{address}</p>
                                <div className="rating-box"><p>4.4</p><MdStar className="star" /> </div>
                            </div>
                            <div className="back-button">
                                <Link to='/home'>
                                    <button>Back</button>
                                </Link>
                            </div>
                        </div>
                        <section className="product-container">
                            {products.map((item) => (
                                <div key={item.id || item._id} className="product-box">
                                    <div className="image-div">                                        
                                        <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} />
                                         {isItemInCart(item._id) ?  
                                        <button onClick={() => handleClick(item)} className='addedButton'>ADDED</button>
                                        : 
                                        <button onClick={() => handleClick(item)} className="addButton">ADD <FaPlus /></button>
                                        }
                                        
                                         
                                    </div>
                                    <div className="details-div">
                                        <div style={{ fontWeight: '600' }}>{item.productName}</div>
                                        <div style={{ fontFamily: 'fantasy' }}>₹{item.price}/-</div>
                                        <p className={`long-text ${collapse ? "expanded" : ""}`}>{item.description}</p>
                                        {!collapse && btnShow && (
                                            <button className="read-btn" onClick={() => setCollapse((prev) => !prev)}>...read more</button>
                                        )}
                                        
                                    </div>
                                </div>
                            ))}
                        </section>
                        <div className="back-button">
                            <Link to='/home'>
                                <button style={{ textAlign: 'center' }}>Back</button>
                            </Link>
                        </div>
                    </div>
                )}
                <Footer />
            </section>
        </div>
    );
};

export default ProductMenu;
