import { TouchHandler } from './TouchHandler.js';

export class Carousel {
  constructor(container, images) {
    if (!container) throw new Error('Container element is required');
    
    this.container = container;
    this.images = images;
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.autoplayDelay = 5000; // 5 seconds
    
    this.createElement();
    this.touchHandler = new TouchHandler(this);
    this.bindEvents();
    this.preloadImages();
    this.startAutoplay();
  }

  createElement() {
    this.element = document.createElement('div');
    this.element.className = 'carousel';
    
    this.element.innerHTML = `
      <div class="carousel-container">
        <div class="carousel-track"></div>
        <button class="carousel-nav prev" aria-label="Previous slide">‹</button>
        <button class="carousel-nav next" aria-label="Next slide">›</button>
        <div class="carousel-loader"></div>
      </div>
      <div class="carousel-dots"></div>
    `;
    
    this.track = this.element.querySelector('.carousel-track');
    this.dotsContainer = this.element.querySelector('.carousel-dots');
    this.loader = this.element.querySelector('.carousel-loader');
    
    this.createSlides();
    this.createDots();
    this.container.appendChild(this.element);
    this.updateSlides();
  }

  createSlides() {
    this.images.forEach((image, index) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      slide.innerHTML = `
        <img 
          src="${image}" 
          alt="Project image ${index + 1}" 
          loading="${index === 0 ? 'eager' : 'lazy'}"
        >
      `;
      this.track.appendChild(slide);
    });
  }

  createDots() {
    this.images.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
    });
  }

  bindEvents() {
    this.element.querySelector('.carousel-nav.prev').addEventListener('click', () => this.prev());
    this.element.querySelector('.carousel-nav.next').addEventListener('click', () => this.next());

    // Pause autoplay on hover/touch
    this.element.addEventListener('mouseenter', () => this.pauseAutoplay());
    this.element.addEventListener('mouseleave', () => this.startAutoplay());
    this.element.addEventListener('touchstart', () => this.pauseAutoplay(), { passive: true });
    this.element.addEventListener('touchend', () => this.startAutoplay());
    
    // Keyboard navigation when carousel is focused
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  }

  updateSlides() {
    const offset = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
      dot.setAttribute('aria-current', index === this.currentIndex ? 'true' : 'false');
    });
    
    // Update navigation buttons
    this.element.querySelector('.carousel-nav.prev').disabled = this.currentIndex === 0;
    this.element.querySelector('.carousel-nav.next').disabled = this.currentIndex === this.images.length - 1;
  }

  async preloadImages() {
    this.loader.classList.add('active');
    
    try {
      await Promise.all(this.images.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      }));
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    } finally {
      this.loader.classList.remove('active');
    }
  }

  startAutoplay() {
    this.pauseAutoplay();
    this.autoplayInterval = setInterval(() => {
      if (this.currentIndex === this.images.length - 1) {
        this.goToSlide(0);
      } else {
        this.next();
      }
    }, this.autoplayDelay);
  }

  pauseAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  next() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
      this.updateSlides();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSlides();
    }
  }

  goToSlide(index) {
    if (index >= 0 && index < this.images.length) {
      this.currentIndex = index;
      this.updateSlides();
    }
  }
}