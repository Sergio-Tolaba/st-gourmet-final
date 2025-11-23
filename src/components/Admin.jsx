import GestionProducto from './GestionProducto'
import FormProducto from './FormProducto';
import { useEffect, useState } from "react";

function Admin() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
  <div className="admin-container">
    {isMobile ? (
      <>
        <div className="product-list">
          <GestionProducto />
        </div>
      </>
    ) : (
      <>
        <div className="product-list">
          <GestionProducto />
        </div>
      </>
    )}
  </div>
);

  
}
export default Admin