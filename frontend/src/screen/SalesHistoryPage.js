import React from 'react';
import axios from "axios";
import { useEffect, useReducer } from "react";
import { Link } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, sales: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function SalesHistoryPage() {
  const [{ loading, error, sales}, dispatch] = useReducer(reducer, {
    sales: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/sales");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);
  function totalValor(arr) {
    let result = 0;
    arr.map((ventas) => {
      let totalFac = ventas.totalPrice;
      result = result + totalFac
    })
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
                    <th className="border-0 p-3 text-center" scope="col">
                      <strong className="text-sm text-uppercase">
                        ID VENTA
                      </strong>
                    </th>
                    <th className="border-0 p-3 text-center" scope="col">
                      <strong className="text-sm text-uppercase">
                        FECHA
                      </strong>
                    </th>
                    <th className="border-0 p-3" scope="col">
                      <strong className="text-sm text-uppercase"></strong>
                    </th>
                    <th className="border-0 p-3 text-center" scope="col">
                      <strong className="text-sm text-uppercase">
                        VALOR
                      </strong>
                    </th>
                  </tr>
                </thead>
                <tbody className="border-0">
                  {sales.map((ventas) => (
                    <tr>
                      <td className="ps-0 py-3 border-light">
                        <div className="d-flex align-items-center">
                          <div className="ms-3">
                            <strong className="h6">
                              <Link className="reset-anchor animsition-link" to={`/ventas-realizadas/${ventas._id}`}>
                                <p>{ventas._id}</p>
                              </Link>
                            </strong>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 align-middle border-light text-center d-flex justify-content-center">
                        <p className="mb-0 small">{ventas.createdAt}</p>
                      </td>
                      <td className="p-3 align-middle border-light">
                        <div></div>
                      </td>
                      <td className="p-3 align-middle border-light text-center d-flex justify-content-center">
                        <p className="mb-0 small">
                          ${ventas.itemsPrice.toLocaleString('co')}
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
                      $ {totalValor(sales).toLocaleString('co')}
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