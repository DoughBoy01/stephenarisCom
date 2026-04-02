export class DockAI {
  constructor() {
    this.element = this.createElement();
  }

  createElement() {
    const item = document.createElement('a');
    item.href = '#ask';
    item.className = 'dock-item dock-ai';
    item.setAttribute('aria-label', 'Ask AI');

    item.innerHTML = `
      <span class="dock-icon">★</span>
      <span class="dock-label">Ask AI</span>
    `;

    return item;
  }
}