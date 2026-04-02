import { CONFIG } from '../config.js';
import { audioContextManager } from './AudioContext.js';
import { AudioLoader } from './AudioLoader.js';
import { AudioDebugger } from './AudioDebugger.js';

export class AudioManager {
  constructor() {
    this.audioContext = null;
    this.audioBuffers = {
      ambient: null,
      radio: null
    };
    this.sourceNode = null;
    this.gainNode = null;
    this.compressor = null;
    this.isPlaying = false;
    this.currentTrack = null;
    this.playbackState = {
      startTime: 0,
      offset: 0,
      duration: 0
    };
    this.setupAudioControl();
    this.debugger = new AudioDebugger(this);
  }

  async setupAudioContext() {
    if (this.audioContext) return;
    
    this.audioContext = audioContextManager.getContext();
    
    // Create compressor
    this.compressor = this.audioContext.createDynamicsCompressor();
    this.compressor.threshold.value = CONFIG.AUDIO.COMPRESSOR.THRESHOLD;
    this.compressor.knee.value = CONFIG.AUDIO.COMPRESSOR.KNEE;
    this.compressor.ratio.value = CONFIG.AUDIO.COMPRESSOR.RATIO;
    this.compressor.attack.value = CONFIG.AUDIO.COMPRESSOR.ATTACK;
    this.compressor.release.value = CONFIG.AUDIO.COMPRESSOR.RELEASE;
    
    // Create gain node
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = CONFIG.AUDIO.VOLUME;
    
    // Connect nodes: source -> compressor -> gain -> destination
    this.compressor.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
    
    try {
      // Load both audio files
      this.audioBuffers.ambient = await AudioLoader.loadAudioBuffer(CONFIG.BASE_URL + '/assets/audio/ambient.mp3', this.audioContext);
      this.audioBuffers.radio = await AudioLoader.loadAudioBuffer(CONFIG.BASE_URL + '/assets/audio/radio.mp3', this.audioContext);
      
      console.debug('Audio loaded:', {
        ambient: {
          duration: this.audioBuffers.ambient.duration,
          sampleRate: this.audioBuffers.ambient.sampleRate,
          numberOfChannels: this.audioBuffers.ambient.numberOfChannels
        },
        radio: {
          duration: this.audioBuffers.radio.duration,
          sampleRate: this.audioBuffers.radio.sampleRate,
          numberOfChannels: this.audioBuffers.radio.numberOfChannels
        }
      });
    } catch (error) {
      console.error('Failed to load audio:', error);
    }
  }

  createSource() {
    if (this.sourceNode) {
      this.sourceNode.disconnect();
      this.sourceNode = null;
      this.playbackState.startTime = 0;
    }
    
    this.sourceNode = this.audioContext.createBufferSource();
    this.sourceNode.buffer = this.audioBuffers[this.currentTrack];
    this.sourceNode.connect(this.compressor);
    this.sourceNode.loop = true;
    
    // Set loop points to avoid clipping
    this.sourceNode.loopStart = 0;
    this.sourceNode.loopEnd = this.audioBuffers[this.currentTrack].duration;
    this.sourceNode.playbackRate.value = 1.0;
    
    return this.sourceNode;
  }

  setupAudioControl() {
    const controls = document.querySelectorAll('.dock-audio');
    if (!controls.length) return;
    
    controls.forEach(control => {
      control.addEventListener('click', (e) => {
        e.preventDefault();
        const track = control.classList.contains('ambient') ? 'ambient' : 'radio';
        this.toggleAudio(track, control);
      });
    });
  }

  async play(track, control) {
    try {
      await this.setupAudioContext();

      if (!this.audioBuffers[track]) {
        console.warn('Audio buffer not loaded');
        return;
      }

      if (this.isPlaying) return;

      // Resume AudioContext if it was suspended
      if (this.audioContext?.state === 'suspended') {
        await this.audioContext.resume();
      }
      
      this.currentTrack = track;
      this.sourceNode = this.createSource();
      
      this.playbackState.startTime = this.audioContext.currentTime;
      this.sourceNode.start(0, this.playbackState.offset);
      
      this.isPlaying = true;
      control?.classList.add('playing');
      
      // Remove playing class from other controls
      document.querySelectorAll('.dock-audio').forEach(ctrl => {
        if (ctrl !== control) ctrl.classList.remove('playing');
      });
      
      console.debug('Playback started:', {
        track,
        startTime: this.playbackState.startTime,
        offset: this.playbackState.offset,
        duration: this.audioBuffers[track].duration
      });

    } catch (error) {
      console.error('Playback error:', error);
    }
  }

  pause(control) {
    if (!this.isPlaying || !this.sourceNode) return;
    
    const elapsed = this.audioContext.currentTime - this.playbackState.startTime;
    this.playbackState.offset = (elapsed + this.playbackState.offset) % this.audioBuffers[this.currentTrack].duration;

    this.sourceNode.stop(0);
    this.sourceNode = null;
    this.isPlaying = false;
    control?.classList.remove('playing');
    console.debug('Playback paused at:', this.pausedAt);
  }

  toggleAudio(track, control) {
    // If same track is playing, pause it
    if (this.isPlaying && this.currentTrack === track) {
      this.pause(control);
      return;
    }
    
    // If different track is playing, stop it first
    if (this.isPlaying) {
      this.pause(document.querySelector(`.dock-audio.${this.currentTrack}`));
    }
    
    // Play the selected track
    this.play(track, control);
  }
}