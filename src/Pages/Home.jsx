import React from 'react';
import Banner from './Banner';

import { Outlet } from 'react-router-dom';
import FAQ from '../Component/FAQ';
import OnlineAdvantage from '../Component/OnlineAdvantage';
import About from '../Component/About';

const Home = () => {
    return (
        <div>
         
          <Banner></Banner>
          <About></About>
          <OnlineAdvantage></OnlineAdvantage>
            <FAQ></FAQ>
            
            
        </div>
    );
};

export default Home;