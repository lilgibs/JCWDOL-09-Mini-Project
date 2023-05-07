import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import UserProductEditModal from './UserProductEditModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userProducts &&
          userProducts.map((product) => (
            <div
              key={product.product_id}
              className="bg-white border shadow-md rounded-md p-4"
            >
              <div className="h-40 w-full overflow-hidden relative">
                <img
                  src={`http://localhost:5500/` + product.image}
                  alt=""
                  className="w-full h-full object-cover absolute top-0"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{product.product_name}</h3>
                <p className="text-gray-700">{formatRupiah(product.price)}</p>
                <p className="text-sm text-gray-600 truncate">
                  {product.description}
                </p>
                <p className="text-gray-700">
                  Status: {product.active ? "Aktif" : "Tidak Aktif"}
                </p>
                <p className="text-gray-700">
                  Kategori: {product.category_name}
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleEditClick(product)}
                  className="bg-teal-500 font-semibold text-white py-1 px-2 rounded-md hover:bg-teal-600 mr-2"
                >
                  <FontAwesomeIcon icon={faPenToSquare} /> Edit
                </button>
                <button
                  onClick={() => deleteProduct(product.product_id)}
                  className="bg-red-500 font-semibold text-white py-1 px-2 rounded-md hover:bg-red-600"
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      <UserProductEditModal
        isOpen={isOpen}
        onClose={onClose}
        product={productToEdit}
        onUpdate={updateProduct}
      />
    </div>
  );
}

export default UserProductTable