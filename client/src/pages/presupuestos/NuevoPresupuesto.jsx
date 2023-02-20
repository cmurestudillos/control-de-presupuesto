import React, { useState, useContext } from 'react';
// Servicios
import presupuestoContext from '../../context/presupuestos/presupuestoContext';

const NuevoPresupuesto = () => {
    const presupuestosContext = useContext(presupuestoContext);
    const { formulario, errorformulario,  mostrarFormulario, crearPresupuesto, mostrarError } = presupuestosContext;
    const [presupuesto, guardarPresupuesto] = useState({nombre: '', cantidadInicial: ''});
    const { nombre, cantidadInicial } = presupuesto;

    const onChange = e => {
        guardarPresupuesto({
            ...presupuesto,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        if(nombre.trim() === '' && cantidadInicial.trim() === '') {
            mostrarError();
            return;
        }
        crearPresupuesto(presupuesto)
        guardarPresupuesto({nombre: '', cantidadInicial: ''})
    }

    const onClickFormulario = () => {
        mostrarFormulario();
    }

    return ( 
        <>
            { formulario 
                ? (<form onSubmit={onSubmit} >
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="demo-priority-low">Nombre: </label>
                                <input type="text" placeholder="Ejem. Enero" name="nombre" value={nombre} onChange={onChange} />    

                                { errorformulario 
                                    ? <span className="msg-error">El nombre es obligatorio.</span>  
                                    : null 
                                }  
                            </div>
                            <div className="col-6">
                                <label htmlFor="demo-priority-low">Cantidad: </label>
                                <input type="text" placeholder="Ejem. 1000" name="cantidadInicial" value={cantidadInicial} onChange={onChange} />    
                                { errorformulario 
                                    ? <span className="msg-error">La cantidad es obligatoria.</span>  
                                    : null 
                                }  
                            </div>                            
                            <div className="col-12 m-vertical">
                                <ul className="actions">
                                    <li>
                                        <input type="submit" value="Añadir" className="secondary" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </form>) 
                : (<div className="row">
                    <div className="col-12 m-center">
                        <button type="button" className="button primary" onClick={ onClickFormulario } >Nuevo Presupuesto</button>
                    </div>
                  </div>) 
            }
        </>
     );
}
 
export default NuevoPresupuesto;