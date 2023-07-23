import React from 'react'
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

const PrivateRoute = ({children})=> {
    const [loginEmail, setLoginEmail] = useState("");

  return loginEmail ? children : <Navigate to="/"/>
}
export default PrivateRoute;