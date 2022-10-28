import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/NavBar";
import CartScreen from "./screen/CartScreen";
import { HomePage } from "./screen/HomePage";
import { NewProductPage } from "./screen/NewProductPage";
import { NotFoundPage } from "./screen/NotFoundPage";
import { ProductListAdminPage } from "./screen/ProductListAdminPage";
import { ProductListCustomerPage } from "./screen/ProductListCustomerPage";
import SalesHistoryPage from "./screen/SalesHistoryPage";
import "./styles/app.css";

function App() {
  return (
    <div className="page-holder">
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nuevo-producto" element={<NewProductPage />} />
        <Route path="/lista-productos-admin" element={<ProductListAdminPage />} />
        <Route path="/ventas-realizadas" element={<SalesHistoryPage />} />
        <Route path="/tienda" element={<ProductListCustomerPage />} />
        <Route path="/carrito" element={<CartScreen />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
    
  );
}

export default App;
