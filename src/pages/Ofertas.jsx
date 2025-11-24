import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Ofertas.css';

const ofertasData = [
  {
    id: 1,
    nombre: 'Lengua a la vinagreta',
    precioOriginal: 8500,
    precioOferta: 6900,
    imagen:
      'https://img-global.cpcdn.com/recipes/134658c395f111e8/600x852f0.5_0.53281_1.0q80/lengua-a-la-vinagreta-clasica-y-sabrosa-foto-principal.webp',
    detalle: 'classic and tasty tongue in vinaigrette',
  },
  {
    id: 2,
    nombre: 'Pescado con verduras',
    precioOriginal: 7200,
    precioOferta: 5600,
    imagen:
      'https://img-global.cpcdn.com/recipes/8c8547eeb07d63ab/600x852f0.5_0.54463_1.06473q80/fin-de-semana-xl-sabroso-pescado-con-verduras-foto-principal.webp',
    detalle: 'tasty fish with vegetables',
  },
  {
    id: 3,
    nombre: 'Tarta de Pollo y Puerros ',
    precioOriginal: 9800,
    precioOferta: 7900,
    imagen:
      'https://img-global.cpcdn.com/recipes/71235d0a97b8fac0/600x852cq80/deliciosa-tarta-de-pollo-y-puerros-foto-principal.webp',
    detalle: 'delicious chicken and leek pie',
  },
];

const currency = (n) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(
    n
  );

const STORAGE_KEY = 'offers_cart';

