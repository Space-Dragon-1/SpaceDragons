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
          <div className="container px-lg-3">
            <nav className="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
              <Link className="navbar-brand" to="/">
                <span className="fw-bold text-uppercase text-dark">
                  Space Shop
                </span>
              </Link>
              <button
                className="navbar-toggler navbar-toggler-end"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="index.html">
                      Home
                    </a>
                  </li>
                  <li classNameName="nav-item">
                    <a classNameName="nav-link" href="shop.html">
                      Shop
                    </a>
                  </li>
                  <li classNameName="nav-item">
                    <a classNameName="nav-link" href="detail.html">
                      Product detail
                    </a>
                  </li>
                  <li classNameName="nav-item dropdown">
                    <a
                      classNameName="nav-link dropdown-toggle"
                      id="pagesDropdown"
                      href="#"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Pages
                    </a>
                    <div
                      className="dropdown-menu mt-3 shadow-sm"
                      aria-labelledby="pagesDropdown"
                    >
                      <a
                        className="dropdown-item border-0 transition-link"
                        href="index.html"
                      >
                        Homepage
                      </a>
                      <a
                        className="dropdown-item border-0 transition-link"
                        href="shop.html"
                      >
                        Category
                      </a>
                      <a
                        className="dropdown-item border-0 transition-link"
                        href="detail.html"
                      >
                        Product detail
                      </a>

                      <a
                        className="dropdown-item border-0 transition-link"
                        href="checkout.html"
                      >
                        Checkout
                      </a>
                    </div>
                  </li>
                </ul>
                Name
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      <i className="fas fa-dolly-flatbed me-1 text-gray"></i>
                      Carrito
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#!">
                      {' '}
                      <i className="far fa-heart me-1"></i>
                      <small className="text-gray fw-normal"> (0)</small>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#!">
                      {' '}
                      <i clasName="fas fa-user me-1 text-gray fw-normal"></i>
                      Login
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
