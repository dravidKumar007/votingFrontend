// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import './form.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
const [style, setStyle]=useState("none");
const [email, setEmail]=useState("");
const [password, setPassword]=useState("");
const [message, setMessage]=useState("error");
const login = (e)=>{

  e.preventDefault();

  var data ={
    email:email,
    password:password
  }
  console.log(data);
  axios.get("http://localhost:3000/api/users/login",{ params: data })
  .then((response)=>{
    console.log(response.data.name);
    localStorage.setItem('name', response.data.name);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    navigate('/')
  })
  .catch((err)=>{
    console.log(err.response.data.message || err.response.statusText);
    setMessage(err.response.data.message || err.response.statusText)
    setStyle('block');
  })
}

  return (
    <div className='border'>

<div style={{ 
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  zIndex: '1',
  position: 'absolute', 
  top: '0',
  left: '0',
  display:style
}}>
   
    <span className="dialogBox" >
      
      <h4>
        error
      </h4>

      <p>{message}</p>
      <div>

      <button onClick={()=>{setStyle("none")}}>
        Ok
      </button>
      </div>
      </span>
   
</div>


      <center>

        <form onSubmit={login}>

            <h1>Login</h1>
        <div className='form'>
            
            <label htmlFor="email">Email : </label>
      <input 
        type="email" 
        name="email" 
        className="label" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        />

      <label htmlFor="password">Password : </label>
      <input 
        type="password" 
        name="password" 
        className="label" 
        value={password} 
        width="10px"
        onChange={e => setPassword(e.target.value)} 
        />

        </div>
        <button className='submit'>Submit</button>

        </form>
        <p className='link'>
            Don&apos;t have an account <Link to="/signIn">SignIn</Link>
        </p>
      </center>
    </div>
  )
}

export default Login
