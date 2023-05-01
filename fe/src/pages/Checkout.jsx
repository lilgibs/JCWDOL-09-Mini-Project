import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, checkout } from "../features/cart/cartSlice";

function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleCheckout = async () => {
    try {
      // Kumpulkan data dari keranjang (cartItems)
      const items = cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      }));

      const orderData = { items };

      // Kirim data ke backend untuk diproses
      await dispatch(checkout(orderData));

      // Jika berhasil, tampilkan pesan sukses
      // Jika gagal, tampilkan pesan error
    } catch (error) {
      // Menangani error
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-semibold mt-6 mb-4">Checkout</h1>
      {/* Tampilkan ringkasan pesanan */}
      {/* Anda bisa menggunakan komponen atau logika yang sama seperti di halaman Cart untuk menampilkan ringkasan pesanan */}
      {/* Anda juga bisa menambahkan form untuk informasi pengiriman atau metode pembayaran di sini */}

      {/* Tampilkan daftar item di keranjang */}
      <ul>
        {cartItems.map((item) => (
          <li key={item.id_product}>
            {item.name} - {item.quantity} pcs - ${item.price * item.quantity}
          </li>
        ))}
      </ul>

      {/* Tampilkan total harga */}
      <h2>
        Total: $
        {cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )}
      </h2>

      <button
        className="bg-green-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-600 mt-6"
        onClick={handleCheckout}
      >
        Confirm Order
      </button>
    </div>
  );
}

export default Checkout;
