import Axios from 'axios';
import { toast } from 'react-toastify';
import { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true, error: '' };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false };

    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return { ...state, loadingDeliver: false, successDeliver: false };
    default:
      return state;
  }
};

function SalesDetailsPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
    successPay: false,
    loadingPay: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await Axios.get(`/api/sales/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate('/login');
    }
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchData();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }
    }
  }, [order, userInfo, orderId, navigate, successPay, successDeliver]);

  async function payOrderHandler() {
    try {
      dispatch({ type: 'PAY_REQUEST' });
      const { data } = await Axios.put(
        `/api/sales/${order._id}/pay`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'PAY_SUCCESS', payload: data });
      toast.success('¡Pedido ha sido pagado correctamente!');
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'PAY_FAIL' });
    }
  }
  async function deliverOrderHandler() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' });
      const { data } = await Axios.put(
        `/api/sales/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'DELIVER_SUCCESS', payload: data });
      toast.success('¡Pedido ha sido despachado correctamente!');
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'DELIVER_FAIL' });
    }
  }

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <div className="container">
        <section className="py-3 bg-light">
          <div class="row">
            <div className="col px-4 px-lg-5 py-lg-2 align-items-center">
              <div className="col-lg-12 text-center">
                <h1 className="h3 text-uppercase mb-3">Resumen de Venta</h1>
              </div>
            </div>
          </div>
          <div class="row">
            <div className="col px-4 px-lg-5 py-lg-2 align-items-center">
              <div className="col-lg-6">
                <p className="fw-bold text-uppercase mb-0">
                  Id venta:
                  <span className="text-muted small"> {orderId}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div className="col px-4 px-lg-5 py-lg-2 align-items-center">
              <div className="col-lg-12">
                <p className="text-uppercase mb-0 fw-bold">
                  Usuario:{' '}
                  <span className="text-muted small">
                    {order.user ? order.user.name : 'Default'}
                  </span>
                </p>
              </div>
            </div>
            <div className="col px-4 px-lg-5 py-lg-2 align-items-center">
              <div className="col-lg-12">
                <p className="fw-bold text-uppercase mb-0">
                  Fecha:
                  <span className="text-muted small">
                    {order.createdAt.substring(0, 10)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5">
          <div className="row">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <div className="card">
                <div className="card-body">
                  <h5>Datos de envio</h5>
                  <p className="card-text">
                    <strong>Nombre: </strong> {order.shippingAddress.fullName}{' '}
                    <br />
                    <strong>Dirección: </strong> {order.shippingAddress.address}
                    , {order.shippingAddress.city} <br />
                    <strong>Telefono: </strong> {order.shippingAddress.phone}{' '}
                    <br />
                  </p>
                  <p className="card-text">
                    {order.isDelivered ? (
                      <MessageBox variant="success">
                        Enviado el: {order.deliveredAt.substring(0, 10)}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">No despachado</MessageBox>
                    )}
                  </p>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-body">
                  <h5>Datos de Pago</h5>
                  <p className="card-text">
                    <strong>Metodo: </strong>{' '}
                    {order.shippingAddress.paymentMethodName} <br />
                  </p>
                  <p className="card-text">
                    {order.isPaid ? (
                      <MessageBox variant="success">
                        Pagado el: {order.paidAt.substring(0, 10)}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">Sin pago</MessageBox>
                    )}
                  </p>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-body">
                  <h5>Productos</h5>
                  <ul className="list-group list-group-flush">
                    {order.salesItems.map((item) => (
                      <li className="list-group-item" key={item._id}>
                        <div className="row align-items-center">
                          <div className="col-md-6 text-left">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="col-md-4 img-fluid rounded img-thumbnail"
                            ></img>
                            <Link
                              to={`/tienda/${item.slug}`}
                              className="col-md-8 ms-2"
                            >
                              {item.name}
                            </Link>
                          </div>
                          <div className="col-md-3 text-center">
                            <span>{item.quantity}</span>
                          </div>
                          <div className="col-md-3 text-center">
                            <span>{item.price.toLocaleString('co')}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 rounded-0 p-lg-4 bg-light">
                <div className="card-body">
                  <h5 className="text-uppercase mb-4">Total Venta</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex align-items-center justify-content-between">
                      <strong className="small fw-bold">Subtotal</strong>
                      <span className="text-muted small">
                        $ {order.itemsPrice.toLocaleString('co')}
                      </span>
                    </li>
                    <li className="border-bottom my-2"></li>
                    <li className="d-flex align-items-center justify-content-between">
                      <strong className="small fw-bold">Envío</strong>
                      <span className="text-muted small">
                        $ {order.shippingPrice.toLocaleString('co')}
                      </span>
                    </li>
                    <li className="border-bottom my-2"></li>
                    <li className="d-flex align-items-center justify-content-between">
                      <strong className="text-uppercase small fw-bold">
                        Total
                      </strong>
                      <span className="text-muted small">
                        $ {order.totalPrice.toLocaleString('co')}
                      </span>
                    </li>
                    {userInfo.isAdmin && !order.isPaid && (
                      <li className="align-items-center justify-content-between">
                        {loadingPay && <LoadingBox></LoadingBox>}
                        <div className="d-grid gap-2 mt-3">
                          <button
                            className="btn btn-warning"
                            type="button"
                            onClick={payOrderHandler}
                          >
                            Confirmar Pago
                          </button>
                        </div>
                      </li>
                    )}
                    {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                      <li className="align-items-center justify-content-between">
                        {loadingDeliver && <LoadingBox></LoadingBox>}
                        <div className="d-grid gap-2 mt-3">
                          <button
                            className="btn btn-warning"
                            type="button"
                            onClick={deliverOrderHandler}
                          >
                            Despachar Pedido
                          </button>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
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

export default SalesDetailsPage;
