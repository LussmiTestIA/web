import { expect, test } from "@playwright/test";

test.describe("Feature: calcular operaciones", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/v1/api/calculadora**", async (route) => {
      const requestUrl = new URL(route.request().url());
      const a = Number(requestUrl.searchParams.get("a"));
      const b = Number(requestUrl.searchParams.get("b"));
      const operacion = requestUrl.searchParams.get("operacion");
      const resultado = operacion === "restar" ? a - b : a + b;

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ resultado }),
      });
    });
  });

  test("mantiene el formulario dentro de la pantalla móvil", async ({ page }) => {
    await page.goto("./");

    await expect(page.getByRole("heading", { name: "Calculadora Cloud" })).toBeVisible();

    const viewportWidth = page.viewportSize().width;
    for (const input of await page.locator("input").all()) {
      const box = await input.boundingBox();
      expect(box).not.toBeNull();
      expect(box.x + box.width).toBeLessThanOrEqual(viewportWidth);
    }

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });

  test("Scenario: suma 1 y 2 y muestra 3", async ({ page }) => {
    await page.goto("./");

    // Given A vale 1, B vale 2 y la operación es sumar.
    await page.getByLabel("Valor A").fill("1");
    await page.getByLabel("Valor B").fill("2");
    await page.getByLabel("Operación").selectOption("sumar");

    // When se solicita el cálculo.
    await page.getByRole("button", { name: "Calcular resultado" }).click();

    // Then el resultado esperado es 3.
    await expect(page.locator(".result-panel strong")).toHaveText("3");
  });

  test("Scenario: resta 4 y 3 y muestra 1", async ({ page }) => {
    await page.goto("./");

    // Given A vale 4, B vale 3 y la operación es restar.
    await page.getByLabel("Valor A").fill("4");
    await page.getByLabel("Valor B").fill("3");
    await page.getByLabel("Operación").selectOption("restar");

    // When se solicita el cálculo.
    await page.getByRole("button", { name: "Calcular resultado" }).click();

    // Then el resultado esperado es 1.
    await expect(page.locator(".result-panel strong")).toHaveText("1");
  });

  test("Scenario: muestra el error y abre la página del creador", async ({ page }) => {
    await page.goto("./");

    await page.getByRole("button", { name: "Calcular resultado" }).click();
    await expect(
      page.getByText("Introduce un valor para A y otro para B."),
    ).toBeVisible();

    await page.getByRole("link", { name: /Sobre el creador/ }).click();
    await expect(
      page.getByRole("heading", { name: "Un pequeño experimento con una gran ayuda." }),
    ).toBeVisible();
    await expect(page.getByText(/código auto generado y revisado con ayuda de IA/)).toBeVisible();
  });
});
