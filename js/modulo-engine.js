/* ============================================================
   MODULO-ENGINE.JS
   Motor genérico de la página de módulo (modulo.html). Lee el
   parámetro ?id= de la URL, busca el módulo en window.FINOVA_MODULES
   y construye la teoría + las actividades interactivas.

   Cada actividad, al responderse correctamente, se guarda con
   FinovaProgress.setActivityDone() (persistente en localStorage)
   y la barra de progreso del módulo se actualiza en vivo.

   Requiere: module-data.js y progress.js cargados antes que este.
   ============================================================ */

(function () {
  "use strict";

  if (!window.FINOVA_MODULES || !window.FinovaProgress) return;

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  const moduleId = getParam("id");
  const mod = window.FINOVA_MODULES.find(function (m) { return m.id === moduleId; });

  const root = document.getElementById("moduloRoot");
  const notFound = document.getElementById("moduloNotFound");

  if (!mod) {
    if (notFound) notFound.hidden = false;
    if (root) root.hidden = true;
    return;
  }

  const levelLabels = { basico: "Básico", intermedio: "Intermedio", avanzado: "Avanzado", practico: "Práctico" };
  const categoryInfo = {
    contabilidad: { label: "Contabilidad", backHref: "modulos.html", backLabel: "Módulos" },
    finanzas: { label: "Finanzas personales", backHref: "test.html", backLabel: "Módulos de Finanzas" }
  };
  const cat = categoryInfo[mod.category] || categoryInfo.contabilidad;
  const activityIds = mod.activities.map(function (a) { return a.id; });

  /* ---------------------------------------------------------
     1. Cabecera: breadcrumb, título, badges
     --------------------------------------------------------- */
  document.title = mod.title + " — FINOVA";

  document.getElementById("moduloBreadcrumbCat").textContent = cat.label;
  document.getElementById("moduloBreadcrumbCat").href = cat.backHref;
  document.getElementById("moduloCode").textContent = mod.code;
  document.getElementById("moduloLevel").textContent = levelLabels[mod.level] || mod.level;
  document.getElementById("moduloLevel").className = "level-badge level-" + mod.level;
  document.getElementById("moduloTitle").textContent = mod.title;
  document.getElementById("moduloSummary").textContent = mod.summary;
  document.getElementById("moduloIcon").innerHTML = mod.icon;
  document.getElementById("moduloBackLink").href = cat.backHref;
  document.getElementById("moduloBackLink").textContent = "← Volver a " + cat.backLabel;

  /* ---------------------------------------------------------
     2. Teoría
     --------------------------------------------------------- */
  const theoryEl = document.getElementById("moduloTheory");
  theoryEl.innerHTML = mod.theory.map(function (block) {
    return (
      '<div class="theory-block">' +
        '<h3>' + block.heading + "</h3>" +
        "<p>" + block.body + "</p>" +
      "</div>"
    );
  }).join("");

  /* ---------------------------------------------------------
     3. Barra de progreso del módulo
     --------------------------------------------------------- */
  const progressFill = document.getElementById("moduloProgressFill");
  const progressText = document.getElementById("moduloProgressText");

  function refreshProgress() {
    const done = window.FinovaProgress.countDone(mod.id, activityIds);
    const total = activityIds.length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    progressFill.style.width = pct + "%";
    progressText.textContent = done + "/" + total + " actividades completadas";
    document.getElementById("moduloProgressWrap").classList.toggle("is-complete", pct === 100);
    document.getElementById("moduloCompleteBanner").hidden = pct !== 100;
    return { done: done, total: total, pct: pct };
  }

  /* ---------------------------------------------------------
     4. Actividades
     --------------------------------------------------------- */
  const activitiesEl = document.getElementById("moduloActivities");

  mod.activities.forEach(function (activity, index) {
    const card = document.createElement("article");
    card.className = "activity-card";
    card.id = "activity-" + activity.id;

    const alreadyDone = window.FinovaProgress.isActivityDone(mod.id, activity.id);
    if (alreadyDone) card.classList.add("is-done");

    let bodyHtml = "";

    if (activity.type === "mcq") {
      bodyHtml =
        '<div class="activity-options" role="group">' +
        activity.options.map(function (opt, i) {
          return (
            '<button type="button" class="activity-option" data-index="' + i + '">' +
              '<span class="letter">' + String.fromCharCode(65 + i) + "</span>" +
              "<span>" + opt + "</span>" +
            "</button>"
          );
        }).join("") +
        "</div>";
    } else if (activity.type === "truefalse") {
      bodyHtml =
        '<div class="activity-options activity-options-tf" role="group">' +
          '<button type="button" class="activity-option" data-value="true"><span class="letter">V</span><span>Verdadero</span></button>' +
          '<button type="button" class="activity-option" data-value="false"><span class="letter">F</span><span>Falso</span></button>' +
        "</div>";
    } else if (activity.type === "numeric") {
      bodyHtml =
        '<div class="activity-numeric">' +
          (activity.unit ? '<span class="activity-numeric-unit">' + activity.unit + "</span>" : "") +
          '<input type="number" inputmode="numeric" class="activity-input" placeholder="Escribe el valor">' +
          '<button type="button" class="btn btn-primary activity-check">Verificar</button>' +
        "</div>";
    }

    card.innerHTML =
      '<div class="activity-head">' +
        '<span class="activity-num">Actividad ' + (index + 1) + "</span>" +
        '<span class="activity-status" data-role="status">' + (alreadyDone ? "✓ Completada" : "Pendiente") + "</span>" +
      "</div>" +
      "<p class=\"activity-prompt\">" + activity.prompt + "</p>" +
      bodyHtml +
      '<div class="activity-feedback" data-role="feedback"></div>';

    activitiesEl.appendChild(card);

    const statusEl = card.querySelector('[data-role="status"]');
    const feedbackEl = card.querySelector('[data-role="feedback"]');

    function markSolved(correct) {
      feedbackEl.classList.add("show", correct ? "ok" : "bad");
      feedbackEl.textContent = correct ? "¡Correcto! " + activity.explanation : "No es correcto. " + activity.explanation;

      if (correct) {
        card.classList.add("is-done");
        statusEl.textContent = "✓ Completada";
        window.FinovaProgress.setActivityDone(mod.id, activity.id, true);
        refreshProgress();
      }
    }

    if (activity.type === "mcq" || activity.type === "truefalse") {
      const buttons = card.querySelectorAll(".activity-option");
      buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (card.classList.contains("is-locked")) return;

          let correct;
          if (activity.type === "mcq") {
            correct = Number(btn.dataset.index) === activity.correctIndex;
          } else {
            correct = (btn.dataset.value === "true") === activity.correct;
          }

          buttons.forEach(function (b) { b.disabled = true; });
          btn.classList.add(correct ? "correct" : "incorrect");

          if (!correct) {
            // Marca también la opción correcta para que el estudiante la vea.
            if (activity.type === "mcq") {
              buttons[activity.correctIndex].classList.add("correct");
            } else {
              const correctBtn = Array.prototype.find.call(buttons, function (b) {
                return (b.dataset.value === "true") === activity.correct;
              });
              if (correctBtn) correctBtn.classList.add("correct");
            }
            card.classList.add("is-locked");
            // Permite reintentar tras 1.4s
            setTimeout(function () {
              buttons.forEach(function (b) {
                b.disabled = false;
                b.classList.remove("correct", "incorrect");
              });
              card.classList.remove("is-locked");
            }, 1400);
          }

          markSolved(correct);
        });
      });
    } else if (activity.type === "numeric") {
      const input = card.querySelector(".activity-input");
      const checkBtn = card.querySelector(".activity-check");
      checkBtn.addEventListener("click", function () {
        const value = parseFloat(input.value);
        const tolerance = activity.tolerance || 0;
        const correct = !isNaN(value) && Math.abs(value - activity.correctValue) <= tolerance;
        markSolved(correct);
        input.style.borderColor = correct ? "var(--verde)" : "var(--rojo-margen)";
      });
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") checkBtn.click();
      });
    }
  });

  /* ---------------------------------------------------------
     5. Botón "Reiniciar progreso de este módulo"
     --------------------------------------------------------- */
  const resetBtn = document.getElementById("moduloResetBtn");
  resetBtn.addEventListener("click", function () {
    window.FinovaProgress.resetModule(mod.id);
    activitiesEl.querySelectorAll(".activity-card").forEach(function (card) {
      card.classList.remove("is-done", "is-locked");
      card.querySelectorAll(".activity-option").forEach(function (b) {
        b.disabled = false;
        b.classList.remove("correct", "incorrect");
      });
      const input = card.querySelector(".activity-input");
      if (input) { input.value = ""; input.style.borderColor = ""; }
      card.querySelector('[data-role="status"]').textContent = "Pendiente";
      const fb = card.querySelector('[data-role="feedback"]');
      fb.className = "activity-feedback";
      fb.textContent = "";
    });
    refreshProgress();
  });

  /* Estado inicial */
  root.hidden = false;
  refreshProgress();
})();
