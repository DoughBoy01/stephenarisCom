// Singleton audio context manager
class AudioContextManager {
  constructor() {
    this.context = null;
  }

  getContext() {
    if (!this.context) {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this.context;
  }
}

export const audioContextManager = new AudioContextManager();