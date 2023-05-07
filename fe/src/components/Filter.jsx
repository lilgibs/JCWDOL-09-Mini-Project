import React, { useEffect, useState } from "react";
import axios from "axios";

function Filter({ onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5500/categories/");
      console.log(response);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const renderCategories = () => {
    return categories.map((category) => {
      return <option value={category.id}>{category.name}</option>;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ category, sortOrder });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-3/4 m-auto mt-5 flex flex-row justify-around items-center p-2 border border-gray-300 rounded-md shadow-md">
      <div>
        <p className="font-semibold">Cari Berdasarkan</p>
      </div>
      <div className="flex flex-row items-center gap-2">
        <p className="font-medium">Kategori</p>
        <select
          className="border p-2 rounded-md bg-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Default</option>
          {renderCategories()}
        </select>
      </div>
      <div className="flex flex-row items-center gap-2">
        <p className="font-medium text">Urutkan</p>
        <select
          className="border border-gray-300 p-2 rounded-md bg-white"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_high_to_low">Harga tertinggi</option>
          <option value="price_low_to_high">Harga terendah</option>
          <option value="name_a_to_z">Nama A - Z</option>
          <option value="name_z_to_a">Nama Z - A</option>
          <option value="most_sold">Terlaris</option>
        </select>
      </div>
      <div>
        <button
          className="bg-teal-400 text-white font-semibold p-2 px-4 rounded-sm hover:bg-teal-500 transition duration-100"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Filter;
