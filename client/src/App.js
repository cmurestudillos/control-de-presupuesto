// Rutas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Autorizacion
import tokenAuth from './config/token';
// Servicios
import AuthState from './context/autenticacion/authState';
import PresupuestoState from './context/presupuestos/presupuestoState';
import GastoState from './context/gastos/gastoState';
// Componentes
import RutaPrivada from './components/RutaPrivada'
import AuthLayout from './components/AuthLayout'
// Paginas
import Login from './pages/auth/Login';
import Presupuestos from './pages/presupuestos/Presupuestos';

const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
}

function App() {
  return (
    <>
      <PresupuestoState>
        <GastoState>
          <AuthState>
            <Router>
              <Routes>
                <Route path="/" element={<AuthLayout />}>
                  <Route exact path="/" element={<Login />} />
                </Route>
                <Route exact path="/presupuestos" element={<RutaPrivada />}>
                  <Route index element={<Presupuestos />} />
                </Route>
              </Routes>
            </Router>
          </AuthState>
        </GastoState>
      </PresupuestoState>
    </>
  );
}

export default App;
