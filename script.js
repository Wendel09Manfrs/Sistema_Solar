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
import europaTextura from './texturess/objetos/europaJupiter.png';
import calistoTextura from './texturess/objetos/callistoJupiter.jpg';
import ganymedeTextura from './texturess/objetos/ganymedeJupiter.jpg';
import iOTextura from './texturess/objetos/iOJupiter.jpeg';

import nx from './texturess/nx.png';
import ny from './texturess/ny.png';
import nz from './texturess/nz.png';
import px from './texturess/px.png';
import py from './texturess/py.png';
import pz from './texturess/pz.png';

const scene = new THREE.Scene();


// Inicializa o renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
// Anexa renderer ao body do front
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 10000);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enablePan = true;  
orbit.enableRotate = true;
orbit.maxZoom = 1000;

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

function createPlanet(size, texture, position, ring) {
  const textureLoader = new THREE.TextureLoader();
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshBasicMaterial({
    map:  textureLoader.load(texture), // Use TextureLoader here
    transparent: true
  });
  const planeta = new THREE.Mesh(geo, mat);

  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    planeta.add(ringMesh); 
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(planeta);
  planeta.position.x = position;
  return planeta;
}


const terra = createPlanet(1*3, terraTextura, 184.29*2);
const lua = createPlanet(0.273*3, luaTextura, 184.29*2);
const nuvens = createPlanet(1.01*3, nuvensTextura, 184.29*2);
const mercurio = createPlanet(0.383*3,mercurioTextura, 138.29*2);
const venus = createPlanet(0.95*3, venusTextura, 163.29*2);
const netuno = createPlanet(3.85*3, netunoTextura, 2359.29*2);
const pluto = createPlanet(0.19*3, plutoTextura, 3069.29*2);
const marte = createPlanet(0.532*3, marteTextura, 224.29*2);



const europa = createPlanet(0.245*3, europaTextura, 499.29*2);
const calisto = createPlanet(0.378*3, calistoTextura , 499.29*2);
const ganymede = createPlanet(0.413*3, ganymedeTextura, 499.29*2);
const iO = createPlanet(0.286*3, iOTextura, 499.29*2);


const jupiter = createPlanet(10.97*3, jupiterTextura, 499.29*2);
const saturno = createPlanet(10*3, saturnoTextura, 824.29*2, {
    innerRadius: 12.88*3,
    outerRadius: 21.92*3,
    texture: anelSaturnoTextura
});

camera.position.set(50,50,-200);

terra.add(lua);

jupiter.add(europa);
jupiter.add(calisto);
jupiter.add(ganymede);
jupiter.add(iO);


const uranus = createPlanet(3.98*3, uranoTextura, 1544.29*2, {
  innerRadius: 5.96*3,
  outerRadius: 7.69*3,
  texture: anelUranoTextura
});


const pointLight = new THREE.PointLight(0xFFFFFF, 5, 50);
scene.add(pointLight);

function animate() {
  

  sol.rotateY(0.0003);
  mercurio.rotateY(0.00017);
  venus.rotateY(-0.000041);//unico planeta que rotaciona em sentido horario na perspectiva de cima do plano do sistema solar
  terra.rotateY(0.01);
  nuvens.rotateY(0.01);
  lua.rotateY(0.01);
  marte.rotateY(0.0103);
  jupiter.rotateY(0.024);
  saturno.rotateY(0.022);
  uranus.rotateY(0.0138);
  netuno.rotateY(0.0149);
  pluto.rotateY(0.00156);

  //ao redor do sol
  //mercurio.obj.rotateY(0.04);
 // venus.obj.rotateY(0.016);
  //terra.rotation.z+=0.1;
/*
  marte.obj.rotateY(0.00532);
  nuvens.obj.rotateY(0.01);
  jupiter.obj.rotateY(0.00084);
  


  saturno.obj.rotateY(0.00034);
  uranus.obj.rotateY(0.00012);
  netuno.obj.rotateY(0.00006);
  pluto.obj.rotateY(0.00004);
*/

  const tempoTerra = Date.now() * 0.0008;
  const aoRedorJupiter = Date.now() * 0.001;
  const tempo = Date.now() * 0.0001; //só para teste

  lua.position.set(Math.cos(-tempoTerra) * 20, 0, Math.sin(-tempoTerra) * 20);//translada a terra no mesmo movimento da terra


  //translacao
  mercurio.position.set(Math.cos(tempo*4) * 138.29*2, 0, Math.sin(tempo*4) * 138.29*2);
  venus.position.set(Math.cos(tempo*1.6) * 163.29*2, 0, Math.sin(tempo*1.6) * 163.29*2);
  terra.position.set(Math.cos(tempo) * 184.29*2, 0, Math.sin(tempo) * 184.29*2);
  nuvens.position.set(Math.cos(tempo) * 184.29*2, 0, Math.sin(tempo) * 184.29*2);
  marte.position.set(Math.cos(tempo/1.87) * 224.29*2, 0, Math.sin(tempo/1.87) * 224.29*2);
  
  saturno.position.set(Math.cos(tempo/29.41) * 824.29*2, 0, Math.sin(tempo/29.41) * 824.29*2);
  uranus.position.set(Math.cos(tempo/83.3) * 1544.29*2, 0, Math.sin(tempo/83.3) *1544.29*2 );
  netuno.position.set(Math.cos(tempo/166.6) * 2359.29*2, 0, Math.sin(tempo/166.6) *2359.29*2 );
  pluto.position.set(Math.cos(tempo/250) * 3069.29*2, 0, Math.sin(tempo/250) *3069.29*2 );

  jupiter.position.set(Math.cos(tempo/11.9) * 499.29*2, 0, Math.sin(tempo/11.9) * 499.29*2);

  europa.position.set(Math.cos(-aoRedorJupiter*1.76) * 107.84, 0, Math.sin(-aoRedorJupiter*1.76) *107.84 );
  calisto.position.set(Math.cos(-aoRedorJupiter/4.7) * 243.22, 0, Math.sin(-aoRedorJupiter/4.7) * 243.22);
  ganymede.position.set(Math.cos(-aoRedorJupiter/2) *152.42 , 0, Math.sin(-aoRedorJupiter/2) * 152.42);
  iO.position.set(Math.cos(-aoRedorJupiter) * 80, 0, Math.sin(-aoRedorJupiter) * 80);

//orbit.target = new THREE.Vector3(terra.position.x,terra.position.y, terra.position.z ); //////////
 camera.lookAt(jupiter.position.x,jupiter.position.y, jupiter.position.z );//////////////
jupiter.add(camera);


renderer.render(scene, camera)
}


renderer.setAnimationLoop(animate);


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight)

})










