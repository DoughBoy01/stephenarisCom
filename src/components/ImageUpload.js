export class ImageUpload {
  constructor(container) {
    this.container = container;
    this.maxFileSize = 5 * 1024 * 1024; // 5MB
    this.allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    this.createUploadArea();
    this.setupEventListeners();
  }

  createUploadArea() {
    this.uploadArea = document.createElement('div');
    this.uploadArea.className = 'image-upload-area';
    this.uploadArea.innerHTML = `
      <div class="upload-prompt">
        <span class="upload-icon">📷</span>
        <p>Drag images here or click to upload</p>
        <span class="upload-info">Supports: JPG, PNG, GIF, WebP (max 5MB)</span>
      </div>
      <input type="file" class="file-input" accept="image/*" multiple aria-label="Image upload">
      <div class="image-preview-container"></div>
      <div class="upload-error" aria-live="polite"></div>
    `;
    
    this.fileInput = this.uploadArea.querySelector('.file-input');
    this.previewContainer = this.uploadArea.querySelector('.image-preview-container');
    this.errorDisplay = this.uploadArea.querySelector('.upload-error');
    
    this.container.appendChild(this.uploadArea);
  }

  setupEventListeners() {
    // Click to upload
    this.uploadArea.addEventListener('click', () => this.fileInput.click());
    
    // File selection
    this.fileInput.addEventListener('change', (e) => {
      e.stopPropagation();
      this.handleFiles(e.target.files);
    });
    
    // Drag and drop
    this.uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.uploadArea.classList.add('drag-over');
    });
    
    this.uploadArea.addEventListener('dragleave', () => {
      this.uploadArea.classList.remove('drag-over');
    });
    
    this.uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      this.uploadArea.classList.remove('drag-over');
      this.handleFiles(e.dataTransfer.files);
    });
  }

  async handleFiles(files) {
    this.clearError();
    const validFiles = Array.from(files).filter(file => this.validateFile(file));
    
    if (validFiles.length === 0) return;
    
    for (const file of validFiles) {
      try {
        const preview = await this.createImagePreview(file);
        this.previewContainer.appendChild(preview);
      } catch (error) {
        this.showError(`Failed to load image: ${file.name}`);
      }
    }
  }

  validateFile(file) {
    if (!this.allowedTypes.includes(file.type)) {
      this.showError(`Invalid file type: ${file.name}`);
      return false;
    }
    
    if (file.size > this.maxFileSize) {
      this.showError(`File too large: ${file.name}`);
      return false;
    }
    
    return true;
  }

  createImagePreview(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const preview = document.createElement('div');
      preview.className = 'image-preview';
      
      reader.onload = () => {
        preview.innerHTML = `
          <img src="${reader.result}" alt="${file.name}" loading="lazy">
          <button class="remove-image" aria-label="Remove image">×</button>
        `;
        
        preview.querySelector('.remove-image').addEventListener('click', (e) => {
          e.stopPropagation();
          preview.remove();
        });
        
        resolve(preview);
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  showError(message) {
    this.errorDisplay.textContent = message;
    this.errorDisplay.classList.add('visible');
  }

  clearError() {
    this.errorDisplay.textContent = '';
    this.errorDisplay.classList.remove('visible');
  }
}