export class AnimatedText {
  constructor() {
    this.createStaticName();
    this.phrases = [
       "Research | UX | Product | Service Design",
        "Full Stack user focused product person",
              "Understanding user problems deeply",
      "Shapes UX strategy and streamlines digital services",
      "Orchestrates digital success",
          "Speaks the language of business",
           "Works seamlessly with developers",
         "Uncovers opportunities, not just known problems",
       "Focuses on outcomes & business impact",
          "Drives insight and research that counts",
      "Builds shared visions for better futures",
      "Transforms ideas into clear, actionable solutions",
            "Knows how to ship quickly",
    ];
    this.currentIndex = 0;
    this.element = this.createTextElement();
    this.startAnimation();
  }

  createStaticName() {
    const nameElement = document.createElement('div');
    nameElement.className = 'static-name';
    nameElement.textContent = 'Stephen Aris';
    
    const subtitleElement = document.createElement('div');
    subtitleElement.className = 'static-subtitle';
    subtitleElement.textContent = 'I help you design better products & services';
    
    document.body.appendChild(nameElement);
    document.body.appendChild(subtitleElement);
  }

  createTextElement() {
    const element = document.createElement('div');
    element.className = 'animated-text';
    document.body.appendChild(element);
    return element;
  }

  async animate(phrase) {
    const text = document.createElement('div');
    text.className = 'text-line';
    text.textContent = phrase;
    
    // Add new text
    this.element.appendChild(text);
    
    // Trigger entrance animation
    await new Promise(resolve => setTimeout(resolve, 100));
    text.classList.add('visible');
    
    // Wait for display duration
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Trigger exit animation
    text.classList.add('fade-out');
    
    // Remove after exit animation
    await new Promise(resolve => setTimeout(resolve, 800));
    text.remove();
  }

  async startAnimation() {
    while (true) {
      await this.animate(this.phrases[this.currentIndex]);
      this.currentIndex = (this.currentIndex + 1) % this.phrases.length;
    }
  }
}