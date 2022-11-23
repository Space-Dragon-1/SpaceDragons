import axios from 'axios';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import React, { useEffect, useReducer, useState } from 'react';
import { Heading } from '../components/Heading';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { Product } from '../components/Product';
import { getError } from '../utils';

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

export function ProductListAdminPage() {
  let [controlReload, setControlReload] = useState(false);
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    var fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/admin/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [controlReload]);

  const [id, setId] = useState('');

  const handleDelete = (id) => {
    setId(id);
    console.log('borrado', id);
  };

  const deleteProduct = async (id) => {
    try {
      console.log('delete', id);
      const result = await axios.delete(`/admin/products/${id}`);
      if (result) {
        console.log(result);
      }
      let myModalDelete = document.getElementById('deleteModal');
      let myModal = bootstrap.Modal.getInstance(myModalDelete);
      myModal.hide();
      setControlReload((controlReload = !controlReload));
    } catch (error) {
      console.error(error.response);
      alert('producto no encontrado');
    }
  };

  return (
    <div className="container">
      <div
        className="modal fade"
        id="deleteModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Eliminar Producto
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              ¿Está seguro que quiere eliminar este producto?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteProduct(id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Heading />
      <section className="py-5">
        <div className="col-lg-12 order-1 order-lg-2 mb-5 mb-lg-0">
          <div className="row mb-3 align-items-center"></div>
          <div className="row">
            {/* <!-- PRODUCT--> */}
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant="alert alert-danger">{error}</MessageBox>
            ) : (
              products.map((product) => (
                <Product
                  key={product.slug}
                  product={product}
                  handleDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
