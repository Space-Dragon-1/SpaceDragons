import React from "react";
import { Link } from "react-router-dom";
import productJson from "../data/products.json";

function CartScreen() {
  return (
    <div className="container">
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div className="col-lg-6">
              <h1 className="h2 text-uppercase mb-0">Carrito</h1>
            </div>
            <div className="col-lg-6 text-lg-end">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                  <li className="breadcrumb-item">
                    <Link to="/">Inicio</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Cart
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <h2 className="h5 text-uppercase mb-4">Carrito de compras</h2>
        <div className="row">
          <div className="col-lg-8 mb-4 mb-lg-0">
            <div className="table-responsive mb-4">
              <table className="table text-nowrap">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0 p-3" scope="col">
                      {" "}
                      <strong className="text-sm text-uppercase">
                        Product
                      </strong>
                    </th>
                    <th className="border-0 p-3" scope="col">
                      {" "}
                      <strong className="text-sm text-uppercase">Price</strong>
                    </th>
                    <th className="border-0 p-3" scope="col">
                      {" "}
                      <strong className="text-sm text-uppercase">
                        Quantity
                      </strong>
                    </th>
                    <th className="border-0 p-3" scope="col">
                      {" "}
                      <strong className="text-sm text-uppercase">Total</strong>
                    </th>
                    <th className="border-0 p-3" scope="col">
                      {" "}
                      <strong className="text-sm text-uppercase"></strong>
                    </th>
                  </tr>
                </thead>
                <tbody className="border-0">
                  {productJson.map((product) => (
                    <tr>
                      <th className="ps-0 py-3 border-light" scope="row">
                        <div className="d-flex align-items-center">
                          <Link
                            className="reset-anchor d-block animsition-link"
                            to={`/product/${product.slug}`}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              width="70"
                            />
                          </Link>
                          <div className="ms-3">
                            <strong className="h6">
                              <Link
                                className="reset-anchor animsition-link"
                                to={`/product/${product.slug}`}
                              >
                                <p>{product.name}</p>
                              </Link>
                            </strong>
                          </div>
                        </div>
                      </th>
                      <td className="p-3 align-middle border-light">
                        <p className="mb-0 small">${product.price}</p>
                      </td>
                      <td className="p-3 align-middle border-light">
                        <div className="border d-flex align-items-center justify-content-between px-3">
                          <span className="small text-uppercase text-gray headings-font-family">
                            Cantidad
                          </span>
                          <div className="quantity">
                            <button className="dec-btn p-0">
                              <i className="fas fa-caret-left"></i>
                            </button>
                            <input
                              className="form-control form-control-sm border-0 shadow-0 p-0"
                              type="text"
                              value="1"
                            />
                            <button className="inc-btn p-0">
                              <i className="fas fa-caret-right"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 align-middle border-light">
                        <p className="mb-0 small">$250</p>
                      </td>
                      <td className="p-3 align-middle border-light">
                        <a className="reset-anchor" href="#!">
                          <i className="fas fa-trash-alt small text-muted"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                  ;
                </tbody>
              </table>
            </div>
            <div className="bg-light px-4 py-3">
              <div className="row align-items-center text-center">
                <div className="col-md-6 mb-3 mb-md-0 text-md-start">
                  <a
                    className="btn btn-link p-0 text-dark btn-sm"
                    href="shop.html"
                  >
                    <i className="fas fa-long-arrow-alt-left me-2"> </i>
                    Continuar comprando
                  </a>
                </div>
                <div className="col-md-6 text-md-end">
                  <a
                    className="btn btn-outline-dark btn-sm"
                    href="checkout.html"
                  >
                    Proceder con el pago
                    <i className="fas fa-long-arrow-alt-right ms-2"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 rounded-0 p-lg-4 bg-light">
              <div className="card-body">
                <h5 className="text-uppercase mb-4">Total</h5>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-center justify-content-between">
                    <strong className="text-uppercase small font-weight-bold">
                      Subtotal
                    </strong>
                    <span className="text-muted small">$250</span>
                  </li>
                  <li className="border-bottom my-2"></li>
                  <li className="d-flex align-items-center justify-content-between mb-4">
                    <strong className="text-uppercase small font-weight-bold">
                      Total
                    </strong>
                    <span>$250</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default CartScreen;
