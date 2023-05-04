import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, checkout } from "../features/cart/cartSlice";
import { formatRupiah } from "../utils/formatRupiah";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
    }
  }, [cartItems, navigate]);

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
    <div className="container mx-auto px-4 " style={{ width: '700px' }}>
      <h1 className="text-xl font-bold mt-6 mb-6 text-center">CHECKOUT</h1>

      <div className="flex flex-col bg-slate-50 mb-1 p-4 gap-2">
        {cartItems.map((item) => (
          <div className="flex justify-between"> {/* <-- Hapus w-full di sini */}
            <div className="flex flex-row"> {/* <-- Hapus justify-between di sini */}
              <p className="font-semibold">{item.name}</p>
            </div>
            <div className="flex flex-col justify-between"> {/* <-- Tambahkan justify-between di sini */}
              <p>{formatRupiah(item.price * item.quantity)}</p>
              <p className="text-sm text-right">{item.quantity} item(s)</p>
            </div>
          </div>
        ))}
      </div>


      <div className="flex justify-between bg-slate-50 mb-1 p-4">
        <p className="font-semibold">Total Amount</p>
        <p>
          {formatRupiah(cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          ))}
        </p>
      </div>

      <button
        className="bg-teal-400 text-white w-full py-3 font-semibold hover:bg-teal-500"
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
      >
        Confirm Order
      </button>
    </div>
  );
}

export default Checkout;
