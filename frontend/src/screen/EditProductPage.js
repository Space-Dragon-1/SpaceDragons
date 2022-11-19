import axios from "axios";
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
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

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="alert alert-danger">{error}</MessageBox>
  ) : (
    <section className="py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-6 col-sm-6">
            <form>
              <div className="mb-3">
                <label className="form-label">slug</label>
                <input
                  className="form-control"
                  placeholder={product.slug}
                  type="text"
                  id="slug"
                  value={product.slug}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre del producto</label>
                <input
                  className="form-control"
                  placeholder={product.name}
                  type="text"
                  id="Name"
                  value={product.name}
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
                  value={product.price}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cantidad del producto</label>
                <input
                  className="form-control"
                  placeholder={product.stock}
                  type="Number"
                  id="Stock"
                  value={product.stock}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción del producto</label>
                <textarea
                  className="form-control"
                  placeholder={product.description}
                  id="Description"
                  value={product.description}
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
                  onClick=""
                  type="submit"
                  id="BtnSave"
                >
                  Ingresar
                </button>
              </div>
            </form>
          </div>

          <div className="col-lg-6 col-sm-6 text-center">
            <img
              className="img-fluid img-thumbnail"
              src={product.image}
              alt={product.name} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
