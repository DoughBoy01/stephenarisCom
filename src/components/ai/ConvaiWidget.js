import { CONFIG } from '../../config.js';
import { ConvaiLoader } from './ConvaiLoader.js';

export class ConvaiWidget {
  constructor() {
    this.element = null;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;

    try {
      await ConvaiLoader.loadScript();
      this.element = document.createElement('elevenlabs-convai');
      this.element.setAttribute('agent-id', CONFIG.ELEVENLABS.AGENT_ID);
      this.element.setAttribute('api-key', CONFIG.ELEVENLABS.API_KEY);
      this.element.setAttribute('compact', 'true');
      this.element.setAttribute('persistent', 'true');
      this.element.setAttribute('timeout', '300000'); // 5 minute timeout
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize Convai widget:', error);
      throw error;
    }
  }

  mount(container) {
    if (!this.initialized || !this.element) {
      throw new Error('Widget must be initialized before mounting');
    }
    container.appendChild(this.element);
  }

  unmount() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}