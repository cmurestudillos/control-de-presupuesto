import React, { useContext, useEffect } from 'react';
// Servicios
import AuthContext from '../../context/autenticacion/authContext';
// Componentes
import Sidebar from '../../components/Sidebar';
// Paginas
import ListadoGastos from '../gastos/ListadoGastos';

const Presupuestos = () => {
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;
  
  useEffect(() => {
      usuarioAutenticado();
  }, [])

  return (
    <>
      <div id="wrapper">
        <div id="main">
          <ListadoGastos />
        </div>
        <Sidebar />
      </div>
    </>
  );
}
 
export default Presupuestos;