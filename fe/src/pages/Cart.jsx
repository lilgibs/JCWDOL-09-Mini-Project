import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, removeFromCart } from '../features/cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const userToken = localStorage.getItem('user_token')

  function formatRupiah(number) {
    return number.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });
  }

  const handleDelete = (productId) => {
    dispatch(removeFromCart(productId))
  }

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout');
    }
  }

  useEffect(() => {
    if (!userToken) {
      navigate("/login")
    }
  },[])

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  console.log("Cart Items: ", cartItems.length);

  return (
    <div className="container mx-auto w-3/4">
      <h1 className="text-xl font-bold mt-6 mb-6 text-center">CART</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cartItems.map((item) => (
          <div key={item.id_product} className="border rounded-md p-4">
            <div className="flex items-center">
              <img
                src={`http://localhost:5500/${item.image}`}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold mb-1">{item.name}</h2>
                <p className="text-gray-600">{formatRupiah(item.price)}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-row justify-between">
              <div>
                <label htmlFor={`quantity-${item.id_product}`} className="font-semibold">
                  Quantity:
                </label>
                <input
                  id={`quantity-${item.id_product}`}
                  type="number"
                  min="1"
                  value={item.quantity}
                  className="w-16 ml-2 border border-gray-300 rounded-md"
                  readOnly
                />
              </div>
              <div>
                <button
                  className=' bg-red-500 text-white py-1 px-2 rounded-md font-semibold hover:bg-red-600'
                  onClick={() => handleDelete(item.id_product)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center'>
        <button
          className={`bg-teal-400 text-white py-2 px-4 rounded-sm font-semibold hover:bg-teal-500 mt-6 disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed`}
          disabled={cartItems.length === 0}
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart