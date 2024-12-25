import React from 'react';
import Banner from './Banner';

import FAQ from '../Component/FAQ';
import OnlineAdvantage from '../Component/OnlineAdvantage';
import About from '../Component/About';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div >
           <Helmet>
              <title>Home || CollabStudy</title>
            </Helmet>
         
          <Banner></Banner>
        <div className='space-y-8'>
        <About></About>
          <OnlineAdvantage></OnlineAdvantage>
            <FAQ></FAQ>
        </div>
            
            
        </div>
    );
};

export default Home;