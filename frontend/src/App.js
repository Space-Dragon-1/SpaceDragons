
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/NavBar";
import CartScreen from "./screen/CartScreen";
import { EditProductPage } from "./screen/EditProductPage";
import { HomePage } from "./screen/HomePage";
import { NewProductPage } from "./screen/NewProductPage";
import { NotFoundPage } from "./screen/NotFoundPage";
import { ProductListAdminPage } from "./screen/ProductListAdminPage";
import { ProductListCustomerPage } from "./screen/ProductListCustomerPage";
import SalesHistoryPage from "./screen/SalesHistoryPage";
import "./styles/app.css";
import LoginPage from './screen/LoginPage';

function App() {
  return (
    <div className="page-holder">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nuevo-producto" element={<NewProductPage />} />
          <Route
            path="/lista-productos-admin"
            element={<ProductListAdminPage />}
          />
          <Route
            path="/lista-productos-admin/:slug"
            element={<EditProductPage />}
          />
          <Route path="/ventas-realizadas" element={<SalesHistoryPage />} />
          <Route path="/tienda" element={<ProductListCustomerPage />} />
          <Route path="/tienda/:slug" element={<ProductPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
