import { Link } from "react-router-dom";
import styles from "./Shopping.module.css";

export default function Shopping({ carrito, setCarrito }) {
  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((product) => product.id !== id);
    setCarrito(nuevoCarrito);
  };

  const total = carrito.reduce((sum, p) => sum + p.price, 0);
  const totalUI = total.toFixed(2);


  return (
    <main className={styles.layout}>
      <section className={styles.intro}>
        <div>
          <div className={styles.back}>
          <button onClick={() => window.history.back()}>Volver</button>
          </div>
          <h2>Carrito</h2>
          <p>Revisa los productos que has agregado a tu carrito</p>
        </div>
      </section>
      <section className={styles.products}>
        <div>
          {Array.isArray(carrito) &&
            carrito.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className={styles.cardLink}
              >
                <div className={styles.cardImg}>
                  <img src={product.image} alt={product.title} />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.productTitle}>{product.title}</h3>
                  <p>
                    Precio: <br /> ${product.price}
                  </p>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // evita que el botón active el link
                      e.stopPropagation();
                      eliminarProducto(product.id);
                    }}
                  >
                    Eliminar del carrito
                  </button>
                </div>
              </Link>
            ))}
        </div>
      </section>
      <section className={styles.total}>
        <h2>Total</h2>
        <p>Total de productos: ${totalUI}</p>
        <button>Finalizar pedido</button>
      </section>
    </main>
  );
}
