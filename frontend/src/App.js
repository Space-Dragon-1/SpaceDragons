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
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <div className="page-holder">
      <BrowserRouter>
        <ToastContainer position="top-center" limit={1} />
        <Navbar />
        <Routes>
          {/* General Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/tienda" element={<ProductListCustomerPage />} />
          <Route path="/tienda/:slug" element={<ProductPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />

          {/* Client Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <OrderHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />

          {/* Admin Routes */}
          <Route
            path="admin/new-product"
            element={
              <AdminRoute>
                <NewProductPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/product-list"
            element={
              <AdminRoute>
                <ProductListAdminPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/product/:slug"
            element={
              <AdminRoute>
                <EditProductPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/sales"
            element={
              <AdminRoute>
                <SalesHistoryPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/sales/:id"
            element={
              <AdminRoute>
                <SalesDetailsPage />
              </AdminRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
