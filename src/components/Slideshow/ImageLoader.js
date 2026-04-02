export class ImageLoader {
  load(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const fallbackSrc = '/assets/projects/fallback.jpg';
      
      img.onload = () => resolve(img);
      img.onerror = () => {
        console.warn(`Failed to load image: ${src}, falling back to placeholder`);
        img.src = fallbackSrc;
      };
      
      img.src = src;
    });
  }
}