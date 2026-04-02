// Configuration constants
const isProd = import.meta.env.PROD;

export const CONFIG = {
  BASE_URL: isProd ? '.' : '',
  SCENE: {
    NUM_LINES: 35,
    NUM_POINTS: 300,
    POINT_SPACING: 0.05,
    START_X: -12
  },
  CAMERA: {
    FOV: 75,
    NEAR: 0.1,
    FAR: 1000,
    POSITION_Z: 8
  },
  LINE: {
    WIDTH: 0.35,
    WAVE_LENGTH: 0.012,
    AMPLITUDE: 2.0,
    SPEED: 0.08
  },
  BLOOM: {
    STRENGTH: 2.8,
    RADIUS: 1,
    THRESHOLD: 0.4
  },
  AUDIO: {
    VOLUME: 0.2,
    COMPRESSOR: {
      THRESHOLD: -24,
      KNEE: 30,
      RATIO: 12,
      ATTACK: 0.003,
      RELEASE: 0.25
    }
  }
};