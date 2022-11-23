import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/app.css';
import { Footer } from './components/Footer';
import { Navbar } from './components/NavBar';
import CartPage from './screen/CartPage';
import CheckoutPage from './screen/CheckoutPage';
import { EditProductPage } from './screen/EditProductPage';
import { HomePage } from './screen/HomePage';
import LoginPage from './screen/LoginPage';
import { NewProductPage } from './screen/NewProductPage';
import { NotFoundPage } from './screen/NotFoundPage';
import PaymentPage from './screen/PaymentPage';
import { ProductListAdminPage } from './screen/ProductListAdminPage';
import { ProductListCustomerPage } from './screen/ProductListCustomerPage';
import { ProductPage } from './screen/ProductPage';
import RegisterPage from './screen/RegisterPage';
import OrderDetailsPage from './screen/OrderDetailsPage';
import OrderHistoryPage from './screen/OrderHistoryPage';
import SalesDetailsPage from './screen/SalesDetailsPage';
import SalesHistoryPage from './screen/SalesHistoryPage';
import ProfilePage from './screen/ProfilePage';

function App() {
  return (
    <div className="page-holder">
      <BrowserRouter>
        <ToastContainer position="bottom-center" limit={1} />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="admin/new-product" element={<NewProductPage />} />
          <Route
            path="/admin/product-list"
            element={<ProductListAdminPage />}
          />
          <Route path="/admin/product/:slug" element={<EditProductPage />} />
          <Route path="/admin/sales" element={<SalesHistoryPage />} />
          <Route path="/admin/sales/:id" element={<SalesDetailsPage />} />
          <Route path="/tienda" element={<ProductListCustomerPage />} />
          <Route path="/tienda/:slug" element={<ProductPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order/:id" element={<OrderDetailsPage />} />
          <Route path="/my-orders" element={<OrderHistoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
