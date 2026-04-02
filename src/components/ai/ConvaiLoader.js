export class ConvaiLoader {
  static #scriptLoaded = false;
  static #loadPromise = null;

  static loadScript() {
    if (this.#loadPromise) {
      return this.#loadPromise;
    }

    this.#loadPromise = new Promise((resolve, reject) => {
      if (this.#scriptLoaded) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      script.type = "text/javascript";

      script.onload = () => {
        this.#scriptLoaded = true;
        resolve();
      };
      script.onerror = () => reject(new Error('Failed to load Convai widget script'));

      document.head.appendChild(script);
    });

    return this.#loadPromise;
  }

  static isLoaded() {
    return this.#scriptLoaded;
  }
}