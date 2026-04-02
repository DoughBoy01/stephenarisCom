export class KeyboardHandler {
  constructor(slideshow) {
    this.slideshow = slideshow;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  enable() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  disable() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowLeft':
        this.slideshow.prev();
        break;
      case 'ArrowRight':
        this.slideshow.next();
        break;
      case 'Escape':
        this.slideshow.close();
        break;
    }
  }
}