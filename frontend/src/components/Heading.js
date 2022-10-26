import React from 'react';

function Heading() {
  return (
    <React.Fragment>
      {/* <!-- HERO SECTION--> */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div className="col-lg">
              <h1 className="h2 text-uppercase mb-0">
                Productos - Administrador
              </h1>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
export { Heading };
