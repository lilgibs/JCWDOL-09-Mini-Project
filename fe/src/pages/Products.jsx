import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    let response = await axios.get("http://localhost:5500/products");
    console.log(response);
    setProducts(response.data.data);
  };
  const renderProducts = () => {
    return products.map((product) => {
      return (
        <tr>
          <td>{product.name}</td>
        </tr>
      );
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <table>{renderProducts()}</table>
      <div className="grid grid-cols-3 gap-10 m-auto w-3/4 mt-10"></div>;
    </div>
  );
}

export default Products;
