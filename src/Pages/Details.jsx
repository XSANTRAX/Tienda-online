import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Ranking } from "../Components/Ranking.jsx";
import styles from "./Details.module.css";

export default function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener producto");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error al obtener producto:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!product) {
    return <p>Producto no encontrado</p>;
  }
  return (
    <>
      <div className={styles.container}>
        <main className={styles.product}>
          <button className={styles.back} onClick={() => window.history.back()}>
            Volver
          </button>

          <div className={styles.product_grid}>
            <div className={styles.product_image}>
              <img src={product.image} alt={product.title} />
            </div>

            <div className={styles.product_info}>
              <h1>{product.title}</h1>
              <h2>Categoría: {product.category}</h2>
              <p>{product.description}</p>
              <p>Calificación: <span style={{ display: "inline-flex", verticalAlign: "middle" }}><Ranking rating={product.rating.rate} /></span></p>
              <p>Cantidad disponible: {product.rating.count} uds.</p>              
              <div className={styles.product_price}>
                <h3>Precio</h3>
                <p>${product.price}</p>
              </div>
              <div className={styles.product_actions}>
                <button>Agregar al carrito</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
