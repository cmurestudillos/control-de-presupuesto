import { 
    FORMULARIO_PRESUPUESTO,
    OBTENER_PRESUPUESTOS,
    AGREGAR_PRESUPUESTO,
    ACTUALIZAR_PRESUPUESTO,
    VALIDAR_FORMULARIO,
    PRESUPUESTO_ACTUAL,
    ELIMINAR_PRESUPUESTO,
    PRESUPUESTO_ERROR } from '../../types';

export default (state, action) => {
    switch(action.type) {
        case FORMULARIO_PRESUPUESTO:
            return {
                ...state,
                formulario: true
            }
        case OBTENER_PRESUPUESTOS:
            return {
                ...state,
                presupuestos: action.payload
            }
        case AGREGAR_PRESUPUESTO:
            return {
                ...state,
                presupuestos: [...state.presupuestos, action.payload],
                formulario: false,
                errorformulario: false
            }
        case ACTUALIZAR_PRESUPUESTO:
            return {
                ...state,
                presupuestos: state.presupuestos.map(
                    presupuesto => presupuesto._id === action.payload._id 
                        ? action.payload
                        : presupuesto )
            }            
        case VALIDAR_FORMULARIO:
            return {
                ...state, 
                errorformulario: true
            }
        case PRESUPUESTO_ACTUAL:
            return {
                ...state,
                presupuesto: state.presupuestos.filter(presupuesto => presupuesto._id === action.payload )
            }
        case ELIMINAR_PRESUPUESTO:
            return {
                ...state,
                presupuestos: state.presupuestos.filter(presupuesto => presupuesto._id !== action.payload ),
                presupuesto: null
            }
        case PRESUPUESTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        default:
            return state;
    }
}