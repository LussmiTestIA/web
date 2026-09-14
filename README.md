# Calculadora Cloud

## Entornos y despliegues

El proyecto usa GitHub Actions y GitHub Pages con este flujo:

| Entorno | Cómo se despliega | URL |
| --- | --- | --- |
| Test | Cada PR propia hacia `develop` o `main` | `https://LussmiTestIA.github.io/web/test/pr-<numero>/` |
| Staging | Push o merge a `develop` | `https://LussmiTestIA.github.io/web/staging/` |
| Producción | Push o merge a `main` | `https://LussmiTestIA.github.io/web/` |

En una PR, el job `quality` ejecuta tests unitarios, Playwright, lint y build.
Solo si todo pasa se publica la preview de test. Al integrar en `develop` se
publica staging; al integrar en `main` se publica producción.

Para activar el sitio, configura **Settings > Pages** con `Deploy from a branch`,
rama `gh-pages` y carpeta `/(root)`. La acción conserva las carpetas de los tres
entornos dentro de esa rama.

Los entornos de GitHub se llaman `test`, `test-pr-<numero>`, `staging` y
`production`. En **Settings > Environments > production** puedes añadir
aprobadores obligatorios para que producción requiera un go manual.

También se puede lanzar `Deploy environments` manualmente desde **Actions > Run
workflow**, seleccionando `staging` o `production`.

## Comandos locales

```bash
npm run dev
npm test
npm run test:e2e
npm run lint
npm run build:test
npm run build:staging
npm run build:prod
```

---

## Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
