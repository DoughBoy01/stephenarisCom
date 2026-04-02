export class AudioDebugger {
  static MONITORING_INTERVAL = 100; // ms
  
  constructor(audioManager) {
    this.audioManager = audioManager;
    this.timeLog = [];
    this.monitorInterval = null;
    this.lastTimestamp = 0;
    this.jumpThreshold = 0.1; // seconds
  }

  startMonitoring() {
    if (this.monitorInterval) return;
    
    this.monitorInterval = setInterval(() => {
      this.checkTimeJump();
    }, AudioDebugger.MONITORING_INTERVAL);
  }

  stopMonitoring() {
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
      this.monitorInterval = null;
    }
  }

  checkTimeJump() {
    if (!this.audioManager.isPlaying) return;

    const currentTime = this.getCurrentPlaybackTime();
    
    if (this.lastTimestamp > 0) {
      const timeDiff = currentTime - this.lastTimestamp;
      const expectedDiff = AudioDebugger.MONITORING_INTERVAL / 1000;
      
      if (Math.abs(timeDiff - expectedDiff) > this.jumpThreshold) {
        this.logTimeJump(this.lastTimestamp, currentTime);
      }
    }
    
    this.lastTimestamp = currentTime;
    this.timeLog.push({
      timestamp: Date.now(),
      playbackTime: currentTime,
      contextTime: this.audioManager.audioContext?.currentTime || 0,
      state: this.getAudioState()
    });
  }

  getCurrentPlaybackTime() {
    if (!this.audioManager.audioContext || !this.audioManager.isPlaying) return 0;
    
    const elapsed = this.audioManager.audioContext.currentTime - 
      this.audioManager.playbackState.startTime + 
      this.audioManager.playbackState.offset;
      
    return elapsed % (this.audioManager.audioBuffer?.duration || Infinity);
  }

  getAudioState() {
    return {
      isPlaying: this.audioManager.isPlaying,
      contextState: this.audioManager.audioContext?.state,
      bufferState: {
        duration: this.audioManager.audioBuffer?.duration,
        sampleRate: this.audioManager.audioBuffer?.sampleRate,
        numberOfChannels: this.audioManager.audioBuffer?.numberOfChannels
      },
      sourceNodeState: this.audioManager.sourceNode ? 'active' : 'inactive',
      playbackState: { ...this.audioManager.playbackState }
    };
  }

  logTimeJump(fromTime, toTime) {
    const state = this.getAudioState();
    console.warn('Audio time jump detected:', {
      from: fromTime.toFixed(6),
      to: toTime.toFixed(6),
      difference: (toTime - fromTime).toFixed(6),
      audioState: state,
      stackTrace: new Error().stack
    });
  }

  getTimeLog() {
    return this.timeLog;
  }

  clearTimeLog() {
    this.timeLog = [];
  }
}