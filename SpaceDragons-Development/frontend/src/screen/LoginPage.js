import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { getError } from '../utils';

export default function LoginPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('api/users/login', {
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
    <div className="small-container w-100 m-auto pt-5 pb-5">
      <h1 className="my-3">Iniciar Session</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
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
        <div className="mb-3">
          <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">
            Iniciar Sesión
          </button>
        </div>
        <div className="mb-3">
          No tienes una cuenta?{' '}
          <Link to={`/register?redirect=${redirect}`}>Registrate</Link>
        </div>
      </form>
    </div>
  );
}
