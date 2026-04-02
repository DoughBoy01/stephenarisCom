export class AudioLoader {
  static async loadAudioBuffer(url, audioContext) {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      return await audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.error('Failed to load audio:', error);
      throw error;
    }
  }
}