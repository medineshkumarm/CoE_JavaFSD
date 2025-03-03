import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 149.99,
    url: "https://images.unsplash.com/photo-1641048930621-ab5d225ae5b0?q=80&w=2127&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    url: "https://images.unsplash.com/photo-1544117519-31a4b719223d?q=80&w=1952&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 79.99,
    url: "https://images.unsplash.com/photo-1582978571763-2d039e56f0c3?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Laptop Backpack",
    price: 59.99,
    url: "https://images.unsplash.com/photo-1667411425023-5cdf74d77ede?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 129.99,
    url: "https://images.unsplash.com/photo-1602025882379-e01cf08baa51?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    name: "Gaming Mouse",
    price: 49.99,
    url: "https://images.unsplash.com/photo-1619334084350-b093f0a9b40e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    name: "Portable SSD 1TB",
    price: 119.99,
    url: "https://images.unsplash.com/photo-1720048169387-84bbb8fd8ec9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    name: "4K Monitor",
    price: 299.99,
    url: "https://images.unsplash.com/photo-1711540846697-56b9f66d17f1?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
