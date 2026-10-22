/**
 * THE DECO HOUSE - INTERACTION LOGIC
 * Luxury Architectural Materials & Interior Solutions
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Header scroll styling & smooth navbar
  // -------------------------------------------------------------------------
  const siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });

    // Close when clicking nav link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
      });
    });
  }

  // -------------------------------------------------------------------------
  // 2. Hero Interactive Slider (01 / 03)
  // -------------------------------------------------------------------------
  const heroCounter = document.getElementById('hero-counter');
  const heroProgress = document.getElementById('hero-progress');
  const heroTitle = document.getElementById('hero-title');
  const heroPretitle = document.getElementById('hero-pretitle');
  const heroDesc = document.getElementById('hero-desc');
  const heroBgSlides = document.querySelectorAll('.hero-bg-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  const vtagLinks = document.querySelectorAll('.hero-vertical-tag .vtag-link');

  const heroSlides = [
    {
      counter: '01 / 03',
      progress: '33.33%',
      pretitle: 'ARCHITECTURAL SURFACES<br>FOR A MORE EXTRAORDINARY<br>TOMORROW',
      titleHtml: '<span>ELEVATED</span><span>SPACES.</span>',
      desc: "The Deco House brings the world's finest surfaces, materials and solutions together to inspire extraordinary spaces for architects, designers and discerning homeowners."
    },
    {
      counter: '02 / 03',
      progress: '66.66%',
      pretitle: 'CURATED LIVING SPACES<br>DESIGNED FOR ENDURING<br>CALM &amp; ELEGANCE',
      titleHtml: '<span>INSPIRED</span><span>HORIZONS.</span>',
      desc: 'From private villas to landmark residences, our materials harmonize architecture with the natural world, creating spaces of understated distinction.'
    },
    {
      counter: '03 / 03',
      progress: '100%',
      pretitle: 'END-TO-END SPECIFICATION<br>COLLABORATIVE ARCHITECTURAL<br>SOLUTIONS',
      titleHtml: '<span>MATERIAL</span><span>MASTERY.</span>',
      desc: 'We bridge architectural ambition and seamless realization with technical specification data, physical sample libraries, and specialized installation protocols.'
    }
  ];

  let currentSlide = 0;
  let heroTimer = null;

  function setHeroSlide(index) {
    currentSlide = index;
    const slide = heroSlides[index];

    if (heroCounter) heroCounter.textContent = slide.counter;
    if (heroProgress) heroProgress.style.width = slide.progress;

    // Update background image slides cross-fade
    heroBgSlides.forEach((bgSlide, idx) => {
      bgSlide.classList.toggle('active', idx === index);
    });

    // Update dots
    heroDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });

    // Update vertical indicator tags
    vtagLinks.forEach((link, idx) => {
      link.classList.toggle('active', idx === index);
    });

    if (heroTitle) {
      heroTitle.style.opacity = '0';
      heroTitle.style.transform = 'translateY(6px)';
      setTimeout(() => {
        heroTitle.innerHTML = slide.titleHtml;
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
      }, 160);
    }

    if (heroPretitle) {
      heroPretitle.style.opacity = '0';
      setTimeout(() => {
        heroPretitle.innerHTML = slide.pretitle;
        heroPretitle.style.opacity = '1';
      }, 160);
    }

    if (heroDesc) {
      heroDesc.style.opacity = '0';
      setTimeout(() => {
        heroDesc.innerHTML = slide.desc;
        heroDesc.style.opacity = '1';
      }, 160);
    }
  }

  // Dots click listeners
  heroDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      setHeroSlide(idx);
      resetHeroAutoTimer();
    });
  });

  // Vertical tag click listeners
  vtagLinks.forEach((link, idx) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      setHeroSlide(idx);
      resetHeroAutoTimer();
    });
  });

  function startHeroAutoTimer() {
    heroTimer = setInterval(() => {
      const nextSlide = (currentSlide + 1) % heroSlides.length;
      setHeroSlide(nextSlide);
    }, 7000);
  }

  function resetHeroAutoTimer() {
    if (heroTimer) clearInterval(heroTimer);
    startHeroAutoTimer();
  }

  startHeroAutoTimer();

  // -------------------------------------------------------------------------
  // 3. Material Filter Tabs
  // -------------------------------------------------------------------------
  const filterTabs = document.querySelectorAll('.tab-btn');
  const materialCards = document.querySelectorAll('.material-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');
      materialCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal || filterVal === 'stone') {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.opacity = '0.45';
          card.style.transform = 'scale(0.98)';
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 4. Projects Carousel Controls (01, 02, 03)
  // -------------------------------------------------------------------------
  const projPrevBtn = document.getElementById('proj-prev-btn');
  const projNextBtn = document.getElementById('proj-next-btn');
  const projPages = [
    document.getElementById('proj-page-01'),
    document.getElementById('proj-page-02'),
    document.getElementById('proj-page-03')
  ];
  const projectCards = document.querySelectorAll('.project-card');
  let currentProjectPage = 0;

  function updateProjectPage(pageIdx) {
    currentProjectPage = pageIdx;
    projPages.forEach((p, idx) => {
      if (p) p.classList.toggle('active', idx === pageIdx);
    });

    projectCards.forEach((card, idx) => {
      card.style.transition = 'all 0.4s ease';
      if (idx === pageIdx) {
        card.style.boxShadow = '0 18px 40px rgba(180, 161, 122, 0.25)';
        card.style.transform = 'translateY(-8px)';
      } else {
        card.style.boxShadow = '0 10px 28px rgba(36, 25, 35, 0.08)';
        card.style.transform = 'translateY(0)';
      }
    });
  }

  if (projPrevBtn && projNextBtn) {
    projPrevBtn.addEventListener('click', () => {
      const prev = (currentProjectPage - 1 + projPages.length) % projPages.length;
      updateProjectPage(prev);
    });

    projNextBtn.addEventListener('click', () => {
      const next = (currentProjectPage + 1) % projPages.length;
      updateProjectPage(next);
    });

    projPages.forEach((pageIndicator, idx) => {
      if (pageIndicator) {
        pageIndicator.addEventListener('click', () => updateProjectPage(idx));
      }
    });
  }

  // -------------------------------------------------------------------------
  // 5. Toast Notifications Helper
  // -------------------------------------------------------------------------
  const toastNotice = document.getElementById('toast-notice');
  function showToast(message) {
    if (!toastNotice) return;
    toastNotice.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 4500);
  }

  // -------------------------------------------------------------------------
  // 6. Consultation Booking Modal
  // -------------------------------------------------------------------------
  const consultModal = document.getElementById('consultation-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const consultBtns = document.querySelectorAll('.open-consult-modal-btn');
  const consultForm = document.getElementById('consult-form');

  consultBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (consultModal) consultModal.classList.add('active');
    });
  });

  if (modalCloseBtn && consultModal) {
    modalCloseBtn.addEventListener('click', () => {
      consultModal.classList.remove('active');
    });

    consultModal.addEventListener('click', (e) => {
      if (e.target === consultModal) consultModal.classList.remove('active');
    });
  }

  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('consult-name')?.value || 'Guest';
      if (consultModal) consultModal.classList.remove('active');
      consultForm.reset();
      showToast(`Thank you, ${name}. Your consultation request has been reserved.`);
    });
  }

  // -------------------------------------------------------------------------
  // 7. Search Modal
  // -------------------------------------------------------------------------
  const searchBtn = document.getElementById('search-btn');
  const searchModal = document.getElementById('search-modal');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchInput = document.getElementById('search-input');

  if (searchBtn && searchModal) {
    searchBtn.addEventListener('click', () => {
      searchModal.classList.add('active');
      setTimeout(() => searchInput?.focus(), 100);
    });
  }

  if (searchCloseBtn && searchModal) {
    searchCloseBtn.addEventListener('click', () => {
      searchModal.classList.remove('active');
    });

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) searchModal.classList.remove('active');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.toLowerCase().trim();
      const resBox = document.getElementById('search-results-box');
      if (!resBox) return;

      if (val.length === 0) {
        resBox.innerHTML = '<p>Suggested searches: <em>Calacatta Marble, Brushed Brass Handles, Fluted Acoustic Panels, Singapore Showroom</em></p>';
      } else {
        resBox.innerHTML = `
          <div style="padding: 10px 0; border-top: 1px solid rgba(55,51,47,0.1);">
            <p><strong>Found matches for "${val}":</strong></p>
            <ul style="margin-top: 8px; padding-left: 18px; line-height: 1.8;">
              <li><a href="#materials" style="color: #241923; text-decoration: underline;">Natural Stone Selection &mdash; Calacatta &amp; Onyx Veining</a></li>
              <li><a href="#materials" style="color: #241923; text-decoration: underline;">Architectural Hardware &mdash; Brushed Champagne Brass</a></li>
              <li><a href="#projects" style="color: #241923; text-decoration: underline;">Riverside Residence Case Study</a></li>
            </ul>
          </div>
        `;
      }
    });
  }

  // -------------------------------------------------------------------------
  // 8. Newsletter Subscription Form
  // -------------------------------------------------------------------------
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      const email = emailInput?.value || '';
      if (email) {
        showToast(`Thank you for subscribing (${email}). Welcome to The Deco House journal.`);
        newsletterForm.reset();
      }
    });
  }

  // -------------------------------------------------------------------------
  // 9. Material Modal & Journal Quick-View Modals
  // -------------------------------------------------------------------------
  const materialLinks = document.querySelectorAll('.open-material-modal');
  materialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const title = link.getAttribute('data-title');
      const desc = link.getAttribute('data-desc');
      showToast(`${title}: ${desc}`);
    });
  });

  const journalLinks = document.querySelectorAll('.open-journal-modal');
  journalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const title = link.getAttribute('data-title');
      showToast(`Article: ${title}`);
    });
  });

  // -------------------------------------------------------------------------
  // 10. Scroll Progress Bar & Back to Top Controller
  // -------------------------------------------------------------------------
  const progressBar = document.getElementById('scroll-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  function updateScrollMetrics() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${Math.min(100, Math.max(0, progressPercent))}%`;
    }

    if (backToTopBtn) {
      if (scrollTop > 380) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', updateScrollMetrics, { passive: true });
  updateScrollMetrics();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------------------
  // 11. Intersection Observer Scroll Reveal System
  // -------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // -------------------------------------------------------------------------
  // 12. Active Nav Highlighting on Scroll (Scrollspy)
  // -------------------------------------------------------------------------
  const navSections = [
    { id: 'hero', link: document.querySelector('.main-nav a[href="#hero"]') },
    { id: 'about', link: document.querySelector('.main-nav a[href="#about"]') },
    { id: 'materials', link: document.querySelector('.main-nav a[href="#materials"]') },
    { id: 'details', link: document.querySelector('.main-nav a[href="#details"]') },
    { id: 'projects', link: document.querySelector('.main-nav a[href="#projects"]') },
    { id: 'journal', link: document.querySelector('.main-nav a[href="#journal"]') },
    { id: 'consultation', link: document.querySelector('.main-nav a[href="#consultation"]') }
  ];

  function updateScrollspy() {
    const scrollPosition = window.scrollY + 140; // Offset for sticky navbar height
    let currentId = 'hero';

    navSections.forEach(section => {
      const el = document.getElementById(section.id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          currentId = section.id;
        }
      }
    });

    navSections.forEach(section => {
      if (section.link) {
        if (section.id === currentId) {
          section.link.classList.add('active');
        } else {
          section.link.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateScrollspy, { passive: true });
  updateScrollspy();

  // -------------------------------------------------------------------------
  // 13. Interactive 3D Card Tilt on Mousemove
  // -------------------------------------------------------------------------
  const tiltCards = document.querySelectorAll('.material-card, .project-card, .why-pillar-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3.5;
      const rotateY = ((x - centerX) / centerX) * 3.5;

      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // -------------------------------------------------------------------------
  // 14. Smooth Scroll for Anchor Links with Header Offset
  // -------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#' || targetId === '#!') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 64;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
