import { Header } from "./Components/Header.jsx";
import { Footer } from "./Components/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./Pages/home.jsx"));
const Details = lazy(() => import("./Pages/Details.jsx"));
const NotFoundPage = lazy(() => import("./Pages/404.jsx"));
function App() {
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
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Details />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
