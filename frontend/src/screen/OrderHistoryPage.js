import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, sales: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function OrderHistoryPage() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, sales }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=/my-orders');
    }
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/sales/mine`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div className="container">
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div className="col-lg-6">
              <h1 className="h2 text-uppercase mb-0">Mis Compras</h1>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger"></MessageBox>
      ) : (
        <section className="py-5">
          <div className="row">
            <div className="col-lg-12 mb-4 mb-lg-0">
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
                      <th className="border-0 p-3 text-center" scope="col">
                        <strong className="text-sm text-uppercase">
                          VALOR
                        </strong>
                      </th>
                      <th className="border-0 p-3 text-center" scope="col">
                        <strong className="text-sm text-uppercase">
                          ENVÍO
                        </strong>
                      </th>
                      <th className="border-0 p-3 text-center" scope="col">
                        <strong className="text-sm text-uppercase">
                          ACCIONES
                        </strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-0">
                    {sales.map((sale) => (
                      <tr key={sale._id}>
                        <td className="ps-0 py-3 border-light text-center align-middle">
                          <div className="align-items-center">
                            <div className="ms-3">
                              <strong>
                                <Link
                                  className="reset-anchor animsition-link"
                                  to={`/order/${sale._id}`}
                                >
                                  <p>{sale._id}</p>
                                </Link>
                              </strong>
                            </div>
                          </div>
                        </td>
                        <td className="ps-0 py-3 border-light text-center align-middle">
                          <p className="mb-0 small">
                            {sale.createdAt.substring(0, 10)}
                          </p>
                        </td>
                        <td className="ps-0 py-3 border-light text-center align-middle">
                          <p className="mb-0 small">
                            ${sale.totalPrice.toLocaleString('co')}
                          </p>
                        </td>
                        <td className="ps-0 py-3 border-light text-center align-middle">
                          <p className="mb-0 small">
                            {sale.isDelivered ? (
                              <span>Enviado el: {sale.devliveredAt}</span>
                            ) : (
                              <span>No despachado</span>
                            )}
                          </p>
                        </td>
                        <td className="ps-0 py-3 border-light text-center align-middle">
                          <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={() => {
                              navigate(`/order/${sale._id}`);
                            }}
                          >
                            Detalle
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default OrderHistoryPage;
