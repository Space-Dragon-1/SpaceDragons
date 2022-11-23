import axios from "axios";
import { useEffect, useReducer, useCallback } from "react";
import { useParams } from "react-router-dom";
import { LoadingBox } from "../components/LoadingBox.js";
import { MessageBox } from "../components/MessageBox";
import { ProductCustomer } from "../components/ProductCustomer";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductListCustomerPage() {
  const params = useParams();
  const {slug} = params;

  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
  //const [products, setProducts] = useState([]);
  const search = useCallback(() => {
    var fetchData = async () => {
      var result;
      var searcher = document.getElementById('buscador').value;
      dispatch({ type: "FETCH_REQUEST" });
      try {
        if (searcher === ""){
          result = await axios.get("/api/products");
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
        else if (searcher !== "") {
          result = await axios.get(`/api/products/${searcher}`);
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
      //setProducts(result.data);
    };
    fetchData();
  }, [slug]);
  useEffect (() => {
    search()
  }, [search])
  return (
    <div>
      <div className="container"> 
        <div class="input-group input-group-lg">
          <span class="input-group-text">Buscar por nombre:</span>
          <input type="text" class="form-control" id="buscador" onKeyUp={search}/>
        </div>
      </div>
      <div className="container">
        <section className="py-5">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div className="row">
              {products.map((product) => (
                <div className="col-lg-3 col-sm-6 " key={product.slug}>
                  <ProductCustomer product={product}> </ProductCustomer>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
export { ProductListCustomerPage };