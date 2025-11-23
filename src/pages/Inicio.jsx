import Productos from '../components/Productos';
import Carrito from '../components/Carrito';
import './Inicio.css';

const Inicio = () => {
  return (
    <div className="inicio-page">
    
      <header className="inicio-header">
        <h1>St Gourmet</h1>
        <h2>Explora nuestras recetas de sabores Argentinos y haz tu pedido</h2>
      </header>

      <section className="productos-section">
        
        <Productos />
      </section>
    </div>
  );
};

export default Inicio;
