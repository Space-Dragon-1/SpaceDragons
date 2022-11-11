import React from 'react';
import { Link } from 'react-router-dom';

function Product(props) {
  const { product } = props;
  return (
    <div className="col-lg-3 col-sm-6">
      <div className="product text-center">
        <div className="mb-3 position-relative">
          <Link className="d-block" to={`/tienda/${product.slug}`}>
            <img className="img-fluid w-100" src={product.image} alt="..." />
          </Link>
          <div className="product-overlay">
            <ul className="mb-0 list-inline">
              <li className="list-inline-item m-0 p-0">
                <a className="btn btn-sm btn-outline-primary" href="cart.html">
                  <i className="far fa-edit"></i> Modificar
                </a>
              </li>
              <li className="list-inline-item m-0 p-0">
                <a className="btn btn-sm btn-outline-danger" href="#!">
                  <i className="far fa-trash-alt"></i> Eliminar
                </a>
              </li>
            </ul>
          </div>
        </div>
        <h6>
          {' '}
          <a className="reset-anchor" href="detail.html">
            {product.name}
          </a>
        </h6>
        <p className="text-muted">${product.price.toLocaleString('co')}</p>
        <p className="text-muted">Disponible: {product.stock}</p>
      </div>
    </div>
  );
}

export { Product };
