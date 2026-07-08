/* CSPM — main.js
   Sem dependências externas. Progressive enhancement: todo o conteúdo e
   navegação funcionam sem este arquivo; ele adiciona apenas interações. */
(function () {
  "use strict";

  /* Menu mobile ------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      mobileNav.classList.toggle("is-open", !expanded);
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("is-open");
      });
    });
  }

  /* Header com sombra ao rolar ----------------------------------------*/
  var header = document.querySelector(".site-header");
  var backToTop = document.querySelector(".back-to-top");
  window.addEventListener("scroll", function () {
    if (header) header.style.boxShadow = window.scrollY > 8 ? "0 4px 16px rgba(11,61,92,0.10)" : "none";
    if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 500);
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Abas de Convênios ---------------------------------------------------*/
  var tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var group = btn.closest(".tab-group");
      var panelId = btn.getAttribute("aria-controls");
      var panel = document.getElementById(panelId);
      if (!group || !panel) return;

      group.querySelectorAll(".tab-btn").forEach(function (b) {
        b.setAttribute("aria-selected", "false");
      });
      btn.setAttribute("aria-selected", "true");

      document.querySelectorAll(".tab-panel").forEach(function (p) {
        p.hidden = true;
      });
      panel.hidden = false;
    });
  });

  /* Formulário de contato (demonstração — sem backend) ------------------*/
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      var name = form.querySelector("#nome").value.trim();
      if (!name) {
        if (status) {
          status.textContent = "Por favor, preencha os campos obrigatórios antes de enviar.";
          status.focus();
        }
        return;
      }
      var subject = encodeURIComponent("Contato pelo site — " + name);
      var bodyParts = [];
      form.querySelectorAll("input, textarea, select").forEach(function (field) {
        if (field.name && field.value) bodyParts.push(field.previousElementSibling ? field.previousElementSibling.textContent + ": " + field.value : field.value);
      });
      var body = encodeURIComponent(bodyParts.join("\n"));
      window.location.href = "mailto:atendimento@cspm.com.br?subject=" + subject + "&body=" + body;
      if (status) status.textContent = "Abrindo seu aplicativo de e-mail para concluir o envio...";
    });
  }

  /* Ano dinâmico no rodapé ---------------------------------------------*/
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
