import React, { useContext, useEffect } from 'react';
// Rutas
import { Outlet, Navigate } from 'react-router-dom'
// Servicios
import AuthContext from '../context/autenticacion/authContext';

const RutaPrivada = () => {
    const authContext = useContext(AuthContext);
    const { autenticado, usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    return ( 
        <>
            {autenticado
                ? <Outlet />
                : <Navigate to="/" />
            }
        </>
     );
}
 
export default RutaPrivada;