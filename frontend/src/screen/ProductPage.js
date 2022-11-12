import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.stock < quantity) {
      window.alert('Lo sentimos. No hay tantas unidades disponibles.');
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/carrito');
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <div className="product text-center">
        <section className="py-5">
          <div className="container">
            <div className="row mb-5">
              <div className="col-lg-6">
                <div className="row m-sm-0">
                  <div className="col-sm-2 p-sm-0 order-2 order-sm-1 mt-2 mt-sm-0 px-xl-2">
                    <img
                      className="img-fluid w-100"
                      src="../{product.image}"
                      alt={product.name}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <h1>{product.name}</h1>
                <p className="text-muted lead">
                  ${product.price.toLocaleString('co')}
                </p>
                <h4>Descripción del Producto</h4>
                <p className="text-sm mb-4">{product.description}</p>
                <div className="row align-items-stretch mb-4">
                  {product.stock > 0 ? (
                    <div className="row text-center">
                      <span className="ms-2 mb-3 btn text-bg-success">
                        Disponible
                      </span>
                      <div className="col-sm-6 pl-sm-0 mx-auto">
                        <button
                          className="btn btn-dark btn-block h-100 d-flex align-items-center justify-content-center px-3"
                          onClick={addToCartHandler}
                        >
                          Agregar al carrito
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span className="ms-2 btn text-bg-danger">
                      No Disponible
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductPage;
