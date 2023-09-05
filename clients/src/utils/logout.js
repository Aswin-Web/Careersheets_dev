
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'


const Logout = () => {
    const navigate = useNavigate();
    localStorage.removeItem('user');
    useEffect(() => {
        navigate("/");
        
        return 
            
        
    });
  return ;
}

export default Logout


