export class Timer {
  constructor() {
    this.startTime = Date.now();
    this.element = this.createElement();
    this.startTimer();
  }

  createElement() {
    const timer = document.createElement('div');
    timer.className = 'dock-timer';
    timer.innerHTML = `
      <span class="timer-value">00:00:000</span>
    `;
    return timer;
  }

  formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
  }

  startTimer() {
    const updateTimer = () => {
      const elapsed = Date.now() - this.startTime;
      this.element.querySelector('.timer-value').textContent = this.formatTime(elapsed);
      requestAnimationFrame(updateTimer);
    };
    
    updateTimer();
  }
}