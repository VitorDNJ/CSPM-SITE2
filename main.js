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

  /* Carrossel do hero ---------------------------------------------------*/
  var heroCarousel = document.getElementById("hero-carousel");
  if (heroCarousel) {
    var slides = Array.prototype.slice.call(heroCarousel.querySelectorAll(".hero-carousel__slide"));
    var dotsWrap = heroCarousel.querySelector(".hero-carousel__dots");
    var prevBtn = heroCarousel.querySelector(".hero-carousel__arrow--prev");
    var nextBtn = heroCarousel.querySelector(".hero-carousel__arrow--next");
    var current = slides.findIndex(function (s) { return s.classList.contains("is-active"); });
    if (current < 0) current = 0;
    var timer = null;

    if (slides.length <= 1) {
      heroCarousel.classList.add("hero-carousel--single");
    } else {
      slides.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "hero-carousel__dot" + (i === current ? " is-active" : "");
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", "Ir para imagem " + (i + 1));
        dot.addEventListener("click", function () { goTo(i, true); });
        dotsWrap.appendChild(dot);
      });

      var dots = Array.prototype.slice.call(dotsWrap.querySelectorAll(".hero-carousel__dot"));

      function render() {
        slides.forEach(function (s, i) { s.classList.toggle("is-active", i === current); });
        dots.forEach(function (d, i) { d.classList.toggle("is-active", i === current); });
      }

      function goTo(index, userTriggered) {
        current = (index + slides.length) % slides.length;
        render();
        if (userTriggered) restart();
      }

      function next() { goTo(current + 1); }

      function restart() {
        if (timer) clearInterval(timer);
        timer = setInterval(next, 4000);
      }

      if (prevBtn) prevBtn.addEventListener("click", function () { goTo(current - 1, true); });
      if (nextBtn) nextBtn.addEventListener("click", function () { goTo(current + 1, true); });

      heroCarousel.addEventListener("mouseenter", function () { if (timer) clearInterval(timer); });
      heroCarousel.addEventListener("mouseleave", restart);

      render();
      restart();
    }
  }

  /* Ano dinâmico no rodapé ---------------------------------------------*/
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Timeline — Histórico: animação de entrada -----------------------*/
  var timelineItems = document.querySelectorAll(".timeline__item");
  if (timelineItems.length) {
    if ("IntersectionObserver" in window) {
      var timelineObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              timelineObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
      );
      timelineItems.forEach(function (item, i) {
        item.style.transitionDelay = (i * 90) + "ms";
        timelineObserver.observe(item);
      });
    } else {
      timelineItems.forEach(function (item) { item.classList.add("is-visible"); });
    }
  }
})();


  
  

  