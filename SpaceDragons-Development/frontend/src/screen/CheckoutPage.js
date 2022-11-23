import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [phone, setPhone] = useState(shippingAddress.phone || '');
  const [paymentMethodName, setPaymentMethod] = useState(
    shippingAddress.paymentMethodName || 'Efectivo'
  );
  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=/checkout');
    }
  }, [userInfo, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_CHECKOUT',
      payload: {
        fullName,
        address,
        city,
        phone,
        paymentMethodName,
      },
    });
    localStorage.setItem(
      'shippingAdress',
      JSON.stringify({
        fullName,
        address,
        city,
        phone,
        paymentMethodName,
      })
    );
    navigate('/payment');
  };
  return (
    <div>
      <div className="container">
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
              <div className="col-lg-6">
                <h1 className="h2 text-uppercase mb-0">Verificar Orden</h1>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5">
          <div className="row justify-content-md-center">
            <div className="col-lg-8">
              <h2 className="h5 text-uppercase mb-4">Detalles de envío</h2>
              <form onSubmit={submitHandler}>
                <div className="row gy-3">
                  <div className="col-lg-12">
                    <label className="form-label text-sm text-uppercase">
                      Nombre completo
                    </label>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      id="Name"
                      placeholder="Nombre completo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    ></input>
                  </div>
                  <div className="col-lg-12">
                    <label className="form-label text-sm text-uppercase">
                      Dirección
                    </label>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      id="address"
                      placeholder="Dirección de residencia"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    ></input>
                  </div>
                  <div className="col-lg-12">
                    <label className="form-label text-sm text-uppercase">
                      Ciudad
                    </label>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      id="city"
                      placeholder="Ciudad"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    ></input>
                  </div>
                  <div className="col-lg-6">
                    <label className="form-label text-sm text-uppercase">
                      Celular
                    </label>
                    <input
                      className="form-control form-control-lg"
                      type="tel"
                      id="phone"
                      placeholder="313 333 33 33"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    ></input>
                  </div>
                  <div className="col-lg-12 form-group">
                    <h5>Metodo de Pago</h5>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="PaymentMethod"
                        id="contraentrega"
                        value="Contraentrega"
                        checked={paymentMethodName === 'Contraentrega'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label className="form-check-label">Contraentrega</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="PaymentMethod"
                        id="efectivo"
                        value="Efectivo"
                        checked={paymentMethodName === 'Efectivo'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label className="form-check-label">Efectivo</label>
                    </div>
                    <div className="card-body"></div>
                  </div>
                  <div className="col-lg-12 form-group">
                    <button className="btn btn-dark" type="submit">
                      Procesar orden
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
