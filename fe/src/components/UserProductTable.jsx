import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function UserProductTable() {
  const [userProducts, setUserProducts] = useState([])
  const userToken = localStorage.getItem('user_token')
  const userGlobal = useSelector(state => state.user.user)

  const fetchUserProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5500/products/user/', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(response.data.data);
      setUserProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProducts()
  }, [])


  return (
    <div className="container mx-auto flex flex-col">
      <div className="flex-1 ml-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Nama Produk</th>
              <th className="border border-gray-300 p-2">Harga</th>
              <th className="border border-gray-300 p-2">Kategori</th>
            </tr>
          </thead>
          <tbody>
            {userProducts.map((product) => (
              <tr key={product.id}>
                <td className="border border-gray-300 p-2">{product.name}</td>
                <td className="border border-gray-300 p-2">{product.price}</td>
                <td className="border border-gray-300 p-2">{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserProductTable