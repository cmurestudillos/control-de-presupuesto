import React, { useContext } from 'react';
// Servicios
import presupuestoContext from '../../context/presupuestos/presupuestoContext';
import gastoContext from '../../context/gastos/gastoContext';

const Gasto = ({gasto}) => {
    const presupuestosContext = useContext(presupuestoContext);
    const { presupuesto, actualizarPresupuesto } = presupuestosContext;
    const gastosContext = useContext(gastoContext);
    const { eliminarGasto, obtenerGastos, guardarGastoActual } = gastosContext;
    const [presupuestoActual] = presupuesto;
 
    const gastoEliminar = id => {
      eliminarGasto(id);
      obtenerGastos(presupuestoActual._id);

      let obj = {};
      obj = presupuesto[0];
      let resultado = obj.cantidadRestante + parseInt(gasto.cantidad)
      presupuesto[0].cantidadRestante = resultado;
      actualizarPresupuesto(presupuesto[0])
    }

    const seleccionarGasto = gasto => {
        guardarGastoActual(gasto);
    }

    return ( 
        <>
          <li>
            <div className="row">
              <div className="col-7">
                <strong>Nombre: </strong>{gasto.nombre}
              </div>

              <div className="col-2">
                <strong>Cantidad: </strong>{gasto.cantidad} € 
              </div>

              <div className="col-2">
                <span type="button" className="primary small icon solid fa-pen edit-button m-right border-buttons" onClick={() => seleccionarGasto(gasto) }>
                  <span className="label">Modificar</span>
                </span>                 
                <span type="button" className="primary small icon solid fa-trash trush-button border-buttons" onClick={() => gastoEliminar(gasto._id)}>
                  <span className="label">Eliminar</span>
                </span>  
              </div>
            </div>
          </li>
        </>
     );
}
 
export default Gasto;