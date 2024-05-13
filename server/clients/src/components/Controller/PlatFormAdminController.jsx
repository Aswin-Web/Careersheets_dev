import jwt_decode from "jwt-decode";
import React from "react";
import { Navigate } from 'react-router-dom';

const PlatFormAdminController = (props) => {

    const { currentPath } = props;

    console.log("path", currentPath);

    var decodeLocal = localStorage.getItem("admin");

    if (decodeLocal !== 'null') {
      localStorage.setItem('unauthorizedPath',currentPath);
    }
    
    try {
        console.log("Decoded", localStorage.getItem("admin"));

        var decoded = jwt_decode(localStorage.getItem("admin"));
        
        if (decoded.role === "superuser") {
          
          return props.children;

        } else {
          return <Navigate to="/" />;
        }
        
    } catch (error) {
      return <Navigate to="/" />;
    }
  
};

export default PlatFormAdminController