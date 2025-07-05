import React from 'react';


function Cart({ cartItems, onRemoveFromCart }) {
  // Calculate total price of items in the cart
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto p-4 py-8 font-sans min-h-screen bg-gray-50">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">🛍️ Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        // Message when the cart is empty
        <div className="text-center text-gray-600 text-lg p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
          <p className="mb-4">Your cart is empty. Start adding some amazing products!</p>
          {/* You might add a link to the shop page here */}
          {/* <Link to="/" className="text-blue-600 hover:underline">Go to Shop</Link> */}
        </div>
      ) : (
        // Display cart items if there are any
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto">
          {cartItems.map((item, index) => (
            <div
              key={index} // Using index as key is okay for simple, non-reordered lists
              className="flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0"
            >
              <div className="flex-grow">
                <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                {/* Format price as Indian Rupees */}
                <p className="text-gray-700 mt-1">
                  Price: <span className="font-bold">₹{item.price.toFixed(2)}</span>
                </p>
              </div>
              <button
                onClick={() => onRemoveFromCart(index)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-sm ml-4"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Display total */}
          <div className="flex justify-end items-center mt-6 pt-4 border-t-2 border-gray-300">
            <h3 className="text-2xl font-bold text-gray-900">
              Total: <span className="text-blue-600">₹{total.toFixed(2)}</span>
            </h3>
            {/* You might add a checkout button here */}
            {/* <button className="ml-6 bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
              Proceed to Checkout
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
