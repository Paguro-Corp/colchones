/**
 * PAGUREO — LÓGICA DE LANDING PAGE DE PRODUCTO ÚNICO
 * Colchón Slim One: Descanso, Soporte y Bienestar
 * Embudo de Conversión Directo a WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuración Oficial de WhatsApp Pagureo
  const WHATSAPP_PHONE = '573208067748'; // Número oficial: +57 320 806 7748
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

  /* ==========================================================================
     3. VISOR INTERACTIVO LIGHTBOX (TIENDA FÍSICA: 2 IMÁGENES / PROCESO: 3 PASOS)
     ========================================================================== */
  const STORE_GALLERY_DATA = [
    {
      src: 'images/Encuéntranos en Restrepo.png',
      tag: 'TIENDA FÍSICA OFICIAL',
      title: 'Fachada Principal en el Restrepo, Bogotá',
      desc: 'Calle 20 Sur #18-14. Visítanos en nuestra tienda física para conocer de primera mano la calidad, soporte y confort del Colchón Slim One.'
    },
    {
      src: 'images/Showroom de colchones con vista urbana.png',
      tag: 'TIENDA FÍSICA • EXHIBICIÓN',
      title: 'Espacio de Exhibición y Prueba en Persona',
      desc: 'Ven y prueba en vivo la firmeza semi firme y la frescura de la tela Jacquard 100% algodón, con el acompañamiento personalizado de nuestros asesores.'
    }
  ];

  const PROCESS_GALLERY_DATA = [
    {
      src: 'images/Operario en máquina de acolchado industrial.png',
      tag: 'PROCESO • PASO 01',
      title: 'Acolchado Computarizado Sleep Green CNC',
      desc: 'Maquinaria industrial automatizada de alta precisión que acolcha la tela Jacquard con espuma D26 de alta densidad para máxima resiliencia.'
    },
    {
      src: 'images/Operario ajustando máquina de acolchado industrial.png',
      tag: 'PROCESO • PASO 02',
      title: 'Calibración Manual de Guías y Tensión',
      desc: 'Ajuste milimétrico cuadrante por cuadrante para garantizar que cada capa conserve su tensión anatómica y soporte ergonómico.'
    },
    {
      src: 'images/Costura industrial de colchón en fábrica.png',
      tag: 'PROCESO • PASO 03',
      title: 'Costura y Cerrado Perimetral Reforzado',
      desc: 'Ribeteado con cinta de alta tenacidad que encierra el núcleo resortado en acero al carbono, asegurando una estructura indeformable y doble cara.'
    }
  ];

  const galleryModal = document.getElementById('galleryModal');
  const galleryModalImg = document.getElementById('galleryModalImg');
  const galleryInfoTag = document.getElementById('galleryInfoTag');
  const galleryInfoCounter = document.getElementById('galleryInfoCounter');
  const galleryInfoTitle = document.getElementById('galleryInfoTitle');
  const galleryInfoDesc = document.getElementById('galleryInfoDesc');
  const galleryCloseBtn = document.getElementById('galleryModalClose');
  const galleryPrevBtn = document.getElementById('galleryModalPrev');
  const galleryNextBtn = document.getElementById('galleryModalNext');
  const galleryBackdrop = document.getElementById('galleryModalBackdrop');

  let activeGallery = STORE_GALLERY_DATA;
  let currentGalleryIndex = 0;

  function renderGalleryModal(index) {
    if (!activeGallery || !activeGallery.length) return;
    if (index < 0) index = activeGallery.length - 1;
    if (index >= activeGallery.length) index = 0;
    currentGalleryIndex = index;

    const item = activeGallery[currentGalleryIndex];
    if (!item) return;

    if (galleryModalImg) {
      galleryModalImg.src = item.src;
      galleryModalImg.alt = item.title;
    }
    if (galleryInfoTag) galleryInfoTag.textContent = item.tag;
    if (galleryInfoCounter) galleryInfoCounter.textContent = `${currentGalleryIndex + 1} / ${activeGallery.length}`;
    if (galleryInfoTitle) galleryInfoTitle.textContent = item.title;
    if (galleryInfoDesc) galleryInfoDesc.textContent = item.desc;
  }

  function openGalleryModal(galleryType, index) {
    if (!galleryModal) return;
    activeGallery = (galleryType === 'process') ? PROCESS_GALLERY_DATA : STORE_GALLERY_DATA;
    renderGalleryModal(index);
    galleryModal.classList.add('active');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeGalleryModal() {
    if (!galleryModal) return;
    galleryModal.classList.remove('active');
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Asignar eventos de apertura a las fotos de la tienda física (exactamente 2 fotos)
  const storeTriggers = document.querySelectorAll('[data-store-index]');
  storeTriggers.forEach(el => {
    const idx = parseInt(el.getAttribute('data-store-index'), 10);
    el.addEventListener('click', (e) => {
      if (!e.target.closest('a')) {
        openGalleryModal('store', idx);
      }
    });

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGalleryModal('store', idx);
      }
    });
  });

  // Asignar eventos de apertura a las fotos de proceso de fabricación
  const processTriggers = document.querySelectorAll('[data-process-index]');
  processTriggers.forEach(el => {
    const idx = parseInt(el.getAttribute('data-process-index'), 10);
    el.addEventListener('click', (e) => {
      if (!e.target.closest('a')) {
        openGalleryModal('process', idx);
      }
    });

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGalleryModal('process', idx);
      }
    });
  });

  if (galleryCloseBtn) {
    galleryCloseBtn.addEventListener('click', closeGalleryModal);
  }

  if (galleryBackdrop) {
    galleryBackdrop.addEventListener('click', closeGalleryModal);
  }

  if (galleryPrevBtn) {
    galleryPrevBtn.addEventListener('click', () => {
      renderGalleryModal(currentGalleryIndex - 1);
    });
  }

  if (galleryNextBtn) {
    galleryNextBtn.addEventListener('click', () => {
      renderGalleryModal(currentGalleryIndex + 1);
    });
  }

  // Navegación por teclado dentro del modal
  document.addEventListener('keydown', (e) => {
    if (!galleryModal || !galleryModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeGalleryModal();
    } else if (e.key === 'ArrowLeft') {
      renderGalleryModal(currentGalleryIndex - 1);
    } else if (e.key === 'ArrowRight') {
      renderGalleryModal(currentGalleryIndex + 1);
    }
  });

  /* ==========================================================================
     4. CARRUSEL DE LA TIENDA FÍSICA (PUNTO FÍSICO)
     ========================================================================== */
  const storeCarousel = document.getElementById('storeCarousel');
  if (storeCarousel) {
    const slides = storeCarousel.querySelectorAll('.store-slide');
    const dots = storeCarousel.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('storeCarouselPrev');
    const nextBtn = document.getElementById('storeCarouselNext');
    const counterSpan = document.querySelector('#storeCarouselCounter span:first-child');
    let currentSlide = 0;

    function goToSlide(n) {
      if (!slides.length) return;
      slides[currentSlide].classList.remove('active');
      if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');
      if (counterSpan) counterSpan.textContent = currentSlide + 1;
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentSlide - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(currentSlide + 1);
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goToSlide(idx);
      });
    });

    // Soporte para gestos táctiles simples (swipe) en móvil
    let touchStartX = 0;
    let touchEndX = 0;
    storeCarousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    storeCarousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          goToSlide(currentSlide + 1);
        } else {
          goToSlide(currentSlide - 1);
        }
      }
    }, { passive: true });
  }
});

