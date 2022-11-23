import axios from 'axios';
import { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { MessageBox } from '../components/MessageBox';
import { Store } from '../Store';

export default function CartPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  var subTotal = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.stock < quantity) {
      window.alert('Lo sentimos. No hay tantas unidades disponibles.');
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/checkout');
  };
  return (
    <div>
      <div className="container">
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
              <div className="col-lg-12">
                <h1 className="h2 text-uppercase mb-0">Carrito</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5">
          <h2 className="h5 text-uppercase mb-4">Carrito de compras</h2>
          <div className="row">
            <div className="col-lg-8 mb-4 mb-lg-0">
              {cartItems.length === 0 ? (
                <MessageBox variant="info">
                  El carrito esta vacio.{'   '}
                  <Link className="text-dark" to="/tienda">
                    Ir a la tienda
                  </Link>
                </MessageBox>
              ) : (
                <div className="table-responsive mb-4">
                  <table className="table text-nowrap">
                    <thead className="bg-light">
                      <tr>
                        <th className="border-0 p-3" scope="col">
                          {' '}
                          <strong className="text-sm text-uppercase">
                            Producto
                          </strong>
                        </th>
                        <th className="border-0 p-3" scope="col">
                          {' '}
                          <strong className="text-sm text-uppercase">
                            Cantidad
                          </strong>
                        </th>
                        <th className="border-0 p-3" scope="col">
                          {' '}
                          <strong className="text-sm text-uppercase">
                            Precio
                          </strong>
                        </th>
                        <th className="border-0 p-3" scope="col">
                          {' '}
                          <strong className="text-sm text-uppercase"></strong>
                        </th>
                      </tr>
                    </thead>
                    {cartItems.map((item) => (
                      <tbody className="border-0" key={item._id}>
                        <tr>
                          <th className="ps-0 py-3 border-light" scope="row">
                            <div className="d-flex align-items-center">
                              <Link
                                className="reset-anchor d-block animsition-link"
                                to={`/product/${item.slug}`}
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  width="70"
                                />
                              </Link>
                              <div className="ms-3">
                                <strong className="h6">
                                  <Link
                                    className="reset-anchor animsition-link"
                                    to={`/tienda/${item.slug}`}
                                  >
                                    <p>{item.name}</p>
                                  </Link>
                                </strong>
                              </div>
                            </div>
                          </th>
                          <td className="p-3 align-middle border-light">
                            <div className="border d-flex align-items-center justify-content-between px-3">
                              <span className="small text-uppercase text-gray headings-font-family">
                                Cantidad
                              </span>
                              <div className="quantity">
                                <button
                                  className="dec-btn p-0"
                                  onClick={() =>
                                    updateCartHandler(item, item.quantity - 1)
                                  }
                                  disabled={item.quantity === 1}
                                >
                                  <i className="fas fa-caret-left"></i>
                                </button>
                                <input
                                  className="form-control form-control-sm border-0 shadow-0 p-0"
                                  type="text"
                                  value={item.quantity}
                                  onChange={(e) => item.quantity}
                                ></input>
                                <button
                                  className="inc-btn p-0"
                                  onClick={() =>
                                    updateCartHandler(item, item.quantity + 1)
                                  }
                                  disabled={item.quantity === item.stock}
                                >
                                  <i className="fas fa-caret-right"></i>
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 align-middle border-light">
                            <p className="mb-0 small">
                              ${item.price.toLocaleString('co')}
                            </p>
                          </td>
                          <td className="p-3 align-middle border-light">
                            <button
                              className="btn btn-danger rounded-pill"
                              onClick={() => removeItemHandler(item)}
                            >
                              <i className="fas fa-trash-alt small text-white"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              )}
              <div className="bg-light px-4 py-3">
                <div className="row align-items-center text-center">
                  <div className="col-md-6 mb-3 mb-md-0 text-md-start">
                    <Link
                      className="btn btn-link p-0 text-dark btn-sm"
                      to="/tienda"
                    >
                      <i className="fas fa-long-arrow-alt-left me-2"> </i>
                      Continuar comprando
                    </Link>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <button
                      className="btn btn-outline-dark btn-sm"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceder con el pago
                      <i className="fas fa-long-arrow-alt-right ms-2"></i>
                    </button>
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
                        Subtotal (
                        {cartItems.reduce((a, c) => a + c.quantity, 0)} items) :
                        <div className="border-bottom my-2"></div>${' '}
                        {subTotal.toLocaleString('co')}
                      </strong>
                      <span className="text-muted small"></span>
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
