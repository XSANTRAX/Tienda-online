import { Pagination } from "../Components/Pagination.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const RESULTS_PER_PAGE = 6;

export default function Home({ carrito, setCarrito }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
          throw new Error("Error al obtener productos");
        }

        const data = await response.json();
        const filtered = category
          ? data.filter((p) => p.category === category)
          : data;
        setProducts(filtered);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [category]);

  const agregarProducto = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const totalPages = Math.ceil(products.length / RESULTS_PER_PAGE);

  const offset = (currentPage - 1) * RESULTS_PER_PAGE;
  const visibleProducts = products.slice(offset, offset + RESULTS_PER_PAGE);

  return (
    <>
      <main>
        <section className={styles.intro}>
          <div>
            <h2>Bienvenido a NeoStore tu tienda de confianza</h2>
            <p>
              NeoStore es una tienda online de productos de confianza, con una
              gran variedad de productos para que puedas encontrar lo que
              necesitas en cuanto a tus necesidades.
            </p>
          </div>
          <nav>
            <button onClick={() => setCategory(null)}>Todos</button>
            <button onClick={() => setCategory("electronics")}>
              Electrónica
            </button>
            <button onClick={() => setCategory("jewelery")}>Joyas</button>
            <button onClick={() => setCategory("men's clothing")}>
              Ropa Hombre
            </button>
            <button onClick={() => setCategory("women's clothing")}>
              Ropa Mujer
            </button>
          </nav>
        </section>
        <section className={styles.products}>
          <h3 className={styles.sectionTitle}>
            Productos {category ? `(${category})` : "(Todos)"}
          </h3>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <div>
              {visibleProducts.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className={styles.cardLink}
                >
                  <div className={styles.cardContent}>
                    <img src={product.image} alt={product.title} />
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <p>{`$${product.price}`}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // evita que el botón active el link
                      e.stopPropagation();
                      agregarProducto(product);
                    }}
                  >
                    Agregar al carrito
                  </button>
                </Link>
              ))}
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </section>
      </main>
    </>
  );
}
