import { Link, useLocation } from 'react-router-dom';

export default function LoginPage() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  return (
    <div className="small-container">
      <h1 className="my-3">Iniciar Session</h1>
      <form>
        <div className="form-group">
          <label for="email">Email</label>
          <input
            className="form-control"
            id="email"
            name="email"
            type="email"
            required
          ></input>
        </div>
        <div className="form-group">
          <label for="password">Contraseña</label>
          <input
            className="form-control"
            id="password"
            name="password"
            type="password"
            required
          ></input>
        </div>
        <div className="mb-3">
          <button type="submit">Iniciar Sesión</button>
        </div>
        <div className="mb-3">
          No tienes una cuenta?{' '}
          <Link to={`/login?redirect=${redirect}`}>Registrate</Link>
        </div>
      </form>
    </div>
  );
}
