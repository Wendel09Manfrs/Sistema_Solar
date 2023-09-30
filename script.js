import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import venusTextura from './texturess/objetos/venus.jpg';
import mercurioTextura from './texturess/objetos/mercurio.jpg';
import netunoTextura from './texturess/objetos/netuno.jpg';
import marteTextura from './texturess/objetos/marte.jpg';
import saturnoTextura from './texturess/objetos/saturno.jpg';
import jupiterTextura from './texturess/objetos/jupiter.jpg';
import terraTextura from './texturess/objetos/terra.jpg';
import plutoTextura from './texturess/objetos/pluto.jpg';
import solTextura from './texturess/objetos/sol.jpg';
import nuvensTextura from './texturess/objetos/nuvens.jpg';
import uranoTextura from './texturess/objetos/urano.jpg';
import anelSaturnoTextura from './texturess/objetos/anelSaturno.jpg';
import anelUranoTextura from './texturess/objetos/anelUrano.png';
import luaTextura from './texturess/objetos/lua.jpg';

import nx from './texturess/nx.png';
import ny from './texturess/ny.png';
import nz from './texturess/nz.png';
import px from './texturess/px.png';
import py from './texturess/py.png';
import pz from './texturess/pz.png';

const scene = new THREE.Scene()
        'px.png',
				'nx.png',
				'py.png',
				'ny.png',
				'pz.png',
				'nz.png'

// Inicializa o renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
// Anexa renderer ao body do front
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();
// Camera positioning

// Reposicionamento da câmera em Z
camera.position.set(-120, 180, 180);
//orbit.update();
camera.lookAt(0,0,0);


const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    px,
    nx,
    py,
    ny,
    pz,
    nz
]);







const textureLoader = new THREE.TextureLoader();


//const texturaSol = textureLoader.load(solTextura);
const geometriaSol = new THREE.SphereGeometry(109.29, 32, 32); // Raio maior para o Sol
const materialSol = new THREE.MeshBasicMaterial({
    map:  textureLoader.load(solTextura)
});
const sol = new THREE.Mesh(geometriaSol, materialSol);
sol.position.set(0, 0, 0);
scene.add(sol);

function createPlanete(size, texture, position, ring) {
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(texture),
      transparent: true
  });
  const mesh = new THREE.Mesh(geo, mat);
  const obj = new THREE.Object3D();
  obj.add(mesh);
  if(ring) {
      const ringGeo = new THREE.RingGeometry(
          ring.innerRadius,
          ring.outerRadius,
          32);
      const ringMat = new THREE.MeshBasicMaterial({
          map: textureLoader.load(ring.texture),
          side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      obj.add(ringMesh);
      ringMesh.position.x = position;
      ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(obj);
  mesh.position.x = position;
  return {mesh, obj}
}



const terra = createPlanete(1*3, terraTextura, 184.29);
const lua = createPlanete(0.273*3, luaTextura, 184.29);
const nuvens = createPlanete(1.01*3, nuvensTextura, 184.29);
const mercurio = createPlanete(0.383*3,mercurioTextura, 138.29);
const venus = createPlanete(0.95*3, venusTextura, 163.29);
const netuno = createPlanete(3.85*3, netunoTextura, 2359.29);
const pluto = createPlanete(0.19*3, plutoTextura, 3069.29);
const marte = createPlanete(0.532*3, marteTextura, 224.29);


const jupiter = createPlanete(10.97*3, jupiterTextura, 499.29);
const saturno = createPlanete(10*3, saturnoTextura, 824.29, {
    innerRadius: 15,
    outerRadius: 25,
    texture: anelSaturnoTextura
});

const uranus = createPlanete(9.14*3, uranoTextura, 1544.29, {
  innerRadius: 10,
  outerRadius: 14,
  texture: anelUranoTextura
});



var pointLight = new THREE.PointLight(0xFFFFFF, 5, 50);
scene.add(pointLight);

function animate() {

    // Coloque os planetas nas posições corretas ao redor do Sol
    
  sol.rotateY(0.0003);
  mercurio.mesh.rotateY(0.00017);
  venus.mesh.rotateY(0.000041);
  terra.mesh.rotateY(0.01);
  nuvens.mesh.rotateY(0.01);
  lua.mesh.rotateY(0.02);
  //nuvens.rotation.y += 0.01;
  marte.mesh.rotateY(0.0103);
  jupiter.mesh.rotateY(0.024);
  saturno.mesh.rotateY(0.022);
  uranus.mesh.rotateY(0.0138);
  netuno.mesh.rotateY(0.0149);
  pluto.mesh.rotateY(0.00156);

  //Around-sun-rotation
  mercurio.obj.rotateY(0.04);
  venus.obj.rotateY(0.016);
  terra.obj.rotateY(0.01);
  lua.obj.rotateY(0.02);
  //nuvens.position.set(Math.sin(tempo * 0.12) * 62, 0, Math.cos(tempo * 0.12) * 62);
  marte.obj.rotateY(0.00532);
  nuvens.obj.rotateY(0.01);
  jupiter.obj.rotateY(0.00084);
  saturno.obj.rotateY(0.00034);
  uranus.obj.rotateY(0.00012);
  netuno.obj.rotateY(0.00006);
  pluto.obj.rotateY(0.00004);


// Renderiza cena
renderer.render(scene, camera)
}


renderer.setAnimationLoop(animate);


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
// Redimensiona o renderer
renderer.setSize(window.innerWidth, window.innerHeight)

})










