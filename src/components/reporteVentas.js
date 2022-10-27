import React from "react";
import { Link } from 'react-router-dom';
import ventasJson from '../data/ventas.json';

function Ventas (){
    return(
        <div>
        <div className="container">
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
              <div className="col-lg-6">
                <h1 className="h2 text-uppercase mb-0">Ventas</h1>
              </div>
              <div className="col-lg-6 text-lg-end">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                    <li className="breadcrumb-item">
                      <Link to="/">Inicio</Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5">
          <div className="row">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <div className="table-responsive mb-4">
              <div>
              <table className="table text-nowrap">
              <thead>
                    <tr>
                        <th className="border-0 p-3" scope="col">
                            <strong className="text-sm text-uppercase">
                            Fecha
                            </strong>
                      </th>
                      <th className="border-0 p-3" scope="col">
                        <strong className="text-sm text-uppercase">IdVenta</strong>
                      </th>
                      <th className="border-0 p-3" scope="col">
                        <strong className="text-sm text-uppercase"></strong>
                      </th>
                      <th className="border-0 p-3" scope="col">
                        <strong className="text-sm text-uppercase">
                          Valor
                        </strong>
                      </th>
                    </tr>
                  </thead>
                <tbody className="border-0">
                  {ventasJson.map((ventas) => (
                    <tr>
                      <th className="ps-0 py-3 border-light" scope="row">
                        <div className="d-flex align-items-center">
                          <Link
                            className="reset-anchor d-block animsition-link"
                            to={`/ventas/${ventas.slug}`}
                          >
                          </Link>
                          <div className="ms-3">
                            <strong className="h6">
                              <Link
                                className="reset-anchor animsition-link"
                                to={`/ventas/${ventas.slug}`}
                              >
                                <p>{ventas.fecha}</p>
                              </Link>
                            </strong>
                          </div>
                        </div>
                      </th>
                      <td className="p-3 align-middle border-light">
                        <p className="mb-0 small">{ventas.idVenta}</p>
                      </td>
                      <td className="p-3 align-middle border-light">
                        <div >
                        </div>
                      </td>
                      <td className="p-3 align-middle border-light">
                        <p className="mb-0 small">${ventas.valor}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
               </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 rounded-0 p-lg-4 bg-light">
                <div className="card-body">
                  <h5 className="text-uppercase mb-4">Total Ventas</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex align-items-center justify-content-between mb-4">
                      <span>$000000</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-light px-4 py-3">
            <div className="row align-items-center text-center">
                <div className="col-md-6 text-md-end">
                  <a className="btn btn-outline-dark btn-sm" href="checkout.html">
                    Calcular total
                    <i className="fas fa-long-arrow-alt-right ms-2"></i>
                  </a>
                </div>
            </div>
            </div>
          </div>
        </section>
        </div>
    </div>
    );
}
 export default Ventas