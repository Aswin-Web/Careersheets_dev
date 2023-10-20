import UseAuth from "../hooks/auth"; 
 const {token}=UseAuth()
 const config = {
   headers: {
     "Content-type": "application/json",
     Authorization: `Bearer ${token}`,
   },
 };
 
 export default config