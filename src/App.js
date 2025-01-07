import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login/Login';

import GaunPage from './Pages/GaunPage';
import AddDress from './Components/ManageGaun/AddDress.jsx'
import EditGaun from './Components/ManageGaun/EditGaun';

import ManageUser from './Pages/ManageUser';
import ManageOrders from './Pages/ManageOrders';
import RatesPage from './Pages/RatesPage';
import OrdersHistory from './Pages/OrdersHistory';
import CalendarAdmin from './Pages/Calendar';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard/>}/>

        <Route path='/gaun-page' element={<GaunPage/>}/>
        <Route path="gaun-page/add-gaun" element={<AddDress/>} />
        <Route path="gaun-page/edit-gaun/:id" element={<EditGaun />} />

        <Route path='/manage-user' element={<ManageUser/>}/>
        <Route path='/manage-orders' element={<ManageOrders/>} />
        <Route path='/rates-page' element={<RatesPage/>} />
        <Route path='/orders-history' element={<OrdersHistory/>} />
        <Route path="/calendar" element={<CalendarAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
