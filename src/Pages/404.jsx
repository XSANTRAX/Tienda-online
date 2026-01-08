import styles from './404.module.css'

export default function NotFoundPage () {
  return (
    <main className={styles.error}>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
    </main>
  )
}