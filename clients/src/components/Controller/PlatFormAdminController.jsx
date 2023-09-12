import jwt_decode from "jwt-decode";
import React from "react";

const PlatFormAdminController = (props) => {
  
    try {
     
        var decoded = jwt_decode(localStorage.getItem("admin"));
        if (decoded._id === "admin@gmail.com") {
          
          
          
          return props.children;

        } else {
          return;
        }
    } catch (error) {
        return null
    }
  
};

export default PlatFormAdminController