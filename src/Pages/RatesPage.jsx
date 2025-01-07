import React from 'react';
import CustomTable from '../Components/Table';
import Layout from '../Components/Layout';

const columns = ['No', 'NamaCustomer', 'Pesanan', 'Total', 'Status', 'Action'];

const data = [
  {
  No: 1,
  NamaCustomer: 'john.doe@example.com',
  Pesanan: 'Admin',
  Total: ' ',
  Status: ' ',
  Action: ' ',
  }
]

const RatesPage = () => {
    return (
        <Layout>
    <div>
      <h1>Kelola Ulasan</h1>
      <CustomTable columns={columns} data={data} />
    </div>
    </Layout>
    );
};

export default RatesPage;