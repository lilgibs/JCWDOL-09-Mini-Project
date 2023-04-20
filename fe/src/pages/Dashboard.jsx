import axios from 'axios'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components';
import UserProductTable from '../components/UserProductTable';
import UserAddProduct from '../components/UserAddProduct';

function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState('products');

  const userToken = localStorage.getItem('user_token')
  const userGlobal = useSelector(state => state.user.user)

  const navigate = useNavigate()

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  }, [localStorage.getItem("user_token")]);

  return (
    <>
      <div className="flex ">
        <Sidebar setSelectedComponent={setSelectedComponent} />

        {selectedComponent === 'addProduct' ? (
          <div>
            <h1 className="text-center text-2xl font-bold mt-8 mb-4">Tambah Produk</h1>
            <UserAddProduct />
          </div>
        ) : null}

        {selectedComponent === 'products' ? (
          <div>
            <h2 className="text-center text-xl font-bold mt-8 mb-4">Produk Saya</h2>
            <UserProductTable />
          </div>
        ) : null}

      </div>
    </>
  );
}

export default Dashboard