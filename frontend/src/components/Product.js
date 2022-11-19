
import React from "react";
import { Link } from "react-router-dom";

export function Product(props) {
  

  const { product, handleDelete } = props;

  return (
    <div className="col-lg-3 col-sm-6">
      <div className="product text-center">
        <div className="mb-3 position-relative w-100">
          <Link className="d-block" to={`/lista-productos-admin/${product.slug}`}>
            <img
              className="img-fluid img-wrapper mx-auto"
              src={product.image}
              alt={product.name}
            />
          </Link>
          <div className="product-overlay">
            <ul className="mb-0 list-inline">
              <li className="list-inline-item m-0 p-0">
                <Link
                  className="btn btn-sm btn-outline-primary"
                  to={`/lista-productos-admin/${product.slug}`}
                >
                  <i className="far fa-edit"></i> Modificar
                </Link>
              </li>
              <li className="list-inline-item m-0 p-0">
                <button className="btn btn-sm btn-outline-danger" onClick={()=>handleDelete(product._id)} type="button" data-bs-toggle="modal" data-bs-target="#deleteModal">
                  <i className="far fa-trash-alt"></i> Eliminar
                </button>
              </li>
            </ul>
          </div>
        </div>
        <h6>
          {" "}
          <Link
            className="reset-anchor"
            to={`/lista-productos-admin/${product.slug}`}
          >
            {product.name}
          </Link>
        </h6>
        <p className="text-muted">${product.price.toLocaleString("co")}</p>
        <p className="text-muted">id: {product._id}</p>
        <p className="text-muted">Disponible: {product.stock}</p>
      </div>
    </div>
    
  );
}

