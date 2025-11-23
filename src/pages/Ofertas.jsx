import { Link } from 'react-router-dom';
import './Ofertas.css'

const Ofertas = ()=> {
  return (
    <main>
      <h1>Ofertas</h1>
      <p>Página en preparación. Volveremos con promos pronto.</p>
      <p>
        <Link to="/" className="btn-link">Volver al inicio</Link>
      </p>
    </main>
  );
}
export default Ofertas