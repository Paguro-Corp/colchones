/**
 * PAGUREO — LÓGICA DE LANDING PAGE DE PRODUCTO ÚNICO
 * Colchón Slim One: Descanso, Soporte y Bienestar
 * Embudo de Conversión Directo a WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuración Oficial de WhatsApp Pagureo
  const WHATSAPP_PHONE = '573184625453'; // Número oficial: +57 318 462 5453
  const WHATSAPP_DEFAULT_MSG = encodeURIComponent(
    'Hola Pagureo, vi el Colchón Slim One en la página y quiero recibir más información.'
  );
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_DEFAULT_MSG}`;

  // Sincronizar enlaces y botones de WhatsApp (conservando mensajes específicos si ya están definidos)
  const whatsappButtons = document.querySelectorAll('a[href="#whatsapp"], [data-whatsapp-cta]');
  whatsappButtons.forEach(btn => {
    const currentHref = btn.getAttribute('href');
    if (!currentHref || currentHref === '#whatsapp') {
      btn.setAttribute('href', WHATSAPP_URL);
    }
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  /* ==========================================================================
     1. BARRA MÓVIL DE CONVERSIÓN FLOTANTE (ON SCROLL)
     ========================================================================== */
  const stickyMobileBar = document.getElementById('stickyMobileBar');
  const heroSection = document.getElementById('inicio');

  if (stickyMobileBar && heroSection) {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight - 140;
      if (scrollY > heroBottom) {
        stickyMobileBar.classList.add('visible');
      } else {
        stickyMobileBar.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on load
  }

  /* ==========================================================================
     2. ACORDEÓN PREGUNTAS FRECUENTES (FAQ)
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Cerrar otros acordeones para mantener orden visual
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherContent = otherItem.querySelector('.faq-content');
            if (otherContent) {
              otherContent.style.maxHeight = null;
            }
          }
        });

        // Alternar el actual
        if (isActive) {
          item.classList.remove('active');
          content.style.maxHeight = null;
        } else {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });

  // Abrir la primera pregunta por defecto para mostrar contenido inmediatamente
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    firstItem.classList.add('active');
    const firstContent = firstItem.querySelector('.faq-content');
    if (firstContent) {
      firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
    }
  }
});
