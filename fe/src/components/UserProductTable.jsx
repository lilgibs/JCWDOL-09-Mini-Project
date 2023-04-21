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

  const deleteProduct = async(productId) => {
    try {
      const response = await axios.delete(`http://localhost:5500/products/user/${productId}`,{
        headers: {
          Authorization : `Bearer ${userToken}`
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
    <div className="flex mx-auto">
      <div className="flex-1 ml-5">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Nama Produk</th>
              <th className="border border-gray-300 p-2">Harga</th>
              <th className="border border-gray-300 p-2">Gambar</th>
              <th className="border border-gray-300 p-2">Deskripsi</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Kategori</th>
              <th colSpan='2' className="border border-gray-300 p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {userProducts.map((product) => (
              <tr key={product.product_id}>
                <td className="border border-gray-300 p-2">{product.product_name}</td>
                <td className="border border-gray-300 p-2">{product.price}</td>
                <td className="border border-gray-300 p-2">{product.image}</td>
                <td className="border border-gray-300 p-2">{product.description}</td>
                <td className="border border-gray-300 p-2">{product.active ? "Aktif" : "Tidak Aktif"}</td>
                <td className="border border-gray-300 p-2">{product.category_name}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className=' bg-cyan-500 text-white py-1 px-2 rounded-md hover:bg-cyan-600'
                  >
                    Edit
                  </button>
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => deleteProduct(product.product_id)}
                    className=' bg-rose-500 text-white py-1 px-2 rounded-md hover:bg-rose-600'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <UserProductEditModal isOpen={isOpen} onClose={onClose} product={productToEdit} onUpdate={updateProduct} />
      </div>
    </div>
  )
}

export default UserProductTable