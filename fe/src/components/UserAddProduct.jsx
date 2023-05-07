import axios from "axios";
import React, { useEffect, useState } from "react";

function AddProductForm() {
  const [userCategories, setUserCategories] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(null);

  const userToken = localStorage.getItem("user_token");

  const resetForm = () => {
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setProductCategory("");
    setProductImage(null);
  }

  const addProduct = async (productData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(
      "http://localhost:5500/products/",
      productData,
      config
    );
    console.log(response.data);
  };

  const userFetchCategories = async () => {
    try {
      let response = await axios.get(`http://localhost:5500/categories/user`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(response.data.data);
      setUserCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const productData = new FormData();
      productData.append("name", productName);
      productData.append("price", parseInt(productPrice));
      productData.append("description", productDescription);
      productData.append("id_category", parseInt(productCategory));
      productData.append("image", productImage);

      await addProduct(productData);
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    userFetchCategories();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="product-name"
        >
          Nama Produk
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="product-name"
          type="text"
          placeholder="Nama Produk"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="product-price"
        >
          Harga Produk
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="product-price"
          type="number"
          placeholder="Harga Produk"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="product-description"
        >
          Deskripsi Produk
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="product-description"
          placeholder="Deskripsi Produk"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="product-category"
        >
          Kategori Produk
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="product-category"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        >
          <option value="">Pilih Kategori Produk</option>
          {userCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="product-image"
        >
          Gambar Produk
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="product-image"
          type="file"
          accept="image/*"
          onChange={(e) => setProductImage(e.target.files[0])}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-teal-400 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Tambah Produk
        </button>
      </div>
    </form>
  );
}

export default AddProductForm;
