import * as THREE from 'three';
import { createScene, createCamera, createRenderer, createControls } from './scene/setup.js';
import { setupPostProcessing } from './scene/postprocessing.js';
import { MeshLineManager } from './lines/MeshLineManager.js';
import { Dock } from './components/Dock.js';
import { AnimatedText } from './components/AnimatedText.js';
import { AudioManager } from './audio/AudioManager.js';
import { Sections } from './components/Sections.js';
import { CONFIG } from './config.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import './styles/styles.css';
import './styles/sections.css';

class App {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    // Ensure assets are loaded before initializing
    this.preloadAssets().then(() => {
      this.initializeApp();
    });
  }

  async preloadAssets() {
    const textureLoader = new THREE.TextureLoader();
    try {
      await textureLoader.loadAsync('./assets/strokes/stroke-02.png');
    } catch (error) {
      console.error('Failed to load textures:', error);
    }
  }

  initializeApp() {
    
    this.scene = createScene();
    this.camera = createCamera(this.width, this.height);
    this.renderer = createRenderer(this.width, this.height);
    
    // Add renderer to canvas container
    const container = document.querySelector('.canvas-container');
    container.appendChild(this.renderer.domElement);
    
    // Initialize controls after renderer is in the DOM
    this.controls = createControls(this.camera, this.renderer.domElement);
    this.composer = setupPostProcessing(this.renderer, this.scene, this.camera);
    
    this.lineManager = new MeshLineManager();
    this.scene.add(this.lineManager.createLines());

    // Initialize sections
    this.sections = new Sections();

    // Initialize dock navigation
    this.dock = new Dock();

    // Initialize animated text
    this.animatedText = new AnimatedText();

    // Initialize audio
    this.audio = new AudioManager();

    this.addEventListeners();
    this.animate();
  }

  addEventListeners() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    this.composer.setSize(this.width, this.height);
  }

  animate(time = 0) {
    requestAnimationFrame(this.animate.bind(this));
    
    try {
      this.lineManager.update(time * 0.1);
      
      // Only update controls if they exist and are enabled
      if (this.controls && this.controls.enabled) {
        this.controls.update();
      }
      
      this.composer.render();
    } catch (error) {
      console.error('Animation error:', error);
    }
  }
}

// Start the application
new App();