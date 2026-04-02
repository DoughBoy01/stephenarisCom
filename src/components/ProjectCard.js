export class ProjectCard {
  constructor(data) {
    this.data = data;
    this.currentImageIndex = 0;
    this.element = this.createElement();
    this.setupNavigation();
  }

  createElement() {
    const card = document.createElement('div');
    card.className = 'project-card';
    const firstImage = this.data.images[0];
    const hasMultipleImages = this.data.images.length > 1;

    card.innerHTML = `
      <h3>${this.data.title}</h3>
      <div class="project-image-container">
        ${hasMultipleImages ? `
          <button class="project-nav prev" aria-label="Previous image">‹</button>
          <button class="project-nav next" aria-label="Next image">›</button>
        ` : ''}
        <img 
          src="${firstImage}" 
          alt="${this.data.title}" 
          loading="lazy"
          decoding="async"
        >
      </div>
      <div class="project-content">
        <div class="project-role">${this.data.role}</div>
        <p>${this.data.description}</p>
        <div class="project-tags">
          ${this.data.tags.map(tag => `<span>${tag}</span>`).join('')}
        </div>
      </div>
    `;

    return card;
  }

  setupNavigation() {
    const prevBtn = this.element.querySelector('.project-nav.prev');
    const nextBtn = this.element.querySelector('.project-nav.next');
    if (!prevBtn || !nextBtn) return;
    
    prevBtn.addEventListener('click', () => this.showPreviousImage());
    nextBtn.addEventListener('click', () => this.showNextImage());
  }

  showPreviousImage() {
    this.currentImageIndex--;
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.data.images.length - 1;
    }
    this.updateImage();
  }

  showNextImage() {
    this.currentImageIndex++;
    if (this.currentImageIndex >= this.data.images.length) {
      this.currentImageIndex = 0;
    }
    this.updateImage();
  }

  updateImage() {
    const img = this.element.querySelector('img');
    const newImage = new Image();
    newImage.src = this.data.images[this.currentImageIndex];
    newImage.onload = () => {
      img.src = newImage.src;
    };
  }
}