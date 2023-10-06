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


let velocidadeTr = 0.001;
let velocidadeRo =0.001;

const translacao = document.getElementById("barraTranslacao");

translacao.addEventListener("input", function() {
  velocidadeTr = parseFloat(translacao.value);
});

const rotacao = document.getElementById("barraRotacao");

rotacao.addEventListener("input", function() {
  velocidadeRo = parseFloat(rotacao.value);
});

let astro = "sol";

let elemento = document.getElementById("astros");
elemento.addEventListener("change", function () {
    astro = elemento.value;
    
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

camera.position.set(150,150,-300);



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
let tempo=0;
function animate() {
//ROTACAO

 tempo += velocidadeTr*10;

  sol.rotateY(velocidadeRo/33.33);
  mercurio.rotateY(velocidadeRo/58.8);
  venus.rotateY(-velocidadeRo/244);//unico planeta que rotaciona em sentido horario na perspectiva de cima do plano do sistema solar
  terra.rotateY(velocidadeRo);
  nuvens.rotateY(velocidadeRo);

  marte.rotateY(velocidadeRo*1.03);
  jupiter.rotateY(velocidadeRo*2.4);
  saturno.rotateY(velocidadeRo*2.2);
  uranus.rotateY(velocidadeRo*1.38);
  netuno.rotateY(velocidadeRo*1.49);
  pluto.rotateY(velocidadeRo/6.41);



  mercurio.position.set(Math.cos(tempo*4) * 138.29*2, 0, Math.sin(tempo*4) * 138.29*2);
  venus.position.set(Math.cos(tempo*1.6) * 163.29*2, 0, Math.sin(tempo*1.6) * 163.29*2);
  terra.position.set(Math.cos(tempo) * 184.29*2, 0, Math.sin(tempo) * 184.29*2);
  nuvens.position.set(Math.cos(tempo) * 184.29*2, 0, Math.sin(tempo) * 184.29*2);
  marte.position.set(Math.cos(tempo/1.87) * 224.29*2, 0, Math.sin(tempo/1.87) * 224.29*2);
  
  
  uranus.position.set(Math.cos(tempo/83.3) * 1544.29*2, 0, Math.sin(tempo/83.3) *1544.29*2 );
  netuno.position.set(Math.cos(tempo/166.6) * 2359.29*2, 0, Math.sin(tempo/166.6) *2359.29*2 );
  pluto.position.set(Math.cos(tempo/250) * 3069.29*2, 0, Math.sin(tempo/250) *3069.29*2 );

  jupiter.position.set(Math.cos(tempo/11.9) * 499.29*2, 0, Math.sin(tempo/11.9) * 499.29*2);
  saturno.position.set(Math.cos(tempo/29.41) * 824.29*2, 0, Math.sin(tempo/29.41) * 824.29*2);


  //LUAS DOS PLANETAS TERRA E JÚPITER
//translada a terra na mesma rotação da terra
  lua.position.set(Math.cos(-tempo*8) * 20, 0, Math.sin(-tempo*8) * 20);

  //transladam no sentido de translação de rotação de jupiter
  europa.position.set(Math.cos(-tempo*1.76) * 107.84, 0, Math.sin(-tempo*1.76) *107.84 );
  calisto.position.set(Math.cos(-tempo/4.7) * 243.22, 0, Math.sin(-tempo/4.7) * 243.22);
  ganymede.position.set(Math.cos(-tempo/2) *152.42 , 0, Math.sin(-tempo/2) * 152.42);
  iO.position.set(Math.cos(-tempo) * 80, 0, Math.sin(-tempo) * 80);


  switch (astro) {
    case "sol":
        camera.lookAt(sol.position);
        sol.add(camera);
        break;
    case "mercurio":
        camera.lookAt(mercurio.position);
        mercurio.add(camera);
        break;
    case "venus":
        camera.lookAt(venus.position);
        venus.add(camera);
        break;
    case "terra":
        camera.lookAt(terra.position);
        terra.add(camera);
        break;
    case "marte":
        camera.lookAt(marte.position);
        marte.add(camera);
        break;
    case "jupiter":
        camera.lookAt(jupiter.position);
        jupiter.add(camera);
          break;
    case "saturno":
        camera.lookAt(saturno.position);
        saturno.add(camera);
          break;
    case "uranus":
        camera.lookAt(uranus.position);
        uranus.add(camera);
          break;
    case "netuno":
        camera.lookAt(netuno.position);
        netuno.add(camera);
          break;
    case "pluto":
        camera.lookAt(pluto.position);
        pluto.add(camera);
          break;
}

renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight)

})










