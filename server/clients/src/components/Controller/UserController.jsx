import React, { useEffect } from 'react'
import UseAuth from '../../hooks/auth'
import { Navigate } from 'react-router-dom';
import { REACT_APP_CLIENT_URL } from "./../../config";

const UserController = (props) => {
    const {role,verification,name} = UseAuth();
    //const navigate = useNavigate();
    console.log("role", role);

    if ((role=== 'user' || role==='superuser') && verification=== true ){
      return props.children
    }   
    
    return <Navigate to="/" /> 
}

export default UserController;