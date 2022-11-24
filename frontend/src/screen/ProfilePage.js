import React, { useContext, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

export default function ProfilePage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loacdingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      const { data } = await axios.put(
        'api/users/profile',
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      ctxDispatch({ type: 'USER_LOGGUED', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Información actualizada correctamente');
    } catch (err) {
      dispatch({
        type: 'UPDATE_FAIL',
      });
      toast.error(getError(err));
    }
  };

  return (
    <div className="container w-100 m-auto pt-5 pb-5">
      <div className="row justify-content-center">
        <div className="col-6">
          <h1 className="my-3">Mi Perfil</h1>
          <form onSubmit={submitHandler}>
            <div className="form-group mt-2">
              <label>Nombre</label>
              <input
                className="form-control"
                id="name"
                name="name"
                type="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="form-group mt-2">
              <label>Email</label>
              <input
                className="form-control"
                id="email"
                name="email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="form-group mt-2">
              <label>Contraseña</label>
              <input
                className="form-control"
                id="password"
                name="password"
                type="password"
                placeholder="Contraseña"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="form-group mt-2">
              <label>Confirmar contraseña</label>
              <input
                className="form-control"
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="Confirmar contraseña"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <button
                className="w-100 btn btn-lg btn-success mt-3"
                type="submit"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
