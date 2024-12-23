import React, { useContext } from 'react';
import Navbar from '../Component/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Component/Footer';
import { AuthContext } from '../Authprovider/Authprovider';

const Mainlayout = () => {
    const { isDark,setIsDark } = useContext(AuthContext);
    return (
        
            <div className='' data-theme={isDark ? "dark" : "light"}  isChecked={isDark} handleChange={() => setIsDark(!isDark)}>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Mainlayout;