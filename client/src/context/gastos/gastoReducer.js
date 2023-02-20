import {
    GASTOS_PRESUPUESTO,
    AGREGAR_GASTO,
    VALIDAR_GASTO,
    ELIMINAR_GASTO,
    GASTO_ACTUAL,
    ACTUALIZAR_GASTO,
    LIMPIAR_GASTO } from '../../types';

export default (state, action) => {
    switch(action.type) {
        case GASTOS_PRESUPUESTO:
            return {
                ...state,
                gastosPresupuesto: action.payload
            }
        case AGREGAR_GASTO:
            return {
                ...state,
                gastosPresupuesto: [action.payload, ...state.gastosPresupuesto],
                errorgasto: false
            }
        case VALIDAR_GASTO:
            return {
                ...state,
                errorgasto: true
            }
        case ELIMINAR_GASTO:
            return {
                ...state,
                gastosPresupuesto: state.gastosPresupuesto.filter(gasto => gasto._id !== action.payload )
            }
        case ACTUALIZAR_GASTO:
            return {
                ...state,
                gastosPresupuesto: state.gastosPresupuesto.map(
                    gasto => gasto._id === action.payload._id 
                        ? action.payload
                        : gasto )
            }
        case GASTO_ACTUAL:
            return {
                ...state,
                gastoseleccionada: action.payload
            }
        case LIMPIAR_GASTO:
            return {
                ...state,
                gastoseleccionada: null
            }
        default:
            return state;
    }
}