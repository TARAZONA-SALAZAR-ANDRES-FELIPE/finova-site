/* ============================================================
   CONTACTO.JS
   Manejo del formulario de contacto en el mockup. Se carga
   únicamente en contacto.html, después de main.js.

   NOTA PARA DESARROLLO FUTURO:
   Aquí solo se simula el envío (no hay backend en el mockup).
   Al integrar el backend, reemplazar el bloque marcado más abajo
   por un fetch() real hacia el endpoint correspondiente, ej:

   fetch('/api/contacto', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(Object.fromEntries(new FormData(form)))
   })

   El formulario ya usa atributos name/id/required listos para
   ese cambio, sin tener que rehacer el markup.
   ============================================================ */

(function () {
  "use strict";

  const form = document.getElementById("contactForm");
  const statusBox = document.getElementById("formStatus");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // --- INICIO: simulación de envío (mockup, sin backend) ---
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    setTimeout(function () {
      statusBox.textContent = "¡Mensaje enviado! Te responderemos muy pronto a tu correo.";
      statusBox.classList.add("show");
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }, 700);
    // --- FIN: simulación de envío ---
  });
})();
