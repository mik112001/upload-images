import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../Login/LoginValidation";
import axios from "axios";

const SignUp = () => {

    const [values,setValues] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();
    const[errors,setErrors] = useState({});
    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(Validation(values));
        setErrors(prevErrors => {
            if(prevErrors.username === "" && prevErrors.username === "") {
                axios.post('http://localhost:8081/signup', values)
                .then(res => {
                    navigate('/login');
                })
                .catch(err => console.log(err));
            }
            return prevErrors;
        })
    }

    return (
        <div className="wrapper signUp">
            <div className='form'>
                <h2 className="heading">CREATE AN ACCOUNT</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">UserName</label>
                        <input type='username' id="username" placeholder="Enter Username"
                         onChange={e => setValues({...values,username : e.target.value})}/>
                         {errors.username && <span className="btn-danger">{errors.username}</span> }
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>                     
                        <input type='password' placeholder="Enter Password" id="password" 
                         onChange={e => setValues({...values,password : e.target.value})}/>
                         {errors.password && <span className="btn-danger">{errors.password}</span>}
                    </div>
                    <button type="submit">SignUp</button>
                </form>
                <p>
                    Already have an account ? <Link to='/login'>Login</Link>
                </p>
            </div>
        </div>
    )
};

export default SignUp;
