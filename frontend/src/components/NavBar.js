import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Store } from '../Store';

function Navbar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const logoutHandler = () => {
    ctxDispatch({ type: 'USER_LOGOUT' });
    localStorage.removeItem('userInfo');
  };
  return (
    <React.Fragment>
      {/* <!--Navbar--> */}
      <header className="header bg-white">
        <div className="container px-lg-3">
          <nav className="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
            <NavLink className="navbar-brand" to="/">
              <span className="fw-bold text-uppercase text-dark">
                SPACE SHOP
              </span>
            </NavLink>
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
                  {/* TODO: link está activo? */}
                  <NavLink className="nav-link" to="/">
                    Inicio
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
                    Admin
                  </NavLink>
                  <div
                    className="dropdown-menu mt-3 shadow-sm"
                    aria-labelledby="pagesDropdown"
                  >
                    <NavLink
                      className="dropdown-item border-0 transition-link"
                      to="/lista-productos-admin"
                    >
                      Todos los productos
                    </NavLink>
                    <NavLink
                      className="dropdown-item border-0 transition-link"
                      to="/nuevo-producto"
                    >
                      Agregar nuevo producto
                    </NavLink>
                    <NavLink
                      className="dropdown-item border-0 transition-link"
                      to="/ventas-realizadas"
                    >
                      Ventas
                    </NavLink>
                  </div>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/carrito">
                    <i className="fas fa-dolly-flatbed me-1 text-gray"></i>
                    Carrito
                    {cart.cartItems.length > 0 && (
                      <small className="ms-1 text-danger fw-normal">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </small>
                    )}
                  </NavLink>
                </li>
                {userInfo ? (
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      id="pagesDropdown"
                      to="/null"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {userInfo.name}
                    </NavLink>
                    <div
                      className="dropdown-menu mt-3 shadow-sm"
                      aria-labelledby="pagesDropdown"
                    >
                      <NavLink
                        className="dropdown-item border-0 transition-link"
                        to="#logout"
                        onClick={logoutHandler}
                      >
                        Cerrar sesion
                      </NavLink>
                    </div>
                  </li>
                ) : (
                  <li className="nav-item">
                    <NavLink className="nav-link" to={'/login'}>
                      {' '}
                      <i className="fas fa-user me-1 text-gray fw-normal"></i>
                      Iniciar Sesión
                    </NavLink>
                  </li>
                )}
                <li></li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
}

export { Navbar };
