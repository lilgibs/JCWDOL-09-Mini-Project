import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserCategoryEditModal from './UserCategoryEditModal';

function UserCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryToEdit, setCategoryToEdit] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userToken = localStorage.getItem('user_token');

  const fetchCategories = async () => {
    let response = await axios.get('http://localhost:5500/categories/user', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response.data.data);
    setCategories(response.data.data);
    console.log(categoryToEdit)
  };

  const handleEditClick = (category) => {
    setCategoryToEdit(category);
    onOpen()
  }

  const updateCategory = async (updatedCategory) => {
    try {
      let response = await axios.patch(
        `http://localhost:5500/categories/user/${updatedCategory.id}`,
        updatedCategory,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const categoryDelete = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5500/categories/user/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5500/categories',
        { name: newCategoryName },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setNewCategoryName('')
      fetchCategories()
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 mt-8">
        <h2 className="text-2xl font-bold mb-6">Kategori</h2>
        <table className="w-full table-auto border-collapse border text-center border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">No</th>
              <th className="border border-gray-300 p-2">Nama Kategori</th>
              <th className="border border-gray-300 p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{category.name}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-teal-500 text-white py-1 px-2 rounded-md hover:bg-teal-600 mr-2"
                    onClick={() => handleEditClick(category)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => categoryDelete(category.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <UserCategoryEditModal isOpen={isOpen} onClose={onClose} category={categoryToEdit} onUpdate={updateCategory} />
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">Tambah Kategori</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Nama Kategori"
              />
              <button
                className="bg-teal-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                type="submit"
              >
                Tambah
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserCategories;
