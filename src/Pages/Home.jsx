import React from 'react';
import Banner from './Banner';

import FAQ from '../Component/FAQ';
import OnlineAdvantage from '../Component/OnlineAdvantage';
import About from '../Component/About';

const Home = () => {
    return (
        <div >
         
          <Banner></Banner>
        <div>
        <About></About>
          <OnlineAdvantage></OnlineAdvantage>
            <FAQ></FAQ>
        </div>
            
            
        </div>
    );
};

export default Home;