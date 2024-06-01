import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Dashboard';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    })
    const changeHandler = e =>{
        setData({...data, [e.target.name]: e.target.value})
    }
    const submitHandler = e => {
        e.preventDefault();
        axios.post('https://mealmob-server.onrender.com/register', data)
        .then(res => {
            setErrors({});
            if(res.data){
                alert("Registered Successfully")
                navigate('/login');

            }
        })
        .catch(err => {
            setError('Enter the Details')
           if(err.response.data.errors){
            setErrors(err.response.data.errors);
           }else{
            setErrors({server: "Server Error"})
           }
        })
        
        
    }
    return (
        <div>
            <Nav />
            <div className='login-section'>
                <form className='form-section' onSubmit={submitHandler} autoComplete='off'>
                    <h3>Sign Up</h3>
                    <input type="text" onChange={changeHandler} name='username' placeholder='User Name*' /> <br />
                    {errors.username && <p className="error">{errors.username}</p>} <br />
                    <input type="email" onChange={changeHandler} name='email' placeholder='Email*' /> <br />
                    {errors.email && <p className="error">{errors.email}</p>} <br />
                    <input type="password" onChange={changeHandler} name='password' placeholder='Password*' /> <br />
                    {errors.password && <p className="error">{errors.password}</p>} <br />
                    <input type="password" onChange={changeHandler} name='confirmpassword' placeholder='Confirm Password*' /> <br />
                    {error && <p className='error'>{error}</p>} <br />
                    <button className='btn' type="submit" value="Login" >Signup </button> <br />
                    <p style={{fontSize: '12px'}}>Already have an account?
                        <Link to='/login' className='link' style={{color:'lightblue', fontWeight:'600'}}> Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup

