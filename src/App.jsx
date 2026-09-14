import { useEffect, useState } from "react";
import CreatorPage from "./CreatorPage.jsx";
import "./App.css";

const API_URL = "https://api-5cik.onrender.com/v1/api/calculadora";
const themeClass = import.meta.env.VITE_THEME === "green" ? "theme-green" : "";

export default function App() {
  const [isCreatorPage, setIsCreatorPage] = useState(
    () => window.location.hash === "#creador",
  );

  useEffect(() => {
    const handleHashChange = () => {
      setIsCreatorPage(window.location.hash === "#creador");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    window.document.title = isCreatorPage
      ? "Sobre este proyecto | Calculadora Cloud"
      : "Calculadora Cloud";
  }, [isCreatorPage]);

  if (isCreatorPage) {
    return <CreatorPage />;
  }

  return <Calculator />;
}

function Calculator() {

  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [operacion, setOperacion] = useState("sumar");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const calcular = async (event) => {
    event.preventDefault();
    setError("");

    if (a === "" || b === "") {
      setResultado(null);
      setError("Introduce un valor para A y otro para B.");
      return;
    }

    const invalidValue = [
      ["A", a],
      ["B", b],
    ].find(([, value]) => !Number.isInteger(Number(value)));

    if (invalidValue) {
      const [field, value] = invalidValue;
      setResultado(null);
      setError(
        `El valor de ${field} "${value}" no es válido. Solo se aceptan números enteros.`,
      );
      return;
    }

    const params = new URLSearchParams({ a, b, operacion });

    try {
      setCargando(true);
      const response = await fetch(`${API_URL}?${params}`);
      const data = await response.json();

      if (!response.ok || typeof data.resultado === "undefined") {
        throw new Error("La API no pudo calcular la operación.");
      }

      setResultado(data.resultado);
    } catch (requestError) {
      setResultado(null);
      setError(
        requestError instanceof TypeError
          ? "No se pudo conectar con la API. Inténtalo de nuevo."
          : requestError.message,
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className={`container ${themeClass}`}>
      <div className="page-shell">
        <section className="card" aria-labelledby="titulo-calculadora">
          <div className="card-heading">
            <div>
              <p className="eyebrow">Operación remota</p>
              <h1 id="titulo-calculadora">Calculadora Cloud</h1>
              <p className="intro">
                Envía dos valores a la API y elige la operación que quieres realizar.
              </p>
            </div>
            <img
              className="hero-art"
              src={`${import.meta.env.BASE_URL}ai-calculator.svg`}
              alt="Ilustración de una calculadora conectada a la nube"
            />
          </div>

          <form onSubmit={calcular}>
            <div className="fields">
            <label>
              <span>Valor A</span>
              <input
                type="number"
                inputMode="decimal"
                placeholder="109"
                value={a}
                onChange={(e) => setA(e.target.value)}
              />
            </label>

            <label>
              <span>Valor B</span>
              <input
                type="number"
                inputMode="decimal"
                placeholder="56"
                value={b}
                onChange={(e) => setB(e.target.value)}
              />
            </label>
            </div>

            <label>
              <span>Operación</span>
              <select
                value={operacion}
                onChange={(e) => setOperacion(e.target.value)}
              >
                <option value="sumar">Sumar</option>
                <option value="restar">Restar</option>
              </select>
            </label>

            <button type="submit" disabled={cargando}>
              {cargando ? "Calculando..." : "Calcular resultado"}
            </button>
          </form>

          <div className="result-panel" aria-live="polite">
            <span className="result-label">Resultado</span>
            {error ? (
              <p className="error" role="alert">
                {error}
              </p>
            ) : (
              <strong>{resultado ?? "--"}</strong>
            )}
          </div>
        </section>

        <footer className="creator-footer">
          <span>Hecha con IA, curiosidad y unas cuantas operaciones.</span>
          <a href={`${import.meta.env.BASE_URL}#creador`}>
            Sobre el creador <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </div>
    </main>
  );
}