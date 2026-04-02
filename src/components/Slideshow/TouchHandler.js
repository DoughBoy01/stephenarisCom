export class TouchHandler {
  constructor(slideshow) {
    this.slideshow = slideshow;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.minSwipeDistance = 50;
    
    this.bindEvents();
  }

  bindEvents() {
    this.slideshow.element.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    this.slideshow.element.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
    this.slideshow.element.addEventListener('touchend', () => this.handleTouchEnd());
  }

  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
  }

  handleTouchMove(e) {
    this.touchEndX = e.touches[0].clientX;
  }

  handleTouchEnd() {
    const swipeDistance = this.touchEndX - this.touchStartX;
    
    if (Math.abs(swipeDistance) > this.minSwipeDistance) {
      if (swipeDistance > 0) {
        this.slideshow.prev();
      } else {
        this.slideshow.next();
      }
    }
  }
}