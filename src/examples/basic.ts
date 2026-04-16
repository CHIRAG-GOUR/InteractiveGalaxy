import Galaxy from 'Galaxy';
// @ts-expect-error
import { OrbitControls } from '../helpers/OrbitControls';
import { Vector2, Vector3, Raycaster, Plane } from 'three';

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
        count: 100000,
        sizeAmp: 1.5,
        minRadius: 0.1,
        maxRadius: 3.5,
        speedAmp: 1.2
      },
      {
        color: '#2196F3', // Light Blue
        texture: particleTexture,
        count: 50000,
        sizeAmp: 1.0,
        minRadius: 0.1,
        maxRadius: 2.5,
        speedAmp: 0.8
      },
      {
        color: '#ffc107', // Star gold accent
        texture: particleTexture,
        count: 15000,
        sizeAmp: 0.8,
        minRadius: 0.2,
        maxRadius: 2.0,
        speedAmp: 1.5
      }
    ]
  });

  // Position camera directly overhead for a centered look with slight angle for 3D depth
  galaxy.camera.position.set(0, 4.0, 1.0);
  galaxy.camera.lookAt(0, 0, 0);

  // Setup raycaster for accurate mouse interaction on the galaxy plane
  const raycaster = new Raycaster();
  const mouse = new Vector2();
  const groundPlane = new Plane(new Vector3(0, 1, 0), 0);
  const targetPointer = new Vector3();

  // Track mouse for shader interaction
  window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, galaxy.camera);
    raycaster.ray.intersectPlane(groundPlane, targetPointer);
    
    galaxy.trackMouse(targetPointer);
  });

  // Add passive rotation around the Y axis
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
