import { ProjectCard } from './ProjectCard.js';
import { projects } from '../content/projects.js';
import modalContent from '../content/modalContent.js';

export class Sections {
  constructor() {
    this.createHeroSection();
    this.createProjectsSection();
    this.createAboutSection();
    this.createContactSection();
    this.setupIntersectionObserver();
    this.handleInitialHash();
  }

  createHeroSection() {
    const section = document.createElement('section');
    section.id = 'hero';
    section.className = 'page-section hero-section';
    document.body.appendChild(section);
  }

  createProjectsSection() {
    const section = document.createElement('section');
    section.id = 'projects';
    section.className = 'page-section projects-section';

    const container = document.createElement('div');
    container.className = 'section-container';

    const content = document.createElement('div');
    content.className = 'section-content';

    content.innerHTML = `
      <h2 class="section-title">Projects</h2>
      <div class="projects-grid"></div>
    `;

    const projectsGrid = content.querySelector('.projects-grid');
    projects.forEach(project => {
      const card = new ProjectCard(project);
      projectsGrid.appendChild(card.element);
    });

    container.appendChild(content);
    section.appendChild(container);
    document.body.appendChild(section);
  }

  createAboutSection() {
    const section = document.createElement('section');
    section.id = 'about';
    section.className = 'page-section about-section';

    const container = document.createElement('div');
    container.className = 'section-container';

    const content = document.createElement('div');
    content.className = 'section-content';

    const aboutData = modalContent.about;
    content.innerHTML = `
      <h2 class="section-title">${aboutData.title}</h2>
      ${aboutData.content}
    `;

    container.appendChild(content);
    section.appendChild(container);
    document.body.appendChild(section);
  }

  createContactSection() {
    const section = document.createElement('section');
    section.id = 'contact';
    section.className = 'page-section contact-section';

    const container = document.createElement('div');
    container.className = 'section-container';

    const content = document.createElement('div');
    content.className = 'section-content';

    const contactData = modalContent.contact;
    content.innerHTML = `
      <h2 class="section-title">${contactData.title}</h2>
      ${contactData.content}
    `;

    container.appendChild(content);
    section.appendChild(container);
    document.body.appendChild(section);
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.updateActiveNavItem(sectionId);

          if (sectionId !== 'hero') {
            window.history.replaceState(null, '', `#${sectionId}`);
          } else {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }
      });
    }, options);

    document.querySelectorAll('.page-section').forEach(section => {
      observer.observe(section);
    });
  }

  updateActiveNavItem(sectionId) {
    document.querySelectorAll('.dock-item').forEach(item => {
      const href = item.getAttribute('href');
      if (href === `#${sectionId}`) {
        item.classList.add('active');
      } else if (!item.classList.contains('dock-audio')) {
        item.classList.remove('active');
      }
    });
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  handleInitialHash() {
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1);
      setTimeout(() => {
        this.scrollToSection(sectionId);
      }, 100);
    }
  }
}
