import { TouchHandler } from './TouchHandler.js';
import { KeyboardHandler } from './KeyboardHandler.js';
import { ImageLoader } from './ImageLoader.js';
import { projects } from '../../content/projects.js';

export class Slideshow {
  constructor() {
    this.currentIndex = 0;
    this.projects = projects;
    this.isVisible = false;
    
    this.createElement();
    this.touchHandler = new TouchHandler(this);
    this.keyboardHandler = new KeyboardHandler(this);
    this.imageLoader = new ImageLoader();
    
    this.bindEvents();
  }

  createElement() {
    this.element = document.createElement('div');
    this.element.className = 'slideshow';
    
    this.element.innerHTML = `
      <div class="slideshow-content">
        <div class="slideshow-container">
          <img class="slideshow-image" alt="" />
        </div>
        <button class="slideshow-nav prev" aria-label="Previous project">‹</button>
        <button class="slideshow-nav next" aria-label="Next project">›</button>
      </div>
      <div class="slideshow-description">
        <h3></h3>
        <p></p>
        <div class="slideshow-tags"></div>
      </div>
    `;
    
    document.body.appendChild(this.element);
    
    this.image = this.element.querySelector('.slideshow-image');
    this.title = this.element.querySelector('h3');
    this.description = this.element.querySelector('p');
    this.tags = this.element.querySelector('.slideshow-tags');
  }

  bindEvents() {
    this.element.querySelector('.slideshow-nav.prev').addEventListener('click', () => this.prev());
    this.element.querySelector('.slideshow-nav.next').addEventListener('click', () => this.next());
    
    // Close on background click
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) this.close();
    });
  }

  show() {
    this.isVisible = true;
    this.element.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.updateContent();
    this.keyboardHandler.enable();
  }

  close() {
    this.isVisible = false;
    this.element.classList.remove('active');
    document.body.style.overflow = '';
    this.keyboardHandler.disable();
  }

  next() {
    if (this.currentIndex < this.projects.length - 1) {
      this.currentIndex++;
      this.updateContent();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateContent();
    }
  }

  async updateContent() {
    const project = this.projects[this.currentIndex];
    
    this.title.textContent = project.title;
    this.description.textContent = project.description;
    this.tags.innerHTML = project.tags
      .map(tag => `<span class="slideshow-tag">${tag}</span>`)
      .join('');
    
    this.image.classList.remove('loaded');
    try {
      await this.imageLoader.load(project.images[0]);
      this.image.src = project.images[0];
      this.image.classList.add('loaded');
    } catch (error) {
      console.error('Failed to load image:', error);
      this.image.src = '/assets/projects/fallback.jpg';
    }
  }
}