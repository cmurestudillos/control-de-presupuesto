import React, { useState, useContext, useEffect } from 'react';
// Rutas
import { useNavigate } from 'react-router-dom';
// Servicios
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext; 
  const [msgError, setMsgError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (autenticado) {
      navigate("/presupuestos");
    }

    if (mensaje) {
      setMsgError(mensaje)
    }
  }, [mensaje, autenticado, props.history]);

  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });
  const { email, password } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setMsgError('Todos los campos son obligatorios.')
    }
    iniciarSesion({ email, password });
  };

  return ( 
    <>
      <div className='form-container'>
        <h3>Control de Gastos</h3>
        <form onSubmit={onSubmit}>
          <div className="row gtr-uniform">
            <div className="col-6 col-12-xsmall">
              <input type="email" id="email" name="email" placeholder="name@example.com" value={email} onChange={onChange} />
            </div>
            <div className="col-6 col-12-xsmall">
              <input type="password" id="password" name="password" placeholder="*******" value={password} onChange={onChange} />
            </div>
            <div className="col-12">
              <ul className="actions">
                <li><input type="submit" value="Entrar" className="primary" /></li>
              </ul>
            </div>
          </div>
          {mensaje && msgError &&
            <span className='msg-error'>{msgError}</span>
          }
        </form>
      </div>
    </>
  );
}
 
export default Login;