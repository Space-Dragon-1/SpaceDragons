import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { getError } from '../utils';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      const { data } = await Axios.post('api/users/register', {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_LOGIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      alert(getError(err));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <div className="container w-100 m-auto pt-5 pb-5">
      <div className="row justify-content-center">
        <div className="col-6">
          <h1 className="my-3">Registrarse</h1>
          <form onSubmit={submitHandler}>
            <div className="form-group mt-2">
              <label>Nombre</label>
              <input
                className="form-control"
                id="name"
                name="name"
                type="name"
                placeholder="Nombre"
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
                placeholder="hola@tucorreo.com"
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
                type="confirm-password"
                placeholder="Confirmar contraseña"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <button
                className="w-100 btn btn-lg btn-primary mt-3"
                type="submit"
              >
                Registrarse
              </button>
            </div>
            <div className="mb-3">
              Ya tienes una cuenta?{' '}
              <Link to={`/login?redirect=${redirect}`}>Iniciar Sesión</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
