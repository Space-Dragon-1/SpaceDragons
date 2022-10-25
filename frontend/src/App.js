import data from './data';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import './index.css';
import './css/bootstrap.min.css';
import './css/custom.css';
import './css/style.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">Space Shop</Link>
        </header>
        <main>
          <Routes>
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>

          <Link to="/cart">Carrito</Link>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
