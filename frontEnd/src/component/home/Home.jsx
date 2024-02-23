import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FileUpload from '../FileUpload/FileUpload';
import './Home.css';

export default function Home() {

    const[auth, setAuth] = useState(false);
    const[name,setName] = useState('');
    const[message,setMessage] = useState('');
    
    axios.defaults.withCredentials = true;
    useEffect(() => {
       axios.get('http://localhost:8081')
       .then((res) => {
          if(res.data.Status === 'Success') {
            setAuth(true);
            setName(res.data.username);
          }
          else {
            setAuth(false);
            setMessage(res.data.Message);
          }
       })
    },[]);

    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
        .then((res) => {
            if(res.data.Status === 'Success') {
                location.reload(true);
            }
            else {
                alert("error");
            }
        })
        .catch(err => console.log(err));
    }

    return (   
        <div>
            {auth?
                <div>
                    <nav>
                        <h2 className='.heading'>Hello, {name}</h2>
                        <Link onClick={handleLogout} className=".logout">LogOut</Link>
                    </nav>
                    <FileUpload />
                </div>
                :
                <div>
                    <h3>{message}</h3>
                    <h3>Login Now</h3>
                    <Link to='/login'>Login</Link>
                </div>           
            }
        </div>
    )
};
