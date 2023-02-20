import React, { useContext, useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// Servicios
import presupuestoContext from '../../context/presupuestos/presupuestoContext';
import gastoContext from '../../context/gastos/gastoContext';
// Paginas
import Gasto from './Gasto';
import NuevoGasto from './NuevoGasto';
// Componentes
import SearchInput from '../../components/SearchInput';
import ExcelExport from '../../components/ExcelExport';


const ListadoGastos = () => {
    const presupuestosContext = useContext(presupuestoContext);
    const { presupuesto, eliminarPresupuesto } = presupuestosContext;
    const gastosContext = useContext(gastoContext);
    const { gastosPresupuesto } = gastosContext;
    const [gastosArray, setGastosArray] = useState([]);

    useEffect(() => {
        setGastosArray(gastosPresupuesto)
    }, [gastosPresupuesto]); 

    const onInputSearch = (results) => {
        results = results.toLocaleLowerCase() || '';
        const newArray = gastosPresupuesto.filter((item) => item.nombre.toLocaleLowerCase().indexOf(results) > -1);
        setGastosArray(newArray)
    }

    const onClickEliminar = () => {
        eliminarPresupuesto(presupuestoActual._id)
    }

    if(!presupuesto) return <h2 className='text-init'>Selecciona un Presupuesto: </h2>;
    const [presupuestoActual] =  presupuesto;

    return ( 
        <>
            <div className="inner">
                <header id="header">
                    <div className="row">
                        <div className="col-11">
                            <div className="row">
                                <div className="col">
                                    <h2>{presupuestoActual.nombre}:</h2>
                                </div>
                                <div className="col">
                                    <h2 className='text-primary'>Inicial: {presupuestoActual.cantidadInicial} €</h2> 
                                </div>
                                <div className="col">
                                    <h2 className={presupuestoActual.cantidadRestante <= 500 ?'text-danger':'text-success'}>Restante: {presupuestoActual.cantidadRestante} €</h2>                                                                
                                </div>
                            </div>
                        </div>
                        <div className="col-1">
                            <ul className="icons">
                                <li>
                                    <ExcelExport excelData={gastosArray} fileName={`Gastos-${presupuestoActual.nombre}`} />
                                </li>
                                <li>
                                    <span className="icon solid fa-trash trush-button border-buttons" onClick={onClickEliminar} >
                                        <span className="label">Eliminar</span>
                                    </span>
                                </li>                        
                            </ul>                            
                        </div>
                        <div className="row">
                            <div className="col">
                                <NuevoGasto />
                            </div>
                        </div>
                        <hr className='hr-vertical'></hr>
                        <div className="row">
                            <div className="col">
                                <SearchInput searchInput={onInputSearch} />
                            </div>
                        </div>
                    </div>
                </header>
            </div>
            <section className='container'>
                {gastosArray.length === 0 
                    ? (<h3 className='m-center'>No hay gastos</h3>) 
                    : <TransitionGroup component="ul" className='alt'>
                        {gastosArray.map(gasto => (
                            <CSSTransition key={gasto._id} timeout={200}>
                                <Gasto gasto={gasto} />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </section>
        </>
     );
}
 
export default ListadoGastos;