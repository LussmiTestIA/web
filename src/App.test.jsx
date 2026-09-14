/** @vitest-environment jsdom */
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App.jsx";

afterEach(cleanup);

describe("Calculadora Cloud", () => {
  it("muestra un mensaje útil si se envía sin valores", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Calcular resultado" }));

    expect(
      screen.getByText("Introduce un valor para A y otro para B."),
    ).toBeInTheDocument();
  });

  it("rechaza decimales sin llamar a la API", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<App />);

    fireEvent.change(screen.getByLabelText("Valor A"), {
      target: { value: "2.5" },
    });
    fireEvent.change(screen.getByLabelText("Valor B"), {
      target: { value: "3" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Calcular resultado" }));

    expect(
      screen.getByText(
        'El valor de A "2.5" no es válido. Solo se aceptan números enteros.',
      ),
    ).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("mantiene visible el enlace interno del creador", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: /Sobre el creador/ }).getAttribute("href"))
      .toMatch(/#creador$/);
  });
});
