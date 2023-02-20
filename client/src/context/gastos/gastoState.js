import React, { useReducer } from 'react';
import GastoContext from './gastoContext';
import GastoReducer from './gastoReducer';
import {
    GASTOS_PRESUPUESTO,
    AGREGAR_GASTO,
    VALIDAR_GASTO,
    ELIMINAR_GASTO,
    GASTO_ACTUAL,
    ACTUALIZAR_GASTO,
    LIMPIAR_GASTO } from '../../types';
import clienteAxios from '../../config/axios';

const GastoState = props => {
    const initialState = {
        gastosPresupuesto: [],
        errorgasto: false,
        gastoseleccionada: null
    }
    const [state, dispatch] = useReducer(GastoReducer, initialState);

    const obtenerGastos = async presupuesto => {
        try {
            const resultado = await clienteAxios.get("/api/gastos", {params: { presupuesto }});
            dispatch({
                type: GASTOS_PRESUPUESTO,
                payload: resultado.data.gastos
            })
        } catch (error) {
            console.log(error);
        }
    }

    const crearGasto = async gasto => {
        try {
            const resultado = await clienteAxios.post('/api/gastos', gasto);
            dispatch({
                type: AGREGAR_GASTO,
                payload: resultado.data.gasto
            })
        } catch (error) {
            console.log(error);
        }
    }

    const validarGasto = () => {
        dispatch({
            type: VALIDAR_GASTO
        })
    }

    const eliminarGasto = async (id) => {
        try {
            await clienteAxios.delete(`/api/gastos/${id}`);
            dispatch({
                type: ELIMINAR_GASTO,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    const actualizarGasto = async gasto => {
        try {
            const resultado = await clienteAxios.put(`/api/gastos/${gasto._id}`, gasto);
            dispatch({
                type: ACTUALIZAR_GASTO,
                payload: resultado.data.gasto
            })
        } catch (error) {
            console.log(error);
        }
    }

    const guardarGastoActual = gasto => {
        dispatch({
            type: GASTO_ACTUAL,
            payload: gasto
        })
    }

    const limpiarGasto = () => {
        dispatch({
            type: LIMPIAR_GASTO
        })
    }

    return (
        <GastoContext.Provider value={{ gastosPresupuesto : state.gastosPresupuesto,
                                        errorgasto: state.errorgasto,
                                        gastoseleccionada: state.gastoseleccionada,
                                        obtenerGastos,
                                        crearGasto,
                                        validarGasto,
                                        eliminarGasto,
                                        guardarGastoActual,
                                        actualizarGasto,
                                        limpiarGasto }} >
            {props.children}
        </GastoContext.Provider>
    )
}

export default GastoState;