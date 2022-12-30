import './App.css';
import ProductCards from './components/ProductCard';
import { Routes, Route } from 'react-router-dom';
import Cart from './components/cart';

export const config = {
  endpoint: `https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`
};

function App() {
  return (
    <>
      {/* to route traffic in cart and product card component */}
      <Routes>
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Routes>
        <Route path="/" element={<ProductCards />} />
      </Routes>
    </>
  );
}

export default App;
