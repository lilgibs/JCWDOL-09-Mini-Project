import axios from 'axios';
import React, { useEffect, useState } from 'react';

function UserCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  const userToken = localStorage.getItem('user_token');

  const fetchCategories = async () => {
    let response = await axios.get('http://localhost:5500/categories/user', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response.data.data);
    setCategories(response.data.data);
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

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5500/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setCategories(categories.filter((cat) => cat.id !== categoryId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="flex flex-col mx-auto">
        <div className="flex-1 ml-5">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2"></th>
                <th className="border border-gray-300 p-2">Nama Kategori</th>
                <th colSpan="2" className="border border-gray-300 p-2">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td></td>
                  <td className="border border-gray-300 p-2">{cat.name}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className="bg-cyan-500 text-white py-1 px-2 rounded-md hover:bg-cyan-600"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="bg-rose-500 text-white py-1 px-2 rounded-md hover:bg-rose-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FORM ADD CATEGORY */}
        <div className="flex flex-row w-full max-w-md mx-auto mt-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category-name"
              >
                Nama Kategori
              </label>
              <input
                className="shadow appearance-none border rounded w-full    py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="category-name"
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Nama Kategori"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Tambah Kategori
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserCategories;
