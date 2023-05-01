import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, removeFromCart } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleDelete = (productId) => {
    dispatch(removeFromCart(productId))
  }

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  console.log("Cart Items: ", cartItems);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-semibold mt-6 mb-4">Cart</h1>
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
                <p className="text-gray-600">${item.price}</p>
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
        <Link to="/checkout">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-green-600 mt-6"
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Cart