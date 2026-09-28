/* ============================================================
   MAIN.JS
   Comportamiento compartido por TODAS las páginas del sitio:
   - Header sticky con sombra al hacer scroll
   - Menú hamburguesa (abrir / cerrar / cerrar al elegir enlace)
   - Animación de revelado al hacer scroll (IntersectionObserver)

   Se carga con <script src="js/main.js" defer></script> en
   cada página. No depende de ningún otro archivo.
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     Header: sombra al hacer scroll
     ---------------------------------------------------------- */
  const header = document.getElementById("siteHeader");

  function updateHeaderShadow() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 12);
  }

  window.addEventListener("scroll", updateHeaderShadow, { passive: true });
  updateHeaderShadow();

  /* ----------------------------------------------------------
     Menú hamburguesa (mobile)
     ---------------------------------------------------------- */
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", function () {
      const isOpen = mobileMenu.classList.toggle("open");
      hamburgerBtn.classList.toggle("active", isOpen);
      hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
    });

    // Cierra el menú móvil al elegir un enlace
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
        hamburgerBtn.classList.remove("active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ----------------------------------------------------------
     Revelado suave al hacer scroll
     Cualquier elemento con la clase .reveal en el HTML se anima
     automáticamente la primera vez que entra en el viewport.
     ---------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(".reveal");

  if (revealTargets.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Sin soporte de IntersectionObserver: mostrar todo de una vez
    revealTargets.forEach(function (el) {
      el.classList.add("in");
    });
  }
})();
