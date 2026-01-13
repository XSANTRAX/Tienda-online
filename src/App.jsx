import { Header } from "./Components/Header.jsx";
import { Footer } from "./Components/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";

const Home = lazy(() => import("./Pages/home.jsx"));
const Details = lazy(() => import("./Pages/Details.jsx"));
const Shopping = lazy(() => import("./Pages/Shopping.jsx"));
const NotFoundPage = lazy(() => import("./Pages/404.jsx"));
function App() {
  const [carrito, setCarrito] = useState(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem("carrito"));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  return (
    <>
      <Suspense
        fallback={
          <div
            style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}
          >
            Cargando...
          </div>
        }
      >
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home carrito={carrito} setCarrito={setCarrito} />}
          />
          <Route path="/product/:id" element={<Details />} />
          <Route
            path="/shopping"
            element={<Shopping carrito={carrito} setCarrito={setCarrito} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
