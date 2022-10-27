import React from 'react';
import { Navbar } from './navBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Ventas from './reporteVentas';

function Body() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navbar />
        <Ventas/>
      </BrowserRouter>
    </div>
  );
}

export { Body };
