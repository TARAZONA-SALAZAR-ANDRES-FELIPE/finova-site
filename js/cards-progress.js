/* ============================================================
   CARDS-PROGRESS.JS
   Pinta una mini barra de progreso dentro de cada tarjeta de
   módulo, leyendo el avance guardado en localStorage.

   Requiere que ya estén cargados: module-data.js y progress.js.
   Se usa en: modulos.html y test.html (páginas con tarjetas).

   Cada tarjeta debe tener un contenedor:
   <div class="module-progress" data-module-id="asientos"></div>
   Este script rellena ese contenedor con la barra + el texto.
   ============================================================ */

(function () {
  "use strict";

  if (!window.FinovaProgress || !window.FINOVA_MODULES) return;

  const containers = document.querySelectorAll(".module-progress[data-module-id]");
  if (!containers.length) return;

  const modulesById = {};
  window.FINOVA_MODULES.forEach(function (mod) {
    modulesById[mod.id] = mod;
  });

  containers.forEach(function (container) {
    const moduleId = container.dataset.moduleId;
    const mod = modulesById[moduleId];
    if (!mod) return;

    const activityIds = mod.activities.map(function (a) { return a.id; });
    const done = window.FinovaProgress.countDone(moduleId, activityIds);
    const total = activityIds.length;
    const pct = total ? Math.round((done / total) * 100) : 0;

    container.innerHTML =
      '<div class="module-progress-bar"><div class="module-progress-fill" style="width:' + pct + '%"></div></div>' +
      '<span class="module-progress-text">' + done + '/' + total + ' actividades' + (pct === 100 ? ' · ¡Completo! ✓' : '') + '</span>';

    if (pct === 100) container.classList.add("is-complete");
  });
})();
