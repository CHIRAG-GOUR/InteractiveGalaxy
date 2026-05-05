import Galaxy from 'Galaxy';
// @ts-expect-error
import { OrbitControls } from '../helpers/OrbitControls';
import { Vector2, Vector3, Raycaster, Plane } from 'three';

// @ts-expect-error
import particleTexture from '../assets/particle-example.png';

const canvas = document.createElement('canvas');

function basicExample(): void {
  // Mobile performance optimization
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const particleMultiplier = isMobile ? 0.2 : 1.0;

  const galaxy = new Galaxy({
    canvas: document.querySelector('#c') ?? canvas,
    window,
    backgroundColor: '#000000', // Matches Skillizee theme
    layers: [
      {
        color: '#6b32a8', // Deep Violet
        texture: particleTexture,
        count: Math.floor(100000 * particleMultiplier),
        sizeAmp: 1.5,
        minRadius: 0.1,
        maxRadius: 3.5,
        speedAmp: 1.2
      },
      {
        color: '#2196F3', // Light Blue
        texture: particleTexture,
        count: Math.floor(50000 * particleMultiplier),
        sizeAmp: 1.0,
        minRadius: 0.1,
        maxRadius: 2.5,
        speedAmp: 0.8
      },
      {
        color: '#ffc107', // Star gold accent
        texture: particleTexture,
        count: Math.floor(15000 * particleMultiplier),
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

  // Setup raycaster for accurate interaction on the galaxy plane
  const raycaster = new Raycaster();
  const mouse = new Vector2();
  const groundPlane = new Plane(new Vector3(0, 1, 0), 0);
  const targetPointer = new Vector3();

  // Unified pointer handler for mouse and touch
  const handlePointer = (clientX: number, clientY: number): void => {
    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, galaxy.camera);
    raycaster.ray.intersectPlane(groundPlane, targetPointer);
    
    galaxy.trackMouse(targetPointer);
  };

  // Mouse interaction
  window.addEventListener('mousemove', (event) => handlePointer(event.clientX, event.clientY));

  // Touch interaction (optimized for mobile)
  window.addEventListener('touchstart', (event) => {
    if (event.touches.length > 0) {
      handlePointer(event.touches[0].clientX, event.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
      handlePointer(event.touches[0].clientX, event.touches[0].clientY);
    }
  }, { passive: true });

  // Add passive rotation around the Y axis
  setInterval(() => {
    galaxy.camera.position.applyAxisAngle(new Vector3(0, 1, 0), 0.002);
    galaxy.camera.lookAt(0, 0, 0);
  }, 16);

  // eslint-disable-next-line no-new
  if (!isMobile) {
    new OrbitControls(galaxy.camera, document.querySelector('#c'));
  }
  
  galaxy.render();
  galaxy.play();
}

export default basicExample;
