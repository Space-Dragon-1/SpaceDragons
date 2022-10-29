import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <React.Fragment>
      {/* <!--Navbar--> */}
      <header className="header bg-white">
        <div className="container px-lg-3">
          <nav className="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
            <a className="navbar-brand" href="/#">
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
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/tienda">
                    Tienda
                  </NavLink>
                </li>

                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    id="pagesDropdown"
                    to="/null"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Pages
                  </NavLink>
                  <div
                    className="dropdown-menu mt-3 shadow-sm"
                    aria-labelledby="pagesDropdown"
                  >
                    <NavLink
                      className="dropdown-item border-0 transition-link"
                      to="/"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      className="dropdown-item border-0 transition-link"
                      to="nuevo-producto"
                    >
                      Nuevo Producto
                    </NavLink>
                    <NavLink
                      className="dropdown-item border-0 transition-link"
                      to="/lista-productos-admin"
                    >
                      Lista Productos Admin
                    </NavLink>
                    <NavLink
                      className="dropdown-item border-0 transition-link"
                      to="ventas-realizadas"
                    >
                      Ventas Realizadas
                    </NavLink>
                  </div>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/carrito">
                    {" "}
                    <i className="fas fa-dolly-flatbed me-1 text-gray"></i>
                    Carrito
                    {/* <small className="text-gray fw-normal">(2)</small> */}
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    {" "}
                    <i className="fas fa-user me-1 text-gray fw-normal"></i>
                    Iniciar Sesión
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
}

export { Navbar };

