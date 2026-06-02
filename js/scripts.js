'use strict';

/* ================================================
   PROJECT DATA
================================================ */
const projects = [
  {
    name: 'Mishtaken Hacham - Housing Lottery Platform',
    description: 'A public web platform that helps users explore Israeli housing lottery data, understand upcoming and active lotteries, and make smarter decisions using clear data, filters, and practical tools.',
    link: 'https://mishtaken-hacham.co.il/',
    languages: ['Next.js', 'React', 'Supabase', 'PostgreSQL', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    img: 'assets/img/mishtaken-hacham.png',
    imgContain: true
  },
  {
    name: 'Sharp Frame Selector for Orthophoto Creation',
    description: 'Python application that selects the sharpest frames from a given video, enabling the creation of high-quality orthophotos using image processing techniques.',
    github: 'https://github.com/AviyaArusi/ATOM-HA',
    languages: ['Python', 'Flask'],
    img: 'assets/img/atom.png'
  },
  {
    name: '2Better App',
    description: 'Android application for productivity and well-being. Features task organization, habit tracking, and mental health support tools built with a cross-platform stack.',
    github: 'https://github.com/Ashwal200/2Better',
    languages: ['JavaScript', 'React', 'Firebase', 'Expo'],
    img: 'assets/img/2better.png'
  },
  {
    name: 'Selfie Face Recognition',
    description: 'Identifies which photos in a directory contain a specific person\'s face, using face detection and recognition algorithms implemented in Python.',
    github: 'https://github.com/AviyaArusi/Selfie_face_recognition',
    languages: ['Python'],
    img: 'assets/img/faceRecognition.png'
  },
  {
    name: 'Network Protocols Exploration',
    description: 'Implements and explores fundamental network protocols - DNS, DHCP, HTTP, and redirect servers - from the ground up in C.',
    github: 'https://github.com/Ashwal200/Network-Protocols-Exploration/tree/main',
    languages: ['C'],
    img: 'assets/img/protocol.png'
  },
  {
    name: 'Laser-Activated Cat Deterrent System',
    description: 'An Arduino-based system using a laser distance sensor to detect movement and trigger a water sprinkler for 5 seconds - keeping cats away automatically.',
    github: 'https://github.com/AviyaArusi/Arduino_Cat_Sprinkler',
    languages: ['C', 'Arduino'],
    img: 'assets/img/arduino.png'
  }
];

/* ================================================
   RENDER PROJECTS
================================================ */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = projects.map(p => {
    const url = p.github || p.link;
    const isGithub = !!p.github;
    const overlayText = isGithub
      ? `<i class="fa-brands fa-github" aria-hidden="true"></i> View on GitHub`
      : `<i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> View Site`;
    const footerLink = isGithub
      ? `<span class="project-gh-link"><i class="fa-brands fa-github" aria-hidden="true"></i> GitHub</span>`
      : `<span class="project-gh-link"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Live Site</span>`;
    const imgClass = p.imgContain ? 'project-img project-img--contain' : 'project-img';
    const imgContent = p.img
      ? `<img class="${imgClass}" src="${p.img}" alt="${p.name}" loading="lazy" />`
      : `<div class="project-img-placeholder"><i class="fa-solid fa-globe" aria-hidden="true"></i></div>`;

    return `
    <a class="project-card fade-up"
       href="${url}"
       target="_blank"
       rel="noopener noreferrer"
       aria-label="View ${p.name}${isGithub ? ' on GitHub' : ''}">
      <div class="project-image-wrap">
        ${imgContent}
        <div class="project-overlay">
          <span class="project-overlay-text">
            ${overlayText}
          </span>
        </div>
      </div>
      <div class="project-body">
        <h3 class="project-title">${p.name}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-foot">
          <div class="project-tags">
            ${p.languages.map(l => `<span class="project-tag">${l}</span>`).join('')}
          </div>
          ${footerLink}
        </div>
      </div>
    </a>
  `;
  }).join('');
}

/* ================================================
   NAVBAR — transparent over hero, solid after
================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ================================================
   MOBILE MENU TOGGLE
================================================ */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMobile');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('.nav-mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ================================================
   SCROLL ANIMATIONS — Intersection Observer
================================================ */
const STAGGER_PARENTS = new Set([
  'projects-grid',
  'interests-grid',
  'contact-grid',
  'skills-wrapper'
]);

function initScrollAnimations() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const parent = entry.target.parentElement;
      const inGrid = parent && [...parent.classList].some(c => STAGGER_PARENTS.has(c));
      const idx    = inGrid ? Array.from(parent.children).indexOf(entry.target) : 0;
      setTimeout(
        () => entry.target.classList.add('visible'),
        idx * 85
      );
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ================================================
   SMOOTH ANCHOR SCROLL (accounts for fixed nav)
================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
        10
      ) || 68;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ================================================
   INIT
================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initSmoothScroll();
});
