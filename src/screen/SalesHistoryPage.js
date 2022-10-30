import React from "react";
import { Link } from "react-router-dom";
import dataJson from "../data/sales.json";

function SalesHistoryPage() {
  function add(dataJson) {
    let result = 0;
    for (let i in dataJson) {
      result += parseInt(dataJson[i].valor);
    }
    return result;
  }

  return (
    <div className="container">
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div className="col-lg-6">
              <h1 className="h2 text-uppercase mb-0">Ventas</h1>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="row">
          <div className="col-lg-8 mb-4 mb-lg-0">
            <div className="table-responsive mb-4">
              <table className="table text-nowrap">
                <thead>
                  <tr>
                    <th className="border-0 p-3" scope="col">
                      <strong className="text-sm text-uppercase">Fecha</strong>
                    </th>
                    <th className="border-0 p-3" scope="col">
                      <strong className="text-sm text-uppercase">
                        IdVenta
                      </strong>
                    </th>
                    <th className="border-0 p-3" scope="col">
                      <strong className="text-sm text-uppercase"></strong>
                    </th>
                    <th className="border-0 p-3" scope="col">
                      <strong className="text-sm text-uppercase">Valor</strong>
                    </th>
                  </tr>
                </thead>
                <tbody className="border-0">
                  {dataJson.map((ventas) => (
                    <tr>
                      <th className="ps-0 py-3 border-light" scope="row">
                        <div className="d-flex align-items-center">
                          <Link
                            className="reset-anchor d-block animsition-link"
                            to={`/ventas/${ventas.slug}`}
                          ></Link>
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
                        <div></div>
                      </td>
                      <td className="p-3 align-middle border-light">
                        <p className="mb-0 small">
                          ${ventas.valor.toLocaleString("co")}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 rounded-0 p-lg-4 bg-light">
              <div className="card-body">
                <h5 className="text-uppercase mb-4">Total Ventas</h5>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-center justify-content-between mb-4">
                    <span className="lead">
                      ${add(dataJson).toLocaleString("co")}
                    </span>
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
export default SalesHistoryPage;
