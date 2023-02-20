import React, { useContext, useState, useEffect } from 'react';
// Servicios  
import presupuestoContext from '../../context/presupuestos/presupuestoContext';
import gastoContext from '../../context/gastos/gastoContext';

const NuevoGasto = () => {
    const presupuestosContext = useContext(presupuestoContext);
    const { presupuesto, actualizarPresupuesto } = presupuestosContext;
    const gastosContext = useContext(gastoContext);
    const { gastoseleccionada, errorgasto, crearGasto, validarGasto, obtenerGastos, actualizarGasto, limpiarGasto } = gastosContext;
    const [gasto, guardarGasto] = useState({nombre: '', cantidad: ''})
    const { nombre, cantidad } = gasto;

    useEffect(() => {
        if(gastoseleccionada !== null) {
            guardarGasto(gastoseleccionada)
        } else {
            guardarGasto({nombre: '', cantidad: ''})
        }
    }, [gastoseleccionada]); 

    const onChange = e => {
        guardarGasto({
            ...gasto,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        let obj = {};
        obj = presupuesto[0];
        let resultado = obj.cantidadRestante - parseInt(cantidad)
        presupuesto[0].cantidadRestante = resultado;
        actualizarPresupuesto(presupuesto[0])
        
        if(nombre.trim() === '' && cantidad.trim() === '' ) {
            validarGasto();
            return;
        }
        if(gastoseleccionada === null ) {
            gasto.presupuesto = presupuestoActual._id;
            crearGasto(gasto);
        } else {
            actualizarGasto(gasto);
            limpiarGasto();
        }
        obtenerGastos(presupuestoActual._id);
        guardarGasto({nombre: '', cantidad: ''})
    }

    if(!presupuesto) return null;
    const [presupuestoActual] =  presupuesto;

    return ( 
        <>
            <form onSubmit={onSubmit} >
                <div className="row">
                    <div className="col-5">
                        <input type="text" placeholder="Ej. Transporte" name="nombre" value={nombre} onChange={onChange} />
                    </div>
                    <div className="col-3 m-right">
                        <input type="text" placeholder="Ej. 25" name="cantidad" value={cantidad} onChange={onChange} />
                    </div>
                    <div className="col-2">
                        <ul className="actions">
                            <li>
                                <input type="submit" value={gastoseleccionada ? 'Editar Gasto' :'Crear Gasto'} className="primary" />
                            </li>
                        </ul>
                    </div>
                </div> 
            </form>
            {errorgasto ? <p className="mensaje error">El nombre del gasto es obligatorio.</p> : null }
        </>
     );
}
 
export default NuevoGasto;