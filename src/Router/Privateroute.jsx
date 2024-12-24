import React, {  useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContex } from '../Authprovider/Authprovider';
import Loading from '../Component/Loading';


const Privateroute = ({children}) => {
    const {user,loading} =useContext(AuthContex)
    const location = useLocation()
   
   
    
    if(loading){
       return <Loading></Loading>
    }
    if(user && user?.email){
       return children
    }
    return <>
    <Navigate state={location.pathname} to={"/login"}></Navigate>  
    </>          
};

export default Privateroute;