import Axios from 'axios';
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
    default:
      return state;
  }
};

function OrderDetailsPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
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
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchData();
    }
  }, [order, userInfo, orderId, navigate]);

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
              <div className="col-lg-6">
                <p className="text-uppercase mb-0 fw-bold">
                  Cliente:{' '}
                  <span className="text-muted small">
                    {order.shippingAddress.fullName}
                  </span>
                </p>
              </div>
            </div>
            <div className="col px-4 px-lg-5 py-lg-2 align-items-center">
              <div className="col-lg-6">
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
                        Enviado el: {order.devliveredAt}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">No despachado</MessageBox>
                    )}
                  </p>
                </div>
              </div>
              <div class="card mb-3">
                <div class="card-body">
                  <h4 class="card-title">Información de pago</h4>
                  <p class="card-text">
                    <strong>Metodo de pago: </strong>{' '}
                    {order.shippingAddress.paymentMethodName}
                  </p>
                  {order.isPaid ? (
                    <MessageBox variand="success">
                      Orden cancelada el: {order.paidAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Pendiente de pago</MessageBox>
                  )}
                </div>
              </div>
              <div className="card">
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
                  <h5 className="text-uppercase mb-4">Resumen de su Orden</h5>
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

export default OrderDetailsPage;