const Ofertas = () => {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const [miniOpen, setMiniOpen] = useState(false);
  const [payModalOpen, setPayModalOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setCart(JSON.parse(raw));
      } catch {
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToOffersCart = (item) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === item.id);
      let next;
      if (idx > -1) {
        next = prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      } else {
        next = [
          ...prev,
          {
            id: item.id,
            nombre: item.nombre,
            precio: item.precioOferta,
            qty: 1,
          },
        ];
      }
      setToast({
        title: 'Agregado',
        text: `${item.nombre} • ${currency(item.precioOferta)}`,
      });
      setTimeout(() => setToast(null), 3000);
      setMiniOpen(true);
      return next;
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, qty: Math.max(1, p.qty + delta) } : p
        )
        .filter(Boolean)
    );
  };

  const emptyCart = () => {
    setCart([]);
    setMiniOpen(false);
    setToast({
      title: 'Carrito vacío',
      text: 'Se vació el carrito de ofertas',
    });
    setTimeout(() => setToast(null), 2500);
  };

  const total = cart.reduce((s, i) => s + i.precio * i.qty, 0);

  const handleSimulatePayment = () => {
    if (cart.length === 0) {
      setToast({
        title: 'Carrito vacío',
        text: 'Agregá algún producto antes de pagar.',
      });
      setTimeout(() => setToast(null), 2200);
      return;
    }
    setPayModalOpen(true);
  };

  const confirmPayment = () => {
    setPayModalOpen(false);
    setCart([]);
    setMiniOpen(false);
    setToast({
      title: 'Pago exitoso',
      text: 'Su pago fue realizado, muchas gracias por su compra. Disfrute de nuestra calidad Gourmet.',
    });
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <main className="ofertas-container">
      <header className="ofertas-header">
        <div>
          <h1 className="ofertas-titulo">Ofertas Especiales Gourmet</h1>
          <p className="ofertas-sub">
            Descuentos por tiempo limitado. Entregas y calidad gourmet.
          </p>
        </div>

        <div className="offers-mini-toggle">
          <button
            className="mini-toggle-btn"
            onClick={() => setMiniOpen((s) => !s)}
            aria-expanded={miniOpen}
            aria-controls="offers-mini-cart"
          >
            🛍️ Ofertas{' '}
            <span className="mini-count">
              {cart.reduce((s, i) => s + i.qty, 0)}
            </span>
          </button>
        </div>
      </header>

      <section className="ofertas-grid">
        {ofertasData.map((item) => (
          <article key={item.id} className="oferta-card" aria-label={item.nombre}>
            <img
              src={item.imagen}
              alt={item.nombre}
              className="oferta-img"
              loading="lazy"
              onError={(e) => {
                if (e.target.dataset.fallback) return;
                e.target.dataset.fallback = 'true';
                e.target.src =
                  'data:image/svg+xml;utf8,' +
                  encodeURIComponent(
                    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'>
                      <rect width='100%' height='100%' fill='#f5efe8'/>
                      <g fill='#d8c6b6' font-family='sans-serif' font-size='28' text-anchor='middle'>
                        <text x='50%' y='48%' fill='#b9a592'>Imagen no disponible</text>
                        <text x='50%' y='62%' fill='#b9a592' font-size='18'>Disfrute de nuestra calidad Gourmet</text>
                      </g>
                  </svg>`
                  );
                e.target.style.objectFit = 'cover';
              }}
            />

            <h3 className="oferta-nombre">{item.nombre}</h3>

            <div className="oferta-precios">
              <span className="precio-original">
                {currency(item.precioOriginal)}
              </span>
              <span className="precio-oferta">{currency(item.precioOferta)}</span>
            </div>

            <div className="oferta-acciones">
              <button
                className="btn-oferta"
                onClick={() => addToOffersCart(item)}
                aria-label={`Agregar ${item.nombre}`}
              >
                Agregar al carrito
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* MINI CART */}
      <aside
        id="offers-mini-cart"
        className={`offers-mini-cart ${miniOpen ? 'open' : ''}`}
        aria-hidden={!miniOpen}
      >
        <div className="mini-header">
          <strong>Carrito de Ofertas</strong>

          <div className="mini-actions">
            <button className="mini-empty" onClick={emptyCart}>
              Vaciar
            </button>
          </div>
        </div>

        <div className="mini-body">
          {cart.length === 0 ? (
            <div className="mini-empty-state">
              No hay productos. Agregá alguna oferta.
            </div>
          ) : (
            <>
              <ul className="mini-list">
                {cart.map((p) => (
                  <li key={p.id} className="mini-item">
                    <div className="mini-left">
                      <div className="mini-name">{p.nombre}</div>
                      <div className="mini-qty">
                        <button onClick={() => changeQty(p.id, -1)}>−</button>
                        <span>{p.qty}</span>
                        <button onClick={() => changeQty(p.id, +1)}>+</button>
                      </div>
                    </div>
                    <div className="mini-right">
                      <div className="mini-sub">
                        {currency(p.precio * p.qty)}
                      </div>
                      <button
                        className="mini-remove"
                        onClick={() => removeItem(p.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mini-summary">
                <div>Total</div>
                <div className="mini-total">{currency(total)}</div>
              </div>

              <div className="mini-cta">
                <button className="btn-pay" onClick={handleSimulatePayment}>
                  Pagar (simulado)
                </button>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Modal */}
      {payModalOpen && (
        <div className="pay-modal" role="dialog" aria-modal="true">
          <div className="pay-card">
            <header className="pay-card-header">
              <h2>Confirmar pago</h2>
              <button
                className="pay-close"
                onClick={() => setPayModalOpen(false)}
              >
                ✕
              </button>
            </header>

            <div className="pay-card-body">
              <p className="pay-intro">
                Estás por pagar <strong>{currency(total)}</strong>. Este es un
                pago simulado.
              </p>

              <ul className="pay-items">
                {cart.map((p) => (
                  <li key={p.id}>
                    {p.qty} × {p.nombre} — {currency(p.precio * p.qty)}
                  </li>
                ))}
              </ul>

              <div className="pay-gourmet">
                <h3>¡Gracias por elegir calidad Gourmet!</h3>
                <p>
                  Después del pago simulado verás una confirmación y tu carrito
                  se vaciará.
                </p>
              </div>
            </div>

            <footer className="pay-card-footer">
              <button
                className="btn-secondary"
                onClick={() => setPayModalOpen(false)}
              >
                Cancelar
              </button>
              <button className="btn-primary" onClick={confirmPayment}>
                Confirmar pago
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* Toast */}
      <div
        className={`toast ${toast ? 'toast--visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        {toast && (
          <>
            <strong className="toast-title">{toast.title}</strong>
            <div className="toast-text">{toast.text}</div>
          </>
        )}
      </div>
    </main>
  );
};

export default Ofertas;