import Galaxy from 'Galaxy';
// @ts-expect-error
import { OrbitControls } from '../helpers/OrbitControls';
import { Vector3 } from 'three';

// @ts-expect-error
import particleTexture from '../assets/particle-example.png';

const canvas = document.createElement('canvas');

function basicExample(): void {
  const galaxy = new Galaxy({
    canvas: document.querySelector('#c') ?? canvas,
    window,
    backgroundColor: '#02040c',
    layers: [
      {
        color: '#6b32a8', // Deep Violet
        texture: particleTexture,
        count: 50000,
        sizeAmp: 1.5,
        minRadius: 0.2,
        maxRadius: 2.5,
        speedAmp: 1.2
      },
      {
        color: '#2196F3', // Light Blue
        texture: particleTexture,
        count: 30000,
        sizeAmp: 1.0,
        minRadius: 0.1,
        maxRadius: 2.0,
        speedAmp: 0.8
      },
      {
        color: '#ffc107', // Star gold accent
        texture: particleTexture,
        count: 10000,
        sizeAmp: 0.8,
        minRadius: 0.5,
        maxRadius: 1.5,
        speedAmp: 1.5
      }
    ]
  });

  // Track mouse for shader interaction
  window.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    galaxy.trackMouse(new Vector3(x, y, 0));
  });

  // Add passive rotation
  setInterval(() => {
    galaxy.camera.position.applyAxisAngle(new Vector3(0, 1, 0), 0.002);
    galaxy.camera.lookAt(0, 0, 0);
  }, 16);

  // eslint-disable-next-line no-new
  new OrbitControls(galaxy.camera, document.querySelector('#c'));
  galaxy.render();
  galaxy.play();
}

export default basicExample;
