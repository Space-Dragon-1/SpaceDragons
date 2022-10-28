import React from "react";
import productJson from "../data/products.json";

function ProductCustomer() {
  return (
    <>
      {productJson.map((product) => {
        return (
          <div className="col-lg-3 col-sm-6 ">
            <div className="product text-center">
              <div className="mb-3 position-relative">
                <a className="d-block" href="detail.html">
                  <img
                    className="img-fluid w-100"
                    src={product.image}
                    alt="..."
                  />
                </a>
                <div className="product-overlay">
                  <ul className="mb-0 list-inline">
                    <li className="list-inline-item m-0 p-0">
                      <a class="btn btn-sm btn-dark" href="cart.html">
                        Añadir al Carrito
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <h6>
                {" "}
                <a className="reset-anchor" href="detail.html">
                  {product.name}
                </a>
              </h6>
              <p className="text-muted">
                ${product.price.toLocaleString("co")}
              </p>
              <p className="text-muted">Stock: {product.stock}</p>
              <p className="reset-anchor text-muted">
                {" "}
                <strong>Descripción:</strong> {product.description}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export { ProductCustomer };

