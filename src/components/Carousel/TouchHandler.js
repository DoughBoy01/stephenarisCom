export class TouchHandler {
  constructor(carousel) {
    if (!carousel?.element) throw new Error('Carousel element is required');
    
    this.carousel = carousel;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.minSwipeDistance = 50;
    
    this.bindEvents();
  }

  bindEvents() {
    const element = this.carousel.element;
    element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    element.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
    element.addEventListener('touchend', this.handleTouchEnd.bind(this));
  }

  handleTouchStart(e) {
    e.stopPropagation();
    this.touchStartX = e.touches[0].clientX;
  }

  handleTouchMove(e) {
    e.stopPropagation();
    this.touchEndX = e.touches[0].clientX;
  }

  handleTouchEnd() {
    const swipeDistance = this.touchEndX - this.touchStartX;

    if (Math.abs(swipeDistance) > this.minSwipeDistance) {
      if (swipeDistance > 0) {
        this.carousel.prev();
      } else {
        this.carousel.next();
      }
    }
  }
}