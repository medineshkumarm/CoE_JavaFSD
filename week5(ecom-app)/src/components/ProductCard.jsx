import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 w-64">
      <div className="flex justify-center">
        <img
          className="object-cover w-full h-40 rounded-md"
          src={
            product.url ||
            "https://th.bing.com/th/id/OIP.B0v9iNWLyxUOHfbrL_voDwHaKg?w=197&h=280&c=7&r=0&o=5&pid=1.7"
          }
          alt={product.name}
        />
      </div>
      <h3 className="text-lg font-semibold mt-2 text-center">{product.name}</h3>
      <p className="text-gray-700 text-center">₹ {product.price.toFixed(2)}</p>
      <button
        onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
        className="btn-primary"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
