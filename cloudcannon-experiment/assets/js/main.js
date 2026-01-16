// ==========================================
// JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  // Navigation scroll effect
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Fade-in animation on scroll
  const fadeElements = document.querySelectorAll('.fade-in');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');
    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Modal
  const modal = document.getElementById('course-modal');
  if (modal) {
    const modalClose = modal.querySelector('.modal__close');
    const modalTriggers = document.querySelectorAll('[data-open-modal="course-modal"]');
    const courseForm = document.getElementById('course-form');
    const courseFormContainer = document.getElementById('course-form-container');
    const courseSuccess = document.getElementById('course-success');

    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    modalClose.addEventListener('click', function() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    if (courseForm) {
      courseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the email to your backend
        courseFormContainer.classList.add('hidden');
        courseSuccess.classList.add('active');
      });
    }
  }

  // ==========================================
  // CAROUSEL - Drag to scroll + Parallax scroll
  // ==========================================
  const rows = document.querySelectorAll('.results-carousel__row');

  rows.forEach(row => {
    let isDown = false;
    let startX;
    let scrollLeft;
    let velX = 0;
    let momentumID = null;

    row.addEventListener('mousedown', (e) => {
      isDown = true;
      row.setAttribute('data-drag', 'true');
      row.style.cursor = 'grabbing';
      startX = e.pageX - row.offsetLeft;
      scrollLeft = row.scrollLeft;
      cancelMomentum();
    });

    row.addEventListener('mouseleave', () => {
      if (isDown) {
        isDown = false;
        row.style.cursor = 'grab';
        beginMomentum();
      }
    });

    row.addEventListener('mouseup', () => {
      isDown = false;
      row.style.cursor = 'grab';
      beginMomentum();
    });

    row.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - row.offsetLeft;
      const walk = (x - startX) * 1.5;
      velX = row.scrollLeft - (scrollLeft - walk);
      row.scrollLeft = scrollLeft - walk;
    });

    // Touch support
    row.addEventListener('touchstart', (e) => {
      isDown = true;
      row.setAttribute('data-drag', 'true');
      startX = e.touches[0].pageX - row.offsetLeft;
      scrollLeft = row.scrollLeft;
      cancelMomentum();
    }, { passive: true });

    row.addEventListener('touchend', () => {
      isDown = false;
      beginMomentum();
    });

    row.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - row.offsetLeft;
      const walk = (x - startX) * 1.5;
      velX = row.scrollLeft - (scrollLeft - walk);
      row.scrollLeft = scrollLeft - walk;
    }, { passive: true });

    function beginMomentum() {
      cancelMomentum();
      momentumID = requestAnimationFrame(momentumLoop);
    }

    function cancelMomentum() {
      if (momentumID) {
        cancelAnimationFrame(momentumID);
        momentumID = null;
      }
    }

    function momentumLoop() {
      row.scrollLeft += velX;
      velX *= 0.95;
      if (Math.abs(velX) > 0.5) {
        momentumID = requestAnimationFrame(momentumLoop);
      } else {
        row.removeAttribute('data-drag');
      }
    }
  });

  // ==========================================
  // PARALLAX HORIZONTAL SCROLL SYNCED TO VERTICAL SCROLL
  // Row 1: scrolls left-to-right as user scrolls down
  // Row 2: scrolls right-to-left (OPPOSITE direction)
  // ==========================================
  let rafId = 0;

  function handleParallax() {
    const row1 = document.getElementById('carousel-row-1');
    const row2 = document.getElementById('carousel-row-2');

    // Row 1: Scrolls left-to-right as user scrolls down
    if (row1 && row1.getAttribute('data-drag') !== 'true') {
      const rect1 = row1.getBoundingClientRect();
      const elemTop1 = rect1.top + window.scrollY;
      const start1 = elemTop1 - window.innerHeight;
      const end1 = elemTop1 + rect1.height;
      const progress1 = (window.scrollY - start1) / (end1 - start1);
      const t1 = Math.min(Math.max(progress1, 0), 1);
      const maxScroll1 = Math.max((row1.scrollWidth / 2) - row1.clientWidth, 0);
      row1.scrollLeft = maxScroll1 * t1;
    }

    // Row 2: Scrolls right-to-left (OPPOSITE direction)
    if (row2 && row2.getAttribute('data-drag') !== 'true') {
      const rect2 = row2.getBoundingClientRect();
      const elemTop2 = rect2.top + window.scrollY;
      const start2 = elemTop2 - window.innerHeight;
      const end2 = elemTop2 + rect2.height;
      const progress2 = (window.scrollY - start2) / (end2 - start2);
      const t2 = Math.min(Math.max(progress2, 0), 1);
      const maxScroll2 = Math.max((row2.scrollWidth / 2) - row2.clientWidth, 0);
      // Reverse direction: starts at max, ends at 0
      row2.scrollLeft = maxScroll2 * (1 - t2);
    }
  }

  window.addEventListener('scroll', function() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(handleParallax);
  }, { passive: true });

  // Initial call to set position
  handleParallax();
});
