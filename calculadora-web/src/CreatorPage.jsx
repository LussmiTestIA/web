import "./App.css";

const homeUrl = import.meta.env.BASE_URL;
const themeClass = import.meta.env.VITE_THEME === "green" ? "theme-green" : "";

export default function CreatorPage() {
  return (
    <main className={`creator-page ${themeClass}`}>
      <article className="creator-story">
        <a className="back-link" href={homeUrl}>
          <span aria-hidden="true">←</span> Volver a la calculadora
        </a>

        <div className="creator-story-grid">
          <div>
            <p className="eyebrow">Notas del creador</p>
            <h1>Un pequeño experimento con una gran ayuda.</h1>
            <p className="creator-lead">
              Esta calculadora es código auto generado y revisado con ayuda de IA.
            </p>
            <div className="creator-copy">
              <p>
                La idea empezó con una pregunta sencilla: ¿puede una interfaz
                mínima explicar bien lo que ocurre detrás?
              </p>
              <p>
                La respuesta tomó forma entre componentes React, estilos responsive
                y una API que hace las operaciones en la nube.
              </p>
              <p>
                La IA ayudó a proponer estructuras, detectar errores y convertir
                decisiones pequeñas en código que se puede probar.
              </p>
              <p>
                Pero cada detalle importante pasó por una revisión humana: los
                nombres, los mensajes, los límites y la experiencia al tocarlo.
              </p>
              <p>
                Por eso esta página no promete magia automática. Promete algo más
                útil: colaboración, iteración y curiosidad por entender el resultado.
              </p>
              <p>
                El proyecto sigue siendo deliberadamente pequeño para que se pueda
                leer, romper y mejorar sin perderse en capas innecesarias.
              </p>
              <p>
                Si algo aquí te inspira una idea, ya ha cumplido su objetivo.
              </p>
            </div>
          </div>

          <img
            className="creator-art"
            src={`${import.meta.env.BASE_URL}ai-calculator.svg`}
            alt="Ilustración de una calculadora creada con ayuda de inteligencia artificial"
          />
        </div>
      </article>
    </main>
  );
}
