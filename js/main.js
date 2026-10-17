/**
 * Spillway Private Pool Villa, Wayanad — Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'rgba(12, 28, 22, 0.98)';
      navLinks.style.padding = '2rem 1.5rem';
      navLinks.style.gap = '1.5rem';
      navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
    });
  }

  // 3. Villa Spaces Tab Filter
  const tabBtns = document.querySelectorAll('.tab-btn');
  const spaceCards = document.querySelectorAll('.space-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      spaceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Gallery Category Filter
  const galleryBtns = document.querySelectorAll('.gallery-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 5. Interactive Lightbox Modal
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGalleryIndex = 0;
  const visibleGalleryItems = () => Array.from(galleryItems).filter(item => item.style.display !== 'none');

  const updateLightbox = (index) => {
    const items = visibleGalleryItems();
    if (items.length === 0) return;
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    currentGalleryIndex = index;

    const item = items[currentGalleryIndex];
    const img = item.querySelector('img');
    const title = item.querySelector('h4') ? item.querySelector('h4').innerText : '';
    const desc = item.querySelector('p') ? item.querySelector('p').innerText : '';

    lightboxImg.src = img.src;
    lightboxCaption.innerHTML = `<strong>${title}</strong> &mdash; ${desc}`;
  };

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const items = visibleGalleryItems();
      currentGalleryIndex = items.indexOf(item);
      updateLightbox(currentGalleryIndex);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightbox(currentGalleryIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightbox(currentGalleryIndex + 1);
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Keyboard controls for lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    } else if (e.key === 'ArrowLeft') {
      updateLightbox(currentGalleryIndex - 1);
    } else if (e.key === 'ArrowRight') {
      updateLightbox(currentGalleryIndex + 1);
    }
  });

  // 6. Booking Search & Instant WhatsApp Generation
  const checkinInput = document.getElementById('bookingCheckin');
  const checkoutInput = document.getElementById('bookingCheckout');
  const guestsSelect = document.getElementById('bookingGuests');
  const bookNowBtn = document.getElementById('btnSearchVilla');

  // Set default dates (tomorrow and day after)
  if (checkinInput && checkoutInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 3);

    checkinInput.valueAsDate = tomorrow;
    checkoutInput.valueAsDate = dayAfter;
  }

  const triggerWhatsAppInquiry = () => {
    const checkin = checkinInput ? checkinInput.value : 'Upcoming Date';
    const checkout = checkoutInput ? checkoutInput.value : 'Upcoming Date';
    const guests = guestsSelect ? guestsSelect.value : '10-15 Guests';

    const message = encodeURIComponent(
      `Hello Spillway Private Pool Villa! 🌿\n\nI would like to inquire about booking the entire private pool villa in Wayanad.\n\n📅 Check-In: ${checkin}\n📅 Check-Out: ${checkout}\n👥 Guests: ${guests}\n\nPlease share availability, tariff, and booking details. Thank you!`
    );

    // Standard WhatsApp API link (Placeholder phone or direct WhatsApp contact)
    const phone = "918075824564"; // Can be updated with exact direct owner number
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${message}`, '_blank');
  };

  if (bookNowBtn) {
    bookNowBtn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerWhatsAppInquiry();
    });
  }

  // 7. FAQ Accordion Toggle
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 8. Smooth scrolling for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});
