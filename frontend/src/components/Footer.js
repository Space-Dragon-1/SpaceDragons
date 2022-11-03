function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="container py-4">
        <div className="row py-5">
          <div className="col-md-4 mb-3 mb-md-0">
            <h6 className="text-uppercase mb-3">Servicio al Cliente</h6>
            <ul className="list-unstyled mb-0">
              <li>
                <a className="footer-link" href="/#">
                  Ayuda &amp; Contáctanos
                </a>
              </li>
              <li>
                <a className="footer-link" href="/#">
                  Devoluciones &amp; Reembolsos
                </a>
              </li>
              <li>
                <a className="footer-link" href="#!">
                  Términos &amp; Condiciones
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <h6 className="text-uppercase mb-3">Compañia</h6>
            <ul className="list-unstyled mb-0">
              <li>
                <a className="footer-link" href="#!">
                  Qué Hacemos
                </a>
              </li>
              <li>
                <a className="footer-link" href="#!">
                  Servicios Disponibles
                </a>
              </li>
              <li>
                <a className="footer-link" href="#!">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="text-uppercase mb-3">Social media</h6>
            <ul className="list-unstyled mb-0">
              <li>
                <a className="footer-link" href="#!">
                  Twitter
                </a>
              </li>
              <li>
                <a className="footer-link" href="#!">
                  Instagram
                </a>
              </li>
              <li>
                <a className="footer-link" href="#!">
                  Tumblr
                </a>
              </li>
              <li>
                <a className="footer-link" href="#!">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-top pt-4">
          <div className="row">
            <div className="col-md-6 text-center text-md-start">
              <p className="small text-muted mb-0">&copy; 2022 SpaceDragons</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="small text-muted mb-0">
                Template designed by{" "}
                <a
                  className="text-white reset-anchor"
                  href="https://bootstrapious.com/p/boutique-bootstrap-e-commerce-template"
                >
                  Bootstrapious
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };

