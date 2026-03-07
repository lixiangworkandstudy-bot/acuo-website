/* ========================================
   阿措个人官方网站 — 交互脚本
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Cinematic Intro Animation (GSAP) ---
  function initIntroAnimation() {
    gsap.set('.nav', { opacity: 0, y: -20 });
    gsap.set('.hero-scroll', { opacity: 0 });

    const tl = gsap.timeline();

    // Phase 1: Chinese Landscape Fog Parting (0s - 4s)
    // 5 层雾气以不同速度、方向散开，营造层次感
    tl.to('.mist-1', {
      opacity: 0,
      scale: 1.8,
      duration: 4.0,
      ease: 'power1.inOut'
    }, 0.2)
      .to('.mist-2', {
        opacity: 0,
        x: '-40vw',
        y: '10vh',
        scale: 1.3,
        duration: 3.5,
        ease: 'power1.inOut'
      }, 0.4)
      .to('.mist-3', {
        opacity: 0,
        x: '30vw',
        y: '-5vh',
        scale: 1.3,
        duration: 3.8,
        ease: 'power1.inOut'
      }, 0.3)
      .to('.mist-4', {
        opacity: 0,
        y: '-30vh',
        scale: 1.2,
        duration: 3.0,
        ease: 'power1.inOut'
      }, 0.5)
      .to('.mist-5', {
        opacity: 0,
        y: '20vh',
        scale: 1.4,
        duration: 3.5,
        ease: 'power1.inOut'
      }, 0.6)

      // 背景山脉从雾中显现（去模糊 + 增强对比 + 微微推近）
      .to('.hero-bg-img', {
        opacity: 0.6,
        filter: 'blur(0px) brightness(0.5) saturate(0.8)',
        scale: 1.0,
        duration: 4.5,
        ease: 'power2.out'
      }, 0.3)

      // 暗色渐变层淡入（山脚变暗，增强层次）
      .to('.hero-gradient', {
        opacity: 1,
        duration: 3,
        ease: 'power2.inOut'
      }, 2.0)

      // Phase 2: Meeting Acuo (3s - 5s)
      // 名字在群山背景下浮现
      .to('.hero-name', {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 1.8,
        ease: 'power3.out'
      }, 3.0)
      .to('.hero-tagline', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out'
      }, 3.5)

      // 背景缓慢呼吸 (Ken Burns Effect)
      .to('.hero-bg-img', {
        scale: 1.06,
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true
      }, 5.0)

      // 导航和滚动提示入场
      .to('.nav', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        clearProps: 'transform'
      }, 4.2)
      .to('.hero-scroll', {
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out'
      }, 4.8);
  }

  // Make sure GSAP exists before calling
  if (typeof gsap !== 'undefined') {
    // Wait for full page load (including images) before starting heavy intro animations
    window.addEventListener('load', () => {
      // Small delay to ensure browser has painted the initial frame
      setTimeout(initIntroAnimation, 100);
    });
  }

  // --- Navigation scroll behavior ---
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class
    if (currentScroll > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // --- Mobile nav toggle ---
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');

    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // --- Active nav link tracking ---
  const sections = document.querySelectorAll('section[id]');
  const navLinkElements = navLinks.querySelectorAll('a');

  function updateActiveLink() {
    const scrollPos = window.pageYOffset + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinkElements.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  // --- Scroll reveal animations ---
  const revealElements = document.querySelectorAll('.reveal');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Parallax effect on hero background ---
  const heroBgContainer = document.querySelector('.hero-bg');

  if (heroBgContainer && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroHeight = document.querySelector('.hero').offsetHeight;

      if (scrolled < heroHeight) {
        heroBgContainer.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    });
  }

  // --- Counter animation for stat cards ---
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();

        // Handle different formats
        if (text.includes(',')) {
          // Number with comma (e.g., "40,000+")
          const num = parseInt(text.replace(/[^0-9]/g, ''));
          const suffix = text.replace(/[0-9,]/g, '');
          animateCounter(el, 0, num, 1500, (v) => v.toLocaleString() + suffix);
        } else if (text.match(/^[0-9.]+$/)) {
          // Pure number or decimal
          const num = parseFloat(text);
          if (text.includes('.')) {
            animateCounter(el, 0, num * 10, 1200, (v) => (v / 10).toFixed(1));
          } else {
            animateCounter(el, 0, parseInt(text), 1000, (v) => v.toString());
          }
        }
        // Skip text like "TOP3"

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el, start, end, duration, formatter) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
      const current = Math.round(start + (end - start) * eased);

      el.textContent = formatter(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

});
