/* ============================================================
   PROGRESS.JS
   Guarda y lee el progreso de actividades en localStorage, para
   que cada persona conserve sus avances en su propio navegador
   aunque cierre la página y vuelva más tarde.

   Se carga ANTES de cards-progress.js y de modulo.js en cualquier
   página que necesite leer o escribir progreso.

   NOTA PARA DESARROLLO FUTURO:
   Toda la lógica pasa por las funciones de este archivo, así que
   cuando exista backend + cuentas de usuario, basta con cambiar
   estas funciones para que lean/escriban contra una API en lugar
   de localStorage — el resto del sitio no tiene que cambiar.
   ============================================================ */

(function (window) {
  "use strict";

  const STORAGE_KEY = "finova_progress_v1";

  function safeParse(json) {
    try {
      const value = JSON.parse(json);
      return value && typeof value === "object" ? value : {};
    } catch (e) {
      return {};
    }
  }

  function readStore() {
    try {
      return safeParse(localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      // localStorage puede fallar en navegación privada o si está bloqueado.
      return {};
    }
  }

  function writeStore(store) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      return true;
    } catch (e) {
      return false;
    }
  }

  /** Marca (o desmarca) una actividad como completada. */
  function setActivityDone(moduleId, activityId, done) {
    const store = readStore();
    if (!store[moduleId]) store[moduleId] = {};
    store[moduleId][activityId] = !!done;
    writeStore(store);
  }

  /** true/false: ¿esta actividad puntual ya está resuelta? */
  function isActivityDone(moduleId, activityId) {
    const store = readStore();
    return !!(store[moduleId] && store[moduleId][activityId]);
  }

  /** Cuenta cuántas actividades de un módulo están completas. */
  function countDone(moduleId, activityIds) {
    const store = readStore();
    const modStore = store[moduleId] || {};
    return activityIds.reduce((total, id) => total + (modStore[id] ? 1 : 0), 0);
  }

  /** Borra el progreso de un módulo puntual. */
  function resetModule(moduleId) {
    const store = readStore();
    delete store[moduleId];
    writeStore(store);
  }

  /** Progreso general del sitio: actividades completas / totales. */
  function getOverallProgress(modules) {
    let done = 0;
    let total = 0;
    modules.forEach(function (mod) {
      total += mod.activities.length;
      done += countDone(mod.id, mod.activities.map(function (a) { return a.id; }));
    });
    return { done: done, total: total };
  }

  window.FinovaProgress = {
    setActivityDone: setActivityDone,
    isActivityDone: isActivityDone,
    countDone: countDone,
    resetModule: resetModule,
    getOverallProgress: getOverallProgress
  };
})(window);
