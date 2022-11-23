import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { LoadingBox } from "../components/LoadingBox";

export function NewProductPage() {
  //const navigate = useNavigate();

  const [product, setProduct] = useState({
    slug: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });

  /* let [name, setName] = useState("");
  let [slug, setSlug] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState("");
  let [stock, setStock] = useState("");
  let [image, setImage] = useState(null);

  let onChangeName = (e) => {
    setName(e.target.value);
  };

  let onChangeSlug = (e) => {
    setSlug(e.target.value);
  };

  let onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  let onChangePrice = (e) => {
    setPrice(e.target.value);
  };

  let onChangeStock = (e) => {
    setStock(e.target.value);
  };

  let onChangeImage = (e) => {
    setImage(e.target.files[0]);
    /* if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
     */ /*
    console.log(image);
    //setImage((image = e.target.value));
  };

  let onSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", name);
      form.append("slug", slug);
      form.append("description", description);
      form.append("price", price);
      form.append("stock", stock);
      form.append("image", image);

      let result = await axios.post("/admin/products", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.status === 200) {
        console.log(result);
        const toastTrigger = document.getElementById("liveToastBtn");
        const toastLiveExample = document.getElementById("liveToast");
        if (toastTrigger) {
          toastTrigger.addEventListener("click", () => {
            const toast = new bootstrap.Toast(toastLiveExample);
            toast.show();
          });
        }
      } else if (result.status === 409) {
        console.log(result);
        alert("ya existe este producto");
      }
    } catch (error) {
      console.error(error.response);
    }
  }; */

  const createProduct = async (product) => {
    try {
      const form = new FormData();
      for (let key in product) {
        form.append(key, product[key]);
      }

      await axios
        .post("/admin/products", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          toast.success("producto agregado");
          console.log(response.data);
        })
        .catch((error) => {
          toast.error("ya existe este producto");
          console.error(error.response);
        });

      /* if (result.response) {
        toast.success("producto agregado");
        console.log(result);
      } */
    } catch (error) {
      if (error.response) {
        toast.error("ya existe este producto");
        console.error(error.response);
      } else if (error.request) {
        toast.error("no hay respuesta del servidor");
        console.error(error.request);
      } else {
        toast.error("algo salió mal, intente de nuevo");
        console.error("Error", error.message);
      }
    }
  };

  return (
    <div className="container">
      <Toaster
        toastOptions={{
          success: {
            className: "bg-success bg-gradient text-white",
          },
          error: {
            className: "bg-danger bg-gradient text-white",
          },
        }}
      />

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row px-auto px-lg-5 py-lg-3 align-items-center">
            <div className="col-lg">
              <h1 className="h2 text-uppercase mb-0">
                nuevo producto - administrador
              </h1>
            </div>
          </div>
        </div>
      </section>
      <div className="py-5">
        <div className="row pb-5">
          <div className="col-lg-6 col-sm-6 mx-auto">
            {/* <form>
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
                <button
                  className="btn btn-primary"
                  type="button" onClick={onSubmit}
                  id="liveToastBtn"
                >
                  Guardar
                </button>
              </div>
            </form> */}

            <Formik
              initialValues={product}
              enableReinitialize
              validationSchema={Yup.object({
                slug: Yup.string().required("slug requerido"),
                name: Yup.string().required("nombre es requerido"),
                price: Yup.number().required("precio es requerido"),
                stock: Yup.number().required("la cantidad es requerida"),
                description: Yup.string().required("descripción requerida"),
              })}
              onSubmit={async (values, actions) => {
                await createProduct(values);
                actions.setSubmitting(false);
                actions.resetForm({
                  values: {
                    slug: "",
                    name: "",
                    price: "",
                    stock: "",
                    description: "",
                  },
                });
                //navigate("/lista-productos-admin");
              }}
            >
              {({ handleSubmit, setFieldValue, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">slug</label>
                    <Field
                      name="slug"
                      placeholder="slug"
                      className="form-control"
                    />
                    <ErrorMessage
                      component="div"
                      className="alert alert-danger"
                      role="alert"
                      name="slug"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nombre del producto</label>
                    <Field
                      name="name"
                      placeholder="Nombre del producto"
                      className="form-control"
                    />
                    <ErrorMessage
                      component="div"
                      className="alert alert-danger"
                      role="alert"
                      name="name"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Precio del producto</label>
                    <Field
                      name="price"
                      placeholder="Precio del producto"
                      className="form-control"
                    />
                    <ErrorMessage
                      component="div"
                      className="alert alert-danger"
                      role="alert"
                      name="price"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cantidad del producto</label>
                    <Field
                      name="stock"
                      placeholder="Cantidad del producto"
                      className="form-control"
                    />
                    <ErrorMessage
                      component="div"
                      className="alert alert-danger"
                      role="alert"
                      name="stock"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Descripción del producto
                    </label>
                    <Field
                      component="textarea"
                      name="description"
                      placeholder="Descripción del producto"
                      className="form-control"
                    />
                    <ErrorMessage
                      component="div"
                      className="alert alert-danger"
                      role="alert"
                      name="description"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Subir imagen del producto
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      accept="image/png, image/jpeg"
                      name="image"
                      onChange={(e) =>
                        setFieldValue("image", e.target.files[0])
                      }
                    />
                  </div>
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <LoadingBox /> : "Guardar"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
