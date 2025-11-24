import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import DetalleProducto from './pages/DetalleProducto';
import Ofertas from './pages/Ofertas';
import Carrito from './components/Carrito';
import Inicio from './pages/Inicio';
import Footer from './components/Footer';
import RutaProtegida from './components/RutaProtegida';
import Login from './components/Login';
import Admin from './components/Admin';

function App() {
  return (
    <>
      <Header />
      <NavBar />

      <main className="container">
        <Routes>
          <Route path="/" element={<Inicio />} />

          <Route path="/ofertas" element={<Ofertas />} />

          <Route path="/productos/:id" element={<DetalleProducto />} />

          <Route
            path="/carrito"
            element={
              <RutaProtegida>
                <Carrito />
              </RutaProtegida>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <RutaProtegida onlyAdmin={true}>
                <Admin />
              </RutaProtegida>
            }
          />

          {/* 404 */}
          <Route path="*" element={<div>404 - Ruta no válida</div>} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
