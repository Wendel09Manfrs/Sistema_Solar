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


let velocidadeTr = 0.005;
let velocidadeRo =0.005;

const translacao = document.getElementById("barraTranslacao");

translacao.addEventListener("input", function() {
  velocidadeTr = parseFloat(translacao.value);
});

const rotacao = document.getElementById("barraRotacao");

rotacao.addEventListener("input", function() {
  velocidadeRo = parseFloat(rotacao.value);
});


const scene = new THREE.Scene();


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)

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
  const obj = new THREE.Object3D();
  obj.add(planeta);
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
    obj.add(ringMesh); 
    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(obj);
  planeta.position.x = position;
  return {planeta,obj}
}

///////PARA TESTAR////////
function createMoon(size, texture, position) {
  const textureLoader = new THREE.TextureLoader();
  const geo2 = new THREE.SphereGeometry(size, 30, 30);
  const mat2 = new THREE.MeshBasicMaterial({
    map:  textureLoader.load(texture), 
  });
  const planeta = new THREE.Mesh(geo2, mat2);
  scene.add(planeta);
  planeta.position.x = position;
  return planeta;
}
///////PARA TESTAR////////



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

////////////PARA TESTAR//////////////
const ficticio = createMoon(10*3, terraTextura, 199.29*2);
camera.position.set(150,150,-300);
////////////PARA TESTAR//////////////


terra.obj.add(lua.obj);
jupiter.obj.add(europa.obj);
jupiter.obj.add(calisto.obj);
jupiter.obj.add(ganymede.obj);
jupiter.obj.add(iO.obj);


const uranus = createPlanet(3.98*3, uranoTextura, 1544.29*2, {
  innerRadius: 5.96*3,
  outerRadius: 7.69*3,
  texture: anelUranoTextura
});


const pointLight = new THREE.PointLight(0xFFFFFF, 5, 50);
scene.add(pointLight);

function animate() {
//ROTACAO

const tempo = Date.now() *velocidadeTr;

  sol.rotateY(velocidadeRo/33.33);
  mercurio.planeta.rotateY(velocidadeRo/58.8);
  venus.planeta.rotateY(-velocidadeRo/244);//unico planeta que rotaciona em sentido horario na perspectiva de cima do plano do sistema solar
  terra.planeta.rotateY(velocidadeRo);
  nuvens.planeta.rotateY(velocidadeRo);

  marte.planeta.rotateY(velocidadeRo*1.03);
  jupiter.planeta.rotateY(velocidadeRo*2.4);
  saturno.planeta.rotateY(velocidadeRo*2.2);
  uranus.planeta.rotateY(velocidadeRo*1.38);
  netuno.planeta.rotateY(velocidadeRo*1.49);
  pluto.planeta.rotateY(velocidadeRo/6.41);

//TRANSLACAO
  terra.obj.rotateY(velocidadeTr);
  nuvens.obj.rotateY(velocidadeTr);

  mercurio.obj.rotateY(velocidadeTr*4);
  venus.obj.rotateY(velocidadeTr*1.6);
  marte.obj.rotateY(velocidadeTr/1.87);

  jupiter.obj.rotateY(velocidadeTr/11.9);
  saturno.obj.rotateY(velocidadeTr/29.41);
  uranus.obj.rotateY(velocidadeTr/83.3);
  netuno.obj.rotateY(velocidadeTr/166.6);
  pluto.obj.rotateY(velocidadeTr/250);


  //LUAS DOS PLANETAS TERRA E JÚPITER
//translada a terra na mesma rotação da terra
  lua.obj.position.set(Math.cos(-tempo*8) * 20, 0, Math.sin(-tempo*8) * 20);

  //transladam no sentido de translação de rotação de jupiter
  europa.obj.position.set(Math.cos(-tempo*1.76) * 107.84, 0, Math.sin(-tempo*1.76) *107.84 );
  calisto.obj.position.set(Math.cos(-tempo/4.7) * 243.22, 0, Math.sin(-tempo/4.7) * 243.22);
  ganymede.obj.position.set(Math.cos(-tempo/2) *152.42 , 0, Math.sin(-tempo/2) * 152.42);
  iO.obj.position.set(Math.cos(-tempo) * 80, 0, Math.sin(-tempo) * 80);


/////////PARTE PARA TESTE//////////
  ficticio.position.set(Math.cos(-tempo/100) * 199.29*2, 0, Math.sin(-tempo/100) * 199.29*2);
  ficticio.rotation.y+= 0.01;

/*
orbit.target = new THREE.Vector3(ficticio.x,ficticio.y, ficticio.z ); //////////
camera.lookAt(ficticio.position.x,ficticio.position.y, ficticio.position.z );//////////////ficticio.add(camera);
*/
/////////PARTE PARA TESTE//////////


orbit.target = new THREE.Vector3(sol.x,sol.y, sol.z ); //////////
camera.lookAt(sol.position.x,sol.position.y, sol.position.z );//////////////sol.add(camera);
sol.add(camera);

renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight)

})










