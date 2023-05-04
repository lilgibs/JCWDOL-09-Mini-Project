import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import UserProductEditModal from './UserProductEditModal';

function UserProductTable() {
  const [userProducts, setUserProducts] = useState([])
  const [productToEdit, setProductToEdit] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userToken = localStorage.getItem('user_token')
  const userGlobal = useSelector(state => state.user.user)

  function formatRupiah(number) {
    return number.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
  }

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

  const handleEditClick = (product) => {
    setProductToEdit(product);
    onOpen();
    console.log(productToEdit)
  };

  // Fungsi untuk mengupdate data produk
  const updateProduct = async (formData) => {
    const productId = formData.get('product_id')
    try {
      let response = await axios.patch(`http://localhost:5500/products/user/${productId}`, formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(response)
      fetchUserProducts();
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5500/products/user/${productId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      console.log(response)
      fetchUserProducts()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserProducts()
  }, [])


  return (
    <div className="container mx-auto px-4 mt-8">
      <h2 className="text-2xl font-bold mb-6">Produk</h2>
      <table className="w-full table-auto border-collapse border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Nama Produk</th>
            <th className="border border-gray-300 p-2">Harga</th>
            <th className="border border-gray-300 p-2">Gambar</th>
            <th className="border border-gray-300 p-2">Deskripsi</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Kategori</th>
            <th className="border border-gray-300 p-2">Aksi</th>
          </tr>
        </thead>
        {userProducts && userProducts.length > 0 ? (
          <tbody>
            {userProducts.map((product, index) => (
              <tr key={product.product_id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="border border-gray-300 p-2">{product.product_name}</td>
                <td className="border border-gray-300 p-2">{formatRupiah(product.price)}</td>
                <td className="border border-gray-300 p-2">{product.image}</td>
                <td className="border border-gray-300 p-2">{product.description}</td>
                <td className="border border-gray-300 p-2">{product.active ? 'Aktif' : 'Tidak Aktif'}</td>
                <td className="border border-gray-300 p-2">{product.category_name}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="bg-teal-500 font-semibold text-white py-1 px-2 rounded-md hover:bg-teal-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.product_id)}
                    className="bg-red-500 font-semibold text-white py-1 px-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          null
        )}
      </table>
      <UserProductEditModal isOpen={isOpen} onClose={onClose} product={productToEdit} onUpdate={updateProduct} />
    </div>
  );
}

export default UserProductTable