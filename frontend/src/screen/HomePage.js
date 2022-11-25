import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <section
        className="hero pb-3 bg-cover bg-center d-flex align-items-center"
        style={{ background: "url(hero-banner-alt.jpg)" }}
      >
        <div className="container py-5">
          <div className="row px-4 px-lg-5">
            <div className="col-lg-6">
              <p className="text-muted small text-uppercase mb-2">
                Los mejores productos
              </p>
              <h1 className="h2 text-uppercase mb-3">20% de descuento</h1>
              <Link className="btn btn-dark" to="/tienda">
                Visitar tienda
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center gy-3">
            <div className="col-lg-4">
              <div className="d-inline-block">
                <div className="d-flex align-items-end">
                  <svg className="svg-icon svg-icon-big svg-icon-light">
                    <use href="#delivery-time-1"> </use>
                  </svg>
                  <div className="text-start ms-3">
                    <h6 className="text-uppercase mb-1">Envío Gratis</h6>
                    <p className="text-sm mb-0 text-muted">
                      En compras mayores a $100.000
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="d-inline-block">
                <div className="d-flex align-items-end">
                  <svg className="svg-icon svg-icon-big svg-icon-light">
                    <use href="#helpline-24h-1"> </use>
                  </svg>
                  <div className="text-start ms-3">
                    <h6 className="text-uppercase mb-1">Servicio 24 x 7</h6>
                    <p className="text-sm mb-0 text-muted">
                      Compra a cualquier hora
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="d-inline-block">
                <div className="d-flex align-items-end">
                  <svg className="svg-icon svg-icon-big svg-icon-light">
                    <use href="#label-tag-1"> </use>
                  </svg>
                  <div className="text-start ms-3">
                    <h6 className="text-uppercase mb-1">Aprovecha</h6>
                    <p className="text-sm mb-0 text-muted">
                      Tenemos los mejores precios
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export { HomePage };

