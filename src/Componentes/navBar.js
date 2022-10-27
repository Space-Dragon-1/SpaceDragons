import React from 'react'
import {styles} from '../styles/style.default.css'

function NavBar (prop){
  return (
  <div className="Cont">
    <React.Fragment>
      {/* <!--Navbar--> */}
      <header className="header bg-white">
        <div className="container px-lg-3">
          <nav className="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
            <a className="navbar-brand" href="index.html">
              <span className="fw-bold text-uppercase text-dark">
                SPACE SHOP
              </span>
            </a>
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
                  <a className="nav-link active" href="index.html">
                    Principal
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="shop.html">
                    Tienda
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="pagesDropdown"
                    href="/#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Páginas
                  </a>
                  <div
                    className="dropdown-menu mt-3 shadow-sm"
                    aria-labelledby="pagesDropdown"
                  >
                    <a
                      className="dropdown-item border-0 transition-link"
                      href="index.html"
                    >
                      Principal
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
                      Lista de prodctos
                    </a>
                    <a
                      className="dropdown-item border-0 transition-link"
                      href="cart.html"
                    >
                      Carrito de compras
                    </a>
                    <a
                      className="dropdown-item border-0 transition-link"
                      href="checkout.html"
                    >
                      Pagar
                    </a>
                  </div>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="cart.html">
                    {" "}
                    <i className="fas fa-dolly-flatbed me-1 text-gray"></i>
                    Carrito
                    {/* <small className="text-gray fw-normal">(2)</small> */}
                  </a>
                </li>
                
                <li className="nav-item">
                  <a className="nav-link" href="#!">
                    {" "}
                    <i className="fas fa-user me-1 text-gray fw-normal"></i>
                    Iniciar Sesión
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </React.Fragment>
  </div>
  )
}

export {NavBar}