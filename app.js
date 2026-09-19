/**
 * Personal Portfolio & Report Web Application - Interactive Logic
 * Developed for Ms. Praploy Singthongchai (แพรพลอย สิงห์ทองชัย)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. SPLASH SCREEN CONTROLLER (Runs on every first visit and page refresh)
  initSplashScreen();

  // 2. NAVIGATION & ACTIVE SCROLL SPY
  initNavigation();

  // 3. COPY TO CLIPBOARD
  initCopyActions();

  // 4. PRINT / REPORT TRIGGER
  initPrintTrigger();

  // 5. BACK TO TOP
  initBackToTop();

  // 6. CONTACT FORM SIMULATION
  initContactForm();
});

/**
 * Handles the initial Splash Screen animation and progress bar
 */
function initSplashScreen() {
  const splashScreen = document.getElementById('splashScreen');
  const progressFill = document.getElementById('splashProgressFill');
  const percentText = document.getElementById('splashPercent');
  const skipBtn = document.getElementById('splashSkipBtn');

  if (!splashScreen) return;

  let progress = 0;
  const duration = 1800; // 1.8 seconds for optimal UX
  const intervalTime = 20;
  const increment = 100 / (duration / intervalTime);

  const timer = setInterval(() => {
    progress += increment;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
      setTimeout(() => {
        dismissSplashScreen();
      }, 250);
    }
    if (progressFill) progressFill.style.width = `${progress}%`;
    if (percentText) percentText.textContent = `${Math.floor(progress)}%`;
  }, intervalTime);

  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      clearInterval(timer);
      dismissSplashScreen();
    });
  }

  function dismissSplashScreen() {
    splashScreen.classList.add('hidden');
    // Animate hero elements slightly after splash closes
    setTimeout(() => {
      const heroCard = document.querySelector('.hero-glass-card');
      if (heroCard) {
        heroCard.style.transform = 'translateY(0)';
      }
    }, 200);
  }
}

/**
 * Handles smooth scrolling, mobile nav toggle, and scroll-spy active state
 */
function initNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section-wrapper, #profileHero');

  // Mobile Toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('mobile-open')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('mobile-open')) {
          navMenu.classList.remove('mobile-open');
          const icon = menuToggle.querySelector('i');
          if (icon) icon.className = 'fas fa-bars';
        }
      });
    });
  }

  // ScrollSpy to highlight active menu item
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/**
 * Handles quick clipboard copy for phone, email, and address
 */
function initCopyActions() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`คัดลอก "${textToCopy}" เรียบร้อยแล้ว`);
      }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`คัดลอก "${textToCopy}" เรียบร้อยแล้ว`);
      });
    });
  });
}

/**
 * Handles print/export report
 */
function initPrintTrigger() {
  const printBtn = document.getElementById('printReportBtn');
  if (printBtn) {
    printBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  }
}

/**
 * Handles scroll to top button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * Shows interactive toast notification
 */
function showToast(message) {
  let toast = document.getElementById('toastMsg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastMsg';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-check-circle" style="color: #38bdf8;"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/**
 * Handles contact message form submission
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('senderName');
      const sender = nameInput ? nameInput.value : 'คุณ';
      showToast(`ขอบคุณ ${sender} ระบบได้จำลองการส่งข้อความเรียบร้อยแล้ว`);
      form.reset();
    });
  }
}
