export class TypeWriter {
  constructor(element, text, options = {}) {
    this.element = element;
    this.text = text;
    this.cursor = options.cursor || '|';
    this.delay = options.delay || 50;
    this.currentChar = 0;
    this.cursorElement = this.createCursor();
  }

  createCursor() {
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.textContent = this.cursor;
    cursor.style.animation = 'blink 1s step-end infinite';
    return cursor;
  }

  async type() {
    this.element.textContent = '';
    this.element.appendChild(this.cursorElement);
    
    while (this.currentChar < this.text.length) {
      await this.wait(this.delay);
      this.element.insertBefore(
        document.createTextNode(this.text[this.currentChar]),
        this.cursorElement
      );
      this.currentChar++;
    }
    
    // Remove cursor after typing is complete
    this.stop();
  }

  async erase() {
    while (this.currentChar > 0) {
      await this.wait(this.delay / 2);
      this.currentChar--;
      this.element.textContent = this.text.substring(0, this.currentChar);
      this.element.appendChild(this.cursorElement);
    }
  }

  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  stop() {
    if (this.cursorElement.parentNode) {
      this.cursorElement.remove();
    }
  }

  dispose() {
    this.stop();
  }
}