import { ImageUpload } from './ImageUpload.js';
import { ProjectCard } from './ProjectCard.js';
import { ParallaxText } from './ParallaxText.js';
import { projects } from '../content/projects.js';

export class Modal {
  constructor() {
    this.overlay = this.createOverlay();
    this.addEventListeners();
  }

  createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const content = document.createElement('div');
    content.className = 'modal-content';

    // Create modal sections
    const header = document.createElement('div');
    header.className = 'modal-header';

    const body = document.createElement('div');
    body.className = 'modal-body';

    const footer = document.createElement('div');
    footer.className = 'modal-footer';

    const closeButton = document.createElement('button');
    closeButton.className = 'modal-close';
    closeButton.innerHTML = '×';
    closeButton.setAttribute('aria-label', 'Close modal');

    content.append(closeButton, header, body, footer);
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    return overlay;
  }

  addEventListeners() {
    // Close button click
    this.overlay.querySelector('.modal-close').addEventListener('click', () => {
      this.close();
    });

    // Click outside to close
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  setContent(content) {
    const header = this.overlay.querySelector('.modal-header');
    const body = this.overlay.querySelector('.modal-body');
    const footer = this.overlay.querySelector('.modal-footer');

    // Clear previous content
    header.innerHTML = '';
    body.innerHTML = '';
    footer.innerHTML = '';

    // Extract title if available
    let title = '';
    if (content instanceof Element) {
      const titleEl = content.querySelector('h1, h2, h3');
      if (titleEl) {
        title = titleEl.outerHTML;
        titleEl.remove();
      }
    }

    // Set header content
    header.innerHTML = title || '<h2>Modal Title</h2>';

    // Set main content
    if (typeof content === 'string') {
      body.innerHTML = content;
    } else {
      body.appendChild(content);
    }

    // Initialize project cards if this is the projects section
    if (content instanceof Element) {
      const projectsGrid = content.querySelector('.projects-grid');
      if (projectsGrid) {
        projects.forEach(project => {
          const card = new ProjectCard(project);
          projectsGrid.appendChild(card.element);
        });
      }
     
     // Initialize parallax text if this is the about section
     const parallaxContent = content.querySelector('.parallax-content');
     if (parallaxContent) {
       const parallax = new ParallaxText();
      parallaxContent.__parallax = parallax; // Store reference for cleanup
       parallax.mount(parallaxContent);
     }
    }

    // Initialize image upload if content has upload area
    if (content instanceof Element && content.querySelector('.upload-area')) {
      new ImageUpload(content.querySelector('.upload-area'));
    }
  }

  open() {
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Keep scroll position
    // Store current scroll position
    this.scrollPos = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollPos}px`;
    document.body.style.width = '100%';
  }

  close() {
    this.overlay.classList.remove('active');
    
    // Stop any running typewriter animations and audio
    const parallaxContent = this.overlay.querySelector('.parallax-content');
    if (parallaxContent) {
      const parallax = parallaxContent.__parallax;
      if (parallax) {
        parallax.unmount();
        parallaxContent.__parallax = null;
      }
    }
    
    // Dispatch modal close event AFTER cleanup
    // Restore scroll position
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, this.scrollPos);
  }

  isOpen() {
    return this.overlay.classList.contains('active');
  }
}