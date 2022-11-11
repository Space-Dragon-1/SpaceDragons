import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';

function ProductCustomer(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
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
  return (
    <div className="product text-center">
      <div className="mb-3 position-relative">
        <Link className="d-block" to={`/tienda/${product.slug}`}>
          <img
            className="img-fluid w-100"
            src={product.image}
            alt={product.name}
          />
        </Link>
        <div className="product-overlay">
          <ul className="mb-0 list-inline">
            <li className="list-inline-item m-0 p-0">
              {product.stock > 0 ? (
                <button
                  className="btn btn-sm btn-dark"
                  onClick={() => addToCartHandler(product)}
                >
                  <span>Añadir al Carrito</span>
                </button>
              ) : (
                <span className="btn text-bg-danger">
                  Producto no disponible
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>
      <h6>
        {' '}
        <Link className="d-block text-dark" to={`/products/${product.slug}`}>
          {product.name}
        </Link>
      </h6>
      <p className="text-muted">${product.price.toLocaleString('co')}</p>
      <p className="text-muted">En Stock: {product.stock}</p>
    </div>
  );
}

export { ProductCustomer };
