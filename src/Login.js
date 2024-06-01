import React, { useState, useContext } from 'react';
import axios from 'axios';
import { store } from './App';
import Nav from './Dashboard';
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';


const Login = () => {
    const [token, setToken] = useContext(store);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = e => {
        e.preventDefault();
        setLoading(true); // Set loading to true when form is submitted
        axios.post('https://mealmob-server.onrender.com/login', data)
            .then(res => {
                setToken(res.data.token);
                setError('');
                alert("Login successful!");
                setLoading(false); // Set loading to false after successful login
            })
            .catch(err => {
                setError('Invalid email or password');
                setLoading(false); // Set loading to false after error
            });
    };

    if (token) {
        localStorage.setItem('token', token);
        window.location.href = '/home'; // Force a page reload by setting the location
        return null; // Return null to stop rendering the component
    }

    return (
        <div>
            <Nav />
            <div className='login-section'>
                <form className='form-section' onSubmit={submitHandler} autoComplete='off'>
                    <h3>User Login</h3>
                    <input type="email" onChange={changeHandler} name='email' placeholder='Enter email*' /> <br />
                    <input type="password" onChange={changeHandler} name='password' placeholder='Password*' /> <br />
                    {error && <p style={{color:'red'}}>{error}</p>}
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
                    ) : (
                        <button className='btn' type="submit" value="Login">Login</button>
                    )}
                    <br />
                    <div className='line'><hr />
                    <p>OR</p>
                    <hr /></div>
                    <p style={{fontSize: '12px'}}>Don't have an account?
                        <Link to='/signup' className='link' style={{color:'lightblue', fontWeight:'600'}}> Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
