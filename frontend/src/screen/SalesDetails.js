import React from 'react';
import axios from "axios";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, sale: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function SalesDetails() {
  let clientName = (id_client) => {
    let name = "";
    if (id_client !== "") {
      const fetchData = async () => {
        dispatch({ type: "FETCH_REQUEST" });
        try {
          const result = await axios.get(`/api/sales/id/client/${id_client}`);
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
          name = result.name
        } catch (err) {
          dispatch({ type: "FETCH_FAIL", payload: getError(err) });
        }
      };
      fetchData();
    }
    else {
      name = "No-name"
    }
    return name;
  }

  const params = useParams();
  const {_id} = params;

  const [{ loading, error, sale }, dispatch] = useReducer(reducer, {
    sale: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/admin/sales/id/${_id}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [_id]);

  return(
    <div className="container">
      <section className="py-3 bg-light">
        <div class="row">
          <div className="col px-4 px-lg-5 py-lg-2 align-items-center">
            <div className="col-lg-6">
              <h1 className="h4 text-uppercase mb-0">Cliente
                <p class="display-6">
                  {clientName("")}
                </p>
              </h1>
            </div>
          </div>
        </div>
        <div class="row">
          <div className="col px-4 px-lg-5 py-lg-2 align-items-center">
            <div className="col-lg-6">
              <h1 className="h4 text-uppercase mb-0">Id venta
                <p class="display-6">
                  {sale._id}
                </p>
              </h1>
            </div>
          </div>
          <div className="col px-4 px-lg-5 py-lg-2 align-items-center">
            <div className="col-lg-6">
              <h1 className="h4 text-uppercase mb-0">Fecha
                <p class="display-6">
                  {sale.date}
                </p>
              </h1>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="row">
          <div className="col-lg-8 mb-4 mb-lg-0">
            <div className="table-responsive mb-4">
              <table className="table text-nowrap text-center text-wrap" id="Products">
                <thead>
                  <tr>
                    <th className="border-0 p-3" scope="col" colSpan="2">
                      <strong className="text-uppercase">
                        Producto
                      </strong>
                    </th>
                    <th className="border-0 p-3" scope="col">
                      <strong className="text-uppercase">
                        Cantidad
                      </strong>
                    </th>
                    <th className="border-0 p-3" scope="col">
                      <strong className="text-uppercase">
                        Precio Unidad
                      </strong>
                    </th>
                  </tr>
                  <tr class="align-middle fila">
                    <td className="border-0 p-3 mb-0 small text-uppercase">
                      <img src="https://m.media-amazon.com/images/I/71D9ImsvEtL._UY500_.jpg" alt="Img product" height="120px" class="border rounded-top" />
                    </td>
                    <td className="mb-0 small p-3 align-middle border-light">
                      Tenis Nike Running
                    </td>
                    <td className="border-0 p-3 text-sm text-uppercase cantidad">
                      3
                    </td>
                    <td className="border-0 p-3 text-sm text-uppercase precio">
                      500000
                    </td>
                  </tr>
                </thead>
                <tbody className="border-0">
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 rounded-0 p-lg-4 bg-light">
              <div className="card-body">
                <h5 className="text-uppercase mb-4">Total venta</h5>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-center justify-content-between mb-4">
                    <span className="lead">

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

/*function finalCost() {
  let table = document.getElementById('Products')
  var total = 0;
  for (let i = 1; i < table.rows.length; i++) {
    let cantidad = parseInt(table.rows[i].cells[2].innerHTML)
    let precioU = parseInt(table.rows[i].cells[3].innerHTML)
    total = parseInt(total + (cantidad * precioU))
  }
  return total
}*/

export default SalesDetails;
