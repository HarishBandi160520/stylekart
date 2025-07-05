import React from 'react';

function ProductCard({ product, onAddToCart, onDelete, isAdmin }) {
  return (
    <div className="border p-4 rounded shadow">
      <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="font-bold text-blue-600">₹{product.price}</p>

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onAddToCart(product)}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Add to Cart
        </button>

        {isAdmin && (
          <button
            onClick={() => onDelete(product.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}




export default ProductCard;
