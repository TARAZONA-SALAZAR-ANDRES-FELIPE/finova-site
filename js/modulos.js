/* ============================================================
   MODULOS.JS
   Filtro por nivel en la grilla de módulos. Se carga únicamente
   en modulos.html, después de main.js.
   ============================================================ */

(function () {
  "use strict";

  const filterBar = document.getElementById("filterBar");
  const moduleGrid = document.getElementById("moduleGrid");

  if (!filterBar || !moduleGrid) return;

  const chips = filterBar.querySelectorAll(".filter-chip");
  const cards = moduleGrid.querySelectorAll(".module-card");

  filterBar.addEventListener("click", function (event) {
    const chip = event.target.closest(".filter-chip");
    if (!chip) return;

    chips.forEach(function (c) {
      c.classList.remove("active");
    });
    chip.classList.add("active");

    const level = chip.dataset.level; // "todos" | "basico" | "intermedio" | "avanzado" | "practico"

    cards.forEach(function (card) {
      const matches = level === "todos" || card.dataset.level === level;
      card.hidden = !matches;
    });
  });
})();
