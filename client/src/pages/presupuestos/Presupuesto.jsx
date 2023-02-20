import React, { useContext } from 'react';
// Servicios
import presupuestoContext from '../../context/presupuestos/presupuestoContext';
import gastoContext from '../../context/gastos/gastoContext';

const Presupuesto = ({presupuesto}) => {
    const presupuestosContext = useContext(presupuestoContext);
    const { presupuestoActual } = presupuestosContext;
    const gastosContext = useContext(gastoContext);
    const { obtenerGastos } = gastosContext;

    const seleccionarPresupuesto = id => {
        presupuestoActual(id); 
        obtenerGastos(id); 
    }

    return ( 
        <li className='m-vertical'>
            <button type="button" className="button fit small" onClick={ () => seleccionarPresupuesto(presupuesto._id) }>{presupuesto.nombre} </button>
        </li>
     );
}
 
export default Presupuesto;