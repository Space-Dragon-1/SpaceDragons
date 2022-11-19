import axios from "axios";
import { useEffect, useReducer } from "react";
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
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });
  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

      //setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
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
  );
}
export { ProductListCustomerPage };