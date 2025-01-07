import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import Grafik from '../Components/Grafik';
import axios from 'axios';

const Dashboard = () => {
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setAdminData(user);
        }
      }, []);
     
    


    return (
            <Layout>

                <div>

            <Grafik/>
            
            </div>

            </Layout>
            
    );
};

export default Dashboard;