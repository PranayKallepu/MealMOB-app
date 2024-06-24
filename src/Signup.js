import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Dashboard';
import { Link, useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';


const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Add loading state
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
        setLoading(true)
        axios.post('https://mealmob-server.onrender.com/register', data)
        .then(res => {
            setErrors({});
            if(res.data){
                alert("Registered Successfully")
                navigate('/login');
                setLoading(false)
            }
        })
        .catch(err => {
            setError('Enter the Details')
            setLoading(false)
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
                    {loading ? (
                    <div className="">
                        <p className="loader">Loading..</p>
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
                        <button className='btn' type="submit" value="signup" >Signup </button> 
                    )}
                    <p style={{fontSize: '12px'}}>Already have an account?
                        <Link to='/login' className='link' style={{color:'lightblue', fontWeight:'600'}}> Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup

