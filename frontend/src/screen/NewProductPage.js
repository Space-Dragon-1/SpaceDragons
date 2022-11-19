import axios from "axios";
import { useState } from "react";

function NewProductPage() {

  /* function BtnRegistrar() {
    let Id = document.getElementById("Id").value;
    let Name = document.getElementById("Name").value;
    let Description = document.getElementById("Description").value;
    let Precio = document.getElementById("Precio").value;
    let Stock = document.getElementById("Stock").value;

    if (
      Id === '' ||
      Name === '' ||
      Description === '' ||
      Stock === '' ||
      Precio === ''
    ) {
      alert('Complete los campos, por favor');
    } else {
      alert('Registro exitoso');
    }
  } */

  let [name, setName] = useState("");
  let [slug, setSlug] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState("");
  let [stock, setStock] = useState("");
  let [image, setImage] = useState(null);

  let onChangeName = (e) => {
    setName((name = e.target.value));
  };

  let onChangeSlug = (e) => {
    setSlug((slug = e.target.value));
  };

  let onChangeDescription = (e) => {
    setDescription((description = e.target.value));
  };

  let onChangePrice = (e) => {
    setPrice((price = e.target.value));
  };

  let onChangeStock = (e) => {
    setStock((stock = e.target.value));
  };

  let onChangeImage = (e) => {
    setImage(image = e.target.files[0])
    /* if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
     */
    console.log(image);
    //setImage((image = e.target.value));
  };

  let onSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData()
      form.append("name", name)
      form.append("slug", slug)
      form.append("description", description)
      form.append("price", price)
      form.append("stock", stock)
      form.append("image",image)

    
      let result = await axios
      .post("/admin/products", form,{
        headers:{
          "Content-Type": "multipart/form-data"
        }
      })
      console.log(result.response);
      /* if(result){
        alert("producto creado exitósamente")
      } */
    } catch (error) {
      console.error(error.response)
    }
    
  };
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
      <div className="py-5">
        <div className="row pb-5">
          <div className="col-lg-6 col-sm-6">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">slug</label>
                <input
                  className="form-control"
                  placeholder="slug"
                  type="text"
                  id="slug"
                  onChange={onChangeSlug}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre del producto</label>
                <input
                  className="form-control"
                  placeholder="Nombre del producto"
                  type="text"
                  id="Name"
                  onChange={onChangeName}
                />
              </div>
              <label className="form-label">Precio del producto</label>
              <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input
                  className="form-control"
                  placeholder="Precio del producto"
                  type="Number"
                  id="Precio"
                  onChange={onChangePrice}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cantidad del producto</label>
                <input
                  className="form-control"
                  placeholder="Cantidad del producto"
                  type="Number"
                  id="Stock"
                  onChange={onChangeStock}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción del producto</label>
                <textarea
                  className="form-control"
                  placeholder="Descripción del producto"
                  id="Description"
                  onChange={onChangeDescription}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Subir imagen del producto</label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/png, image/jpeg"
                  name="image"
                  onChange={onChangeImage}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" type="sumbit" id="BtnSave">
                  Guardar
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-6 col-sm-6">
            <img
              className="rounded mx-auto d-block img-fluid"
              alt="Imagen"
              src={image}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export { NewProductPage };
