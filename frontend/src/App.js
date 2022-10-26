import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/app.css';
import { Navbar } from './components/navBar';
import ProductListAdmin from './screen/productListAdmin';
import CartScreen from './screen/CartScreen';

function App() {
  return (
    <div className="App">
      <div className="page-holder">
        <div className="container">
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/" element={<ProductListAdmin />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
