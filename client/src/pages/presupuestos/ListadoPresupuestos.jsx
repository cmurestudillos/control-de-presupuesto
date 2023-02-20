import React, { useContext, useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// Servicios
import presupuestoContext from '../../context/presupuestos/presupuestoContext';
// Paginas
import Presupuesto from './Presupuesto';

const ListadoPresupuestos = () => {
    const presupuestosContext = useContext(presupuestoContext);
    const { mensaje, presupuestos, obtenerPresupuestos } = presupuestosContext;
    const [msgError, setMsgError] = useState('');

    useEffect(() => {
        if(mensaje) {
            setMsgError(mensaje)
        }
        obtenerPresupuestos();
    }, [mensaje]);

    if(presupuestos.length === 0 ) return <span>No hay Presupuestos, crea uno para empezar.</span>;

    return (
        <>
            { mensaje
                ? ( <span className='msg-error'>{msgError}</span>  ) 
                : null
            }
            <TransitionGroup component="ul" >
                {presupuestos.map(presupuesto => (
                    <CSSTransition key={presupuesto._id} timeout={200}>
                        <Presupuesto presupuesto={presupuesto} />
                    </CSSTransition>
                ))}
            </TransitionGroup>        
        </>
    );
};

export default ListadoPresupuestos;
