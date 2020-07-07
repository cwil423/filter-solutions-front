import React from 'react';
import Axios from 'axios';

const Login = () => {

  const loginHandler = () => {
    Axios.get('http://localhost:4000/oauth')
  }

  return ( 
    <h1 onClick={loginHandler} >Login</h1>

   );
}
 
export default Login;