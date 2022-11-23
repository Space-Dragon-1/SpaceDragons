import Axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingBox } from '../components/LoadingBox';
import { Store } from '../Store';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function PaymentPage() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  cart.itemsPrice = cart.cartItems.reduce(
    (a, c) => a + c.quantity * c.price,
    0
  );
  cart.shippingPrice = cart.itemsPrice > 100000 ? 0 : 10000;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

  const paymentHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });

      const { data } = await Axios.post(
        '/api/sales',
        {
          salesItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          totalPrice: cart.totalPrice,
          user: userInfo._id,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log(cart.cartItems);
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/sales/${data.sales._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      alert(getError(err));
    }
  };

  useEffect(() => {
    if (!cart.shippingAddress.paymentMethodName) {
      navigate('/checkout');
    }
  }, [cart, navigate]);
  return (
    <div>
      <div className="container">
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
              <div className="col-lg-6">
                <h1 className="h2 text-uppercase mb-0">Procesar Orden</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5">
          <h2 className="h5 text-uppercase mb-4">Detalles de envío</h2>
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h5>Información de Envio</h5>
                  <p className="card-text">
                    <strong>Nombre: </strong> {cart.shippingAddress.fullName}{' '}
                    <br />
                    <strong>Dirección: </strong> {cart.shippingAddress.address},{' '}
                    {cart.shippingAddress.city} <br />
                    <strong>Telefono: </strong> {cart.shippingAddress.phone}{' '}
                    <br />
                  </p>
                  <Link className="btn btn-warning offset-md-11" to="/checkout">
                    Editar
                  </Link>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-body">
                  <h5>Información de Pago</h5>
                  <p className="card-text">
                    <strong>Metodo de pago: </strong>{' '}
                    {cart.shippingAddress.paymentMethodName}
                  </p>
                  <Link className="btn btn-warning offset-md-11" to="/checkout">
                    Editar
                  </Link>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-body">
                  <h5>Productos</h5>
                  <ul className="list-group list-group-flush">
                    {cart.cartItems.map((item) => (
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
                  <Link className="btn btn-warning offset-md-11" to="/carrito">
                    Editar
                  </Link>
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
                        $ {cart.itemsPrice.toLocaleString('co')}
                      </span>
                    </li>
                    <li className="border-bottom my-2"></li>
                    <li className="d-flex align-items-center justify-content-between">
                      <strong className="small fw-bold">Envío</strong>
                      <span className="text-muted small">
                        $ {cart.shippingPrice.toLocaleString('co')}
                      </span>
                    </li>
                    <li className="border-bottom my-2"></li>
                    <li className="d-flex align-items-center justify-content-between">
                      <strong className="text-uppercase small fw-bold">
                        Total
                      </strong>
                      <span className="text-muted small">
                        $ {cart.totalPrice.toLocaleString('co')}
                      </span>
                    </li>
                    <li className="d-flex align-items-center justify-content-between">
                      <button
                        className="btn btn-warning mt-3 offset-md-3"
                        type="button"
                        onClick={paymentHandler}
                        disabled={cart.cartItems.length === 0}
                      >
                        Finalizar Compra
                      </button>
                      {loading && <LoadingBox></LoadingBox>}
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
