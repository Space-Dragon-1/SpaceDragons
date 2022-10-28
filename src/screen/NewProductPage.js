function NewProductPage() {
  function BtnRegistrar() {
    let Id = document.getElementById("Id").value;
    let Name = document.getElementById("Name").value;
    let Description = document.getElementById("Description").value;
    let Precio = document.getElementById("Precio").value;
    let Stock = document.getElementById("Stock").value;
    if (
      Id === "" ||
      Name === "" ||
      Description === "" ||
      Stock === "" ||
      Precio === ""
    ) {
      alert("Complete los campos, por favor");
    } else {
      alert("Registro exitoso");
    }
  }
  return (
    <div className="container">
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div className="col-lg">
              <h1 className="h1 text-uppercase mb-0">
                AGREGAR PROUCTOS - ADMINISTRADOR
              </h1>
            </div>
          </div>
        </div>
      </section>
      <div className="Contenedores bg-light col-lg container">
        <div className="row">
          <div className="col-lg-6 col-sm-6">
            <form>
              <div className="mb-3">
                <label className="form-label">Código del producto</label>
                <input
                  className="Id form-control"
                  placeholder="Código del producto"
                  type="Number"
                  id="Id"
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre del producto</label>
                <input
                  className="Name form-control"
                  placeholder="Nombre del producto"
                  type="text"
                  id="Name"
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción del producto</label>
                <input
                  className="Description form-control"
                  placeholder="Descripción del producto"
                  type="text"
                  id="Description"
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Precio del producto</label>
                <input
                  className="Precio form-control"
                  placeholder="Precio del producto"
                  type="Number"
                  id="Precio"
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Cantidad del producto</label>
                <input
                  className="Stock form-control"
                  placeholder="Cantidad del producto"
                  type="Number"
                  id="Stock"
                ></input>
              </div>
              <div className="mb-3">
                <label className="form-label">Subir imagen del producto</label>
                <input className="form-control" type="file" accept="image/png, image/jpeg"></input>
              </div>
              <div className="mb-3">
              <button className="btn btn-primary" onClick={BtnRegistrar} type="submit" id="BtnSave">
            Ingresar
          </button>
              </div>
            </form>
          </div>
          <div className="col-lg-6 col-sm-6">
            <div className="Image">
              <img
                className="rounded mx-auto d-block"
                alt="Imagen"
                src="https://play-lh.googleusercontent.com/pFP0zVCWof079KaI91C9-Kdxijg0K0YlTqov7aVb5aQztDKZPHjDamxSNsR5BC_z23Y"
              ></img>
            </div>
          </div>
        </div>
        <div className="BtnIngresar">
          
        </div>
      </div>
    </div>
  );
}

export { NewProductPage };

