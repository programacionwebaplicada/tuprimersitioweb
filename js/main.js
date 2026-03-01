/* =====================================================
   JS — LANDING PAGE BIBLIOTECA
   ===================================================== */

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- SCROLL REVEAL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ---- FAQ ACORDEÓN ----
document.querySelectorAll('.faq-item').forEach(item => {
  const pregunta = item.querySelector('.faq-pregunta');
  const respuesta = item.querySelector('.faq-respuesta');
  const inner     = item.querySelector('.faq-respuesta-inner');

  pregunta.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Cierra todos los demás
    document.querySelectorAll('.faq-item.open').forEach(otro => {
      otro.classList.remove('open');
      otro.querySelector('.faq-respuesta').style.maxHeight = null;
    });

    // Abre el actual si no estaba abierto
    if (!isOpen) {
      item.classList.add('open');
      respuesta.style.maxHeight = inner.scrollHeight + 32 + 'px';
    }
  });
});

// ---- CONTADOR ANIMADO ----
function animarContador(el, hasta, duracion = 1800, prefijo = '', sufijo = '') {
  const inicio = performance.now();
  const actualizar = (ahora) => {
    const progreso = Math.min((ahora - inicio) / duracion, 1);
    const ease = 1 - Math.pow(1 - progreso, 3); // ease-out cubic
    const valor = Math.floor(ease * hasta);
    el.textContent = prefijo + valor.toLocaleString() + sufijo;
    if (progreso < 1) requestAnimationFrame(actualizar);
  };
  requestAnimationFrame(actualizar);
}

// Activar contadores cuando sean visibles
const contadorObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const meta = parseInt(el.dataset.meta, 10);
      const pref = el.dataset.pref || '';
      const suf  = el.dataset.suf  || '';
      animarContador(el, meta, 1600, pref, suf);
      contadorObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-meta]').forEach(el => {
  contadorObserver.observe(el);
});

// ---- VIDEO PLACEHOLDER → REAL ----
// Cuando el usuario hace clic en el placeholder, se muestra el iframe del video real.
// Para activar: poner el enlace de YouTube/Vimeo en el atributo data-video del wrapper.
const videoWrappers = document.querySelectorAll('.video-placeholder');
videoWrappers.forEach(placeholder => {
  placeholder.addEventListener('click', () => {
    const contenedor = placeholder.parentElement;
    const videoUrl   = contenedor.dataset.video;

    if (!videoUrl) return; // Si no hay URL configurada, no hace nada

    // Crear iframe
    const iframe = document.createElement('iframe');
    iframe.src = videoUrl + '?autoplay=1&rel=0';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;';

    placeholder.style.opacity = '0';
    placeholder.style.pointerEvents = 'none';
    setTimeout(() => {
      contenedor.appendChild(iframe);
      placeholder.remove();
    }, 300);
  });
});

// ---- SMOOTH SCROLL para botones de CTA ----
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
  enlace.addEventListener('click', e => {
    const destino = document.querySelector(enlace.getAttribute('href'));
    if (destino) {
      e.preventDefault();
      destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- EFECTO PARALLAX SUAVE en el hero ----
const heroBg = document.querySelector('.hero');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrollY * 0.25}px)`;
    }
  }, { passive: true });
}

// ---- COPIA EL PRECIO → efecto visual al hover ----
const precioFinal = document.querySelector('.precio-final');
if (precioFinal) {
  precioFinal.addEventListener('mouseenter', () => {
    precioFinal.style.textShadow = '0 0 80px rgba(201,162,39,0.8)';
  });
  precioFinal.addEventListener('mouseleave', () => {
    precioFinal.style.textShadow = '0 0 40px rgba(201,162,39,0.4)';
  });
}
