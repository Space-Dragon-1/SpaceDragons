import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useReducer } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export function EditProductPage() {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/admin/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const updateProduct = async (id, product) => {
    try {
      const form = new FormData();
      for (let key in product) {
        console.log(key, product[key]);
        form.append(key, product[key]);
      }

      let result = await axios.put(`/admin/products/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.response) {
        toast.success("producto actualizado");
        console.log(result);
      }
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

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="alert alert-danger">{error}</MessageBox>
  ) : (
    <section className="py-5">
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
        <div className="row mb-5">
          <div className="col-lg-6 col-sm-6">
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
                await updateProduct(product._id, values);
                //navigate("/lista-productos-admin");
                actions.setSubmitting(false)
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
                  <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <LoadingBox/> : "Actualizar"}
                  </button>
                </Form>
              )}
            </Formik>
            {/* <form>
              <div className="mb-3">
                <label className="form-label">slug</label>
                <input
                  className="form-control"
                  placeholder={product.slug}
                  type="text"
                  id="slug"
                  defaultValue={product.slug}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre del producto</label>
                <input
                  className="form-control"
                  placeholder={product.name}
                  type="text"
                  id="Name"
                  defaultValue={product.name}
                />
              </div>
              <label className="form-label">Precio del producto</label>
              <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input
                  className="form-control"
                  placeholder={product.price}
                  type="Number"
                  id="Precio"
                  defaultValue={product.price}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cantidad del producto</label>
                <input
                  className="form-control"
                  placeholder={product.stock}
                  type="Number"
                  id="Stock"
                  defaultValue={product.stock}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción del producto</label>
                <textarea
                  className="form-control"
                  placeholder={product.description}
                  id="Description"
                  defaultValue={product.description}
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Subir imagen del producto</label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/png, image/jpeg"
                />
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  
                  type="submit"
                  id="BtnSave"
                >
                  Ingresar
                </button>
              </div>
            </form> */}
          </div>

          <div className="col-lg-6 col-sm-6 text-center">
            <img
              className="img-fluid img-edit mx-auto"
              src={product.image}
              alt={product.name}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
