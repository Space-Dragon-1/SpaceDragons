import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { Heading } from '../components/Heading';
import { Product } from '../components/Product';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductListAdminPage() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/tienda');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      //setProducts(result.data);
    };
    fetchData();
  }, []);
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="container">
      <Heading />
      <section className="py-5">
        <div className="col-lg-12 order-1 order-lg-2 mb-5 mb-lg-0">
          <div className="row mb-3 align-items-center">
            <div className="col-lg-6 mb-2 mb-lg-0">
              <p className="text-sm text-muted mb-0">
                Showing 1–12 of 53 results
              </p>
            </div>
            <div className="col-lg-6">
              <ul className="list-inline d-flex align-items-center justify-content-lg-end mb-0">
                <li className="list-inline-item text-muted me-3">
                  <a className="reset-anchor p-0" href="#!">
                    <i className="fas fa-th-large"></i>
                  </a>
                </li>
                <li className="list-inline-item text-muted me-3">
                  <a className="reset-anchor p-0" href="#!">
                    <i className="fas fa-th"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <select
                    className="selectpicker"
                    data-customclass="form-control form-control-sm"
                  >
                    <option value>Sort By </option>
                    <option value="default">Default sorting </option>
                    <option value="popularity">Popularity </option>
                    <option value="low-high">Price: Low to High </option>
                    <option value="high-low">Price: High to Low </option>
                  </select>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            {/* <!-- PRODUCT--> */}
            {products.map((product) => (
              <Product product={product}> </Product>
            ))}
            {/* <!-- PAGINATION--> */}
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center justify-content-lg-end">
                <li className="page-item mx-1">
                  <a className="page-link" href="#!" aria-label="Previous">
                    <span aria-hidden="true">«</span>
                  </a>
                </li>
                <li className="page-item mx-1 active">
                  <a className="page-link" href="#!">
                    1
                  </a>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="#!">
                    2
                  </a>
                </li>
                <li className="page-item mx-1">
                  <a className="page-link" href="#!">
                    3
                  </a>
                </li>
                <li className="page-item ms-1">
                  <a className="page-link" href="#!" aria-label="Next">
                    <span aria-hidden="true">»</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
}
export { ProductListAdminPage };
