// ============================
// DARK MODE TOGGLE
// ============================
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function setTheme(theme) {
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme');
  }
  localStorage.setItem('theme', theme);
  themeToggle.setAttribute('aria-pressed', theme === 'dark');
}

themeToggle.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  setTheme(isDark ? 'light' : 'dark');
});

// ============================
// NAV: scroll state + mobile menu
// ============================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// ============================
// SCROLL REVEAL
// ============================
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => io.observe(el));

// ============================
// CERTIFICATE LIGHTBOX
// ============================
const certData = {
  liberty: {
    title: 'Excellence in Liberty Initiative Research & Client Service Award',
    img: 'images/certs/Liberty_Initiative_Award.jpg',
    pdf: null
  },
  achievement: {
    title: 'Achievement Award in BS Marketing',
    img: 'images/certs/Achievement_Award_Marketing.jpg',
    pdf: null
  },
  bgs: {
    title: 'Beta Gamma Sigma Honor Society',
    img: 'images/certs/Beta_Gamma_Sigma_Honor_Society-1.jpg',
    pdf: 'docs/Beta_Gamma_Sigma_Honor_Society.pdf'
  },
  nisc: {
    title: 'Northeast Intercollegiate Sales Competition — Quarterfinalist',
    img: 'images/certs/Northeast_Inter_collegiate_Sales_Competition-1.jpg',
    pdf: 'docs/Northeast_Inter_collegiate_Sales_Competition.pdf'
  },
  slice: {
    title: 'Live Client Project Competition — Business Capstone',
    img: 'images/certs/SLice_Competition_-_Business_Capstone-1.jpg',
    pdf: 'docs/SLice_Competition_-_Business_Capstone.pdf'
  },
  johnson: {
    title: 'Johnson Family Excellence Award — Writing Across the Curriculum',
    img: 'images/certs/Johnson_Family_Writing_Award-1.jpg',
    pdf: 'docs/Johnson_Family_Writing_Award.pdf'
  },
  charger: {
    title: 'Charger Ambassador Recognition',
    img: 'images/certs/Charger_Ambassador_Recognition-1.jpg',
    pdf: 'docs/Charger_Ambassador_Recognition.pdf'
  },
  mckinsey: {
    title: 'McKinsey Forward Program',
    img: 'images/certs/Mckinsey_Forward_Program-1.jpg',
    pdf: 'docs/Mckinsey_Forward_Program.pdf'
  }
};

const lightbox = document.getElementById('lightbox');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxLink = document.getElementById('lightboxLink');

function openLightbox(key) {
  const data = certData[key];
  if (!data) return;
  lightboxImg.src = data.img;
  lightboxImg.alt = data.title;
  lightboxTitle.textContent = data.title;
  if (data.pdf) {
    lightboxLink.href = data.pdf;
    lightboxLink.style.display = '';
  } else {
    lightboxLink.style.display = 'none';
  }
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => openLightbox(card.dataset.cert));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
