import * as THREE from 'three';
import { MeshLine, MeshLineGeometry, MeshLineMaterial } from '../MeshLine/index.js';
import { CONFIG } from '../config.js';

export class MeshLineManager {
  constructor() {
    this.linesGroup = new THREE.Group();
    this.texLoader = new THREE.TextureLoader();
  }

  createLine(index) {
    const points = this.generatePoints();
    const geometry = new MeshLineGeometry();
    geometry.setPoints(points);

    const material = this.createLineMaterial(index);
    const meshLine = new MeshLine(geometry, material);
    
    const offset = index * 10;
    meshLine.userData.update = (t) => this.updatePoints(points, geometry, t, offset);
    
    meshLine.position.y = index * 0.1;
    meshLine.position.z = index * -0.2;
    meshLine.rotation.x = index * 0.02;

    return meshLine;
  }

  generatePoints() {
    const points = [];
    for (let j = 0; j < CONFIG.SCENE.NUM_POINTS; j++) {
      points.push(
        CONFIG.SCENE.START_X + j * CONFIG.SCENE.POINT_SPACING,
        Math.sin(j * 0.075),
        0
      );
    }
    return points;
  }

  createLineMaterial(index) {
    const hue = 0.6 - index * 0.01;
    const lightness = 0.8 - index * 0.015;
    const color = new THREE.Color().setHSL(hue, 1.0, lightness);

    return new MeshLineMaterial({
      color,
      map: this.texLoader.load("./assets/strokes/stroke-02.png"),
      useMap: true,
      alphaTest: 0.5,
      transparent: true,
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
      lineWidth: CONFIG.LINE.WIDTH,
      blending: THREE.AdditiveBlending,
      opacity: 0.8
    });
  }

  updatePoints(points, geometry, t, offset) {
    for (let i = 0; i < points.length; i += 3) {
      const wave = Math.sin((i - t + offset) * CONFIG.LINE.WAVE_LENGTH);
      const phase = Math.cos((i + t) * 0.02);
      points[i + 1] = wave * CONFIG.LINE.AMPLITUDE * (1 + phase * 0.3);
    }
    geometry.setPoints(points);
  }

  createLines() {
    for (let i = 0; i < CONFIG.SCENE.NUM_LINES; i++) {
      const line = this.createLine(i);
      this.linesGroup.add(line);
    }
    return this.linesGroup;
  }

  update(t) {
    this.linesGroup.children.forEach(line => line.userData.update(t));
  }
}