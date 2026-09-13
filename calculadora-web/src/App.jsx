import { useState } from "react";
import "./App.css";

const API_URL = "https://api-5cik.onrender.com/v1/api/calculadora";

export default function App() {
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
    <main className="container">
      <section className="card" aria-labelledby="titulo-calculadora">
        <p className="eyebrow">Operación remota</p>
        <h1 id="titulo-calculadora">Calculadora Cloud</h1>
        <p className="intro">
          Envía dos valores a la API y elige la operación que quieres realizar.
        </p>

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
    </main>
  );
}