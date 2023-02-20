import React, { useReducer } from 'react';
import presupuestoContext from './presupuestoContext';
import presupuestoReducer from './presupuestoReducer';
import { 
    FORMULARIO_PRESUPUESTO,
    OBTENER_PRESUPUESTOS,
    AGREGAR_PRESUPUESTO,
    ACTUALIZAR_PRESUPUESTO,
    VALIDAR_FORMULARIO,
    PRESUPUESTO_ACTUAL,
    ELIMINAR_PRESUPUESTO,
    PRESUPUESTO_ERROR } from '../../types';
import clienteAxios from '../../config/axios';

const PresupuestoState = props => {
    const initialState = {
        presupuestos : [],
        formulario : false,
        errorformulario: false,
        presupuesto: null, 
    }
    const [state, dispatch] = useReducer(presupuestoReducer, initialState);

    const mostrarFormulario = () => {
        dispatch({type: FORMULARIO_PRESUPUESTO})
    }

    const obtenerPresupuestos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/presupuestos');
            dispatch({
                type: OBTENER_PRESUPUESTOS,
                payload: resultado.data.presupuestos
            })
        } catch (error) {
            dispatch({
                type: PRESUPUESTO_ERROR,
                payload: error
            })
        }
    }

    const crearPresupuesto = async presupuesto => {
        try {
            const resultado = await clienteAxios.post('/api/presupuestos', presupuesto);
            dispatch({
                type: AGREGAR_PRESUPUESTO,
                payload: resultado.data
            })
        } catch (error) {
            dispatch({
                type: PRESUPUESTO_ERROR,
                payload: error
            })
        }
    }

    const actualizarPresupuesto = async presupuesto => {
        try {
            const resultado = await clienteAxios.put(`/api/presupuestos/${presupuesto._id}`, presupuesto);
            dispatch({
                type: ACTUALIZAR_PRESUPUESTO,
                payload: resultado.data.presupuesto
            })
        } catch (error) {
            console.log(error);
        }
    }

    const mostrarError = () => {
        dispatch({type: VALIDAR_FORMULARIO})
    } 

    const presupuestoActual = presupuestoId => {
        dispatch({
            type: PRESUPUESTO_ACTUAL,
            payload: presupuestoId
        })
    }

    const eliminarPresupuesto = async presupuestoId => {
        try {
            await clienteAxios.delete(`/api/presupuestos/${presupuestoId}`);
            dispatch({
                type: ELIMINAR_PRESUPUESTO,
                payload: presupuestoId
            })
        } catch (error) {
            dispatch({
                type: PRESUPUESTO_ERROR,
                payload: error
            })
        }
    }

    return (
        <presupuestoContext.Provider value={{  presupuestos: state.presupuestos,
                                            formulario: state.formulario,
                                            errorformulario: state.errorformulario,
                                            presupuesto: state.presupuesto,
                                            mostrarFormulario,
                                            obtenerPresupuestos,
                                            crearPresupuesto,
                                            actualizarPresupuesto,
                                            mostrarError,
                                            presupuestoActual,
                                            eliminarPresupuesto }} >
            {props.children}
        </presupuestoContext.Provider>
        
    )
}

export default PresupuestoState;