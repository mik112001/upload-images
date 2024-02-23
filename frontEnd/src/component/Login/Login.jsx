import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import Validation from "./LoginValidation";

const Login = () => {
    const [values,setValues] = useState({
        username: '',
        password: ''
    });
    const[errors,setErrors] = useState({});
    const navigate = useNavigate();
   
    axios.defaults.withCredentials = true;

    const handelSubmit = (e) => {
        e.preventDefault();
        setErrors(Validation(values));
        setErrors(prevErrors => {
            if (prevErrors.username === "" && prevErrors.password === "") {
                axios.post('http://localhost:8081/login', values)
                .then(res => {
                    if(res.data.Status ==='Success') {
                        navigate('/');
                    } else {
                        alert(res.data.Message);
                    }
                })
                .catch(err => console.log(err));
            }
            return prevErrors;
        });
    }

    return  (
        <div className="wrapper signIn">
            <div className='form'>
                <h2 className="heading">SIGN-IN</h2>
                <form onSubmit={handelSubmit}>
                    <div>
                        <label htmlFor="username">UserName</label>
                        <input type='username' id="username" placeholder="Enter Username"
                          onChange={e => setValues({...values,username : e.target.value})} />
                        {errors.username && <span>{errors.username}</span> }
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>                     
                        <input type='password' placeholder="Enter Password" id="password" 
                          onChange={e => setValues({...values,password : e.target.value})} />
                        {errors.password && <span>{errors.password}</span> }
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>
                   Don't have an account ? <Link to='/signup'>Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;