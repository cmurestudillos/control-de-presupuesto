import React, {useContext, useEffect} from 'react';
// Servicios
import AuthContext from '../context/autenticacion/authContext';
// Componentes
import Footer from './Footer';
// Paginas
import NuevoPresupuesto from '../pages/presupuestos/NuevoPresupuesto';
import ListadoPresupuestos from '../pages/presupuestos/ListadoPresupuestos';

const Sidebar = () => {
    const authContext = useContext(AuthContext);
    const { usuario, cerrarSesion, usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, [])

    return ( 
        <div id="sidebar">
          <div className="inner">
            <section id="search" className="alt">
            {usuario 
              ? <div className="row">
                  <div className="col-7 col-12-medium">
                    <h3>Bienvenid@, <strong><i>{usuario.nombre}</i></strong></h3> 
                  </div>
                  <div className="col-3 col-12-medium">
                    <input type="button" className="button small" value="Cerrar Sesión" onClick={() => cerrarSesion() } />
                  </div>
                </div>
              : null
            }
            </section>

            <nav id="menu">
              <header className="major">
                <h2>Listado de presupuestos</h2>
              </header>
              <NuevoPresupuesto />
              <hr></hr>
              <ListadoPresupuestos />
            </nav>
            <Footer />    
          </div>
        </div>       
     );
}
 
export default Sidebar;