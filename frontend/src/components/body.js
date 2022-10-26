import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './navBar';
import ProductListAdmin from '../screen/productListAdmin';
import CartScreen from '../screen/CartScreen';

function Body() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/" element={<ProductListAdmin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export { Body };
