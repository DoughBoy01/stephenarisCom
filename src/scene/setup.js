import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CONFIG } from '../config.js';

export function createScene() {
  const scene = new THREE.Scene();
  return scene;
}

export function createCamera(width, height) {
  const camera = new THREE.PerspectiveCamera(
    CONFIG.CAMERA.FOV,
    width / height,
    CONFIG.CAMERA.NEAR,
    CONFIG.CAMERA.FAR
  );
  camera.position.z = CONFIG.CAMERA.POSITION_Z;
  return camera;
}

export function createRenderer(width, height) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  return renderer;
}

export function createControls(camera, domElement) {
  const controls = new OrbitControls(camera, domElement);
  
  // Configure controls safely to prevent touch/pointer events errors
  controls.enableDamping = true;
  controls.dampingFactor = 0.03;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.rotateSpeed = 0.5;
  
  // Set minimum and maximum distance to prevent errors
  controls.minDistance = 5;
  controls.maxDistance = 15;
  
  // Handle incomplete events safely
  controls.addEventListener('end', () => {
    // Ensure camera is always looking at the scene center
    camera.lookAt(0, 0, 0);
  });
  
  return controls;
}