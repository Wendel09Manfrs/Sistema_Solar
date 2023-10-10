import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import solTextura from './texturess/objetos/sol.jpg';
import mercurioTextura from './texturess/objetos/mercurioReal.jpg';
import venusTextura from './texturess/objetos/venusReal.jpg';
import terraTextura from './texturess/objetos/terraReal.jpg';
import nuvensTextura from './texturess/objetos/nuvens.png';
import marteTextura from './texturess/objetos/marteReal.jpg';
import saturnoTextura from './texturess/objetos/saturnoReal.jpg';
import jupiterTextura from './texturess/objetos/jupiterReal.jpg';
import uranoTextura from './texturess/objetos/uranoReal.jpg';
import anelSaturnoTextura from './texturess/objetos/anelSaturno.jpg';
import anelUranoTextura from './texturess/objetos/anelUrano.png';
import netunoTextura from './texturess/objetos/netunoReal.jpg';
import plutoTextura from './texturess/objetos/pluto.jpg';

import luaTextura from './texturess/objetos/lua.jpg';

import europaTextura from './texturess/objetos/europaJupiter.png';
import calistoTextura from './texturess/objetos/callistoJupiter.jpg';
import ganymedeTextura from './texturess/objetos/ganymedeJupiter.jpg';
import iOTextura from './texturess/objetos/iOJupiter.jpeg';

import dioneTextura from './texturess/objetos/dioneSaturno.jpg';
import japetoTextura from './texturess/objetos/japetoSaturno.jpg';
import rheaTextura from './texturess/objetos/rheaSaturno.jpg';
import titaTextura from './texturess/objetos/titaSaturno.jpg';

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

let trajetoria = document.getElementById("rastro");
let ocultarTrajetoria = document.getElementById("ocultarRastro");


const scene = new THREE.Scene();


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000000);
camera.position.set(150,150,-600);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enablePan = true;  
orbit.enableRotate = true;
orbit.enableZoom = true; 
orbit.maxZoom = 1000;
renderer.shadowMap.enabled = true;




const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([px,nx,py,ny,pz,nz]);

const textureLoader = new THREE.TextureLoader();
let tamanho =10;
const geometriaSol = new THREE.SphereGeometry(109.29/3, 32, 32); // 109 é a proporcao mais proxima da realidade, porém foi diminuido para melhor visualizacao
const materialSol = new THREE.MeshBasicMaterial({
    map:  textureLoader.load(solTextura),
    side: THREE.DoubleSide
});
const sol = new THREE.Mesh(geometriaSol, materialSol);
sol.position.set(0, 0, 0);
scene.add(sol);

function createPlanetLua(size, texture, position, ring) {
  const textureLoader = new THREE.TextureLoader();
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshStandardMaterial({
    map:  textureLoader.load(texture), 
    transparent: true,
    side: THREE.DoubleSide,
  });
  mat.shadowMapEnabled = true;
  mat.shadowMapType = THREE.PCFSoftShadowMap;
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

const mercurio = createPlanetLua(tamanho*0.383,mercurioTextura,100);
const venus = createPlanetLua(tamanho*0.95, venusTextura,200);
const terra = createPlanetLua(tamanho, terraTextura,300);
const nuvens = createPlanetLua(tamanho*1.005, nuvensTextura,300);
const marte = createPlanetLua(tamanho*0.532, marteTextura,450);
const jupiter = createPlanetLua((tamanho/5)*10.97, jupiterTextura, 700);
const saturno = createPlanetLua((tamanho/5)*10, saturnoTextura, 1200, {
  innerRadius: (tamanho/5)*12.88,
  outerRadius: (tamanho/5)*21.92,
  texture: anelSaturnoTextura
});
const uranus = createPlanetLua((tamanho/5)*3.98, uranoTextura, 1500, {
  innerRadius: (tamanho/5)*5.96,
  outerRadius: (tamanho/5)*7.69,
  texture: anelUranoTextura
});

const netuno = createPlanetLua((tamanho/5)*3.85, netunoTextura,1800);
const pluto = createPlanetLua(tamanho*0.19, plutoTextura,2100);


const luaT = createPlanetLua(tamanho*0.273, luaTextura,200);

const europa = createPlanetLua(tamanho*0.245, europaTextura, 700);
const calisto = createPlanetLua(tamanho*0.378, calistoTextura , 700);
const ganymede = createPlanetLua(tamanho*0.413, ganymedeTextura, 700);
const iO = createPlanetLua(tamanho*0.286, iOTextura, 700);

const dione = createPlanetLua(tamanho*0.088, dioneTextura, 1200);
const japeto = createPlanetLua(tamanho*0.115, japetoTextura, 1200);
const rhea = createPlanetLua(tamanho*0.12, rheaTextura,1200);
const tita = createPlanetLua(tamanho*0.406, titaTextura, 1200);

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xFFFFFF, 3, 3000, 0.01);

pointLight.position.set(0,0,0);
scene.add(pointLight);

terra.add(luaT);
jupiter.add(europa);
jupiter.add(calisto);
jupiter.add(ganymede);
jupiter.add(iO);

saturno.add(dione);
saturno.add(japeto);
saturno.add(rhea);
saturno.add(tita);

function corAleatoria() {
  const r = Math.random();
  const g = Math.random();
  const b = Math.random();
  return new THREE.Color(r, g, b);
}

function createLinha() {
  let traco = [];
  let linhaGeo = new THREE.BufferGeometry().setFromPoints(traco);
  let linhaMat = new THREE.PointsMaterial({
    color: corAleatoria(),
    size: 1, 
  });
  let linha = new THREE.Points(linhaGeo, linhaMat);
  scene.add(linha);
  return { traco, linhaGeo, linha };
}

const linhaMer = createLinha();
const linhaVen = createLinha();
const linhaTer = createLinha();
const linhaMar = createLinha();
const linhaJup = createLinha();
const linhaSat = createLinha();
const linhaUr = createLinha();
const linhaNet = createLinha();
const linhaPlu = createLinha();
const linhaEuropa = createLinha();



const linhasW = [linhaMer, linhaVen, linhaTer, linhaMar, linhaJup, linhaSat, linhaUr, linhaNet, linhaPlu];
const planetasW = [mercurio, venus, terra, marte, jupiter, saturno, uranus, netuno, pluto];
const luasJupiter = [europa, calisto, ganymede, iO];
const luasSaturno = [dione, japeto, tita, rhea];



function atualizarRastro(linha, object) {
  linha.traco.push(object.position.clone());
  linha.linhaGeo.setFromPoints(linha.traco);
  linha.linha.material.visible = true; 
}

function ocultarRastro(linha, object,  checked) {
  if(checked){
    linha.traco.push(object.position.clone());
  linha.linhaGeo.setFromPoints(linha.traco);
  }

  linha.linha.material.visible = false; 
}


let tempo=0;

const astros = {
  sol: { objeto: sol, velTrans: 0, velRot: 0.03, raioOrbita: 0, excentricidade: 0 },
  mercurio: { objeto: mercurio, velTrans: 4, velRot: 0.017, raioOrbita: 100, excentricidade: 0.2 },
  venus:{ objeto: venus, velTrans: 1.6,velRot: 0.004, raioOrbita: 200, excentricidade: 0.007 },
  terra:{ objeto: terra, velTrans: 1,velRot: 1, raioOrbita: 300, excentricidade: 0.017 },
  nuvens:{ objeto: nuvens, velTrans: 1, velRot: 1,raioOrbita: 300, excentricidade: 0.017 },
  marte:{ objeto: marte, velTrans: 1 / 1.87, velRot: 1.03, raioOrbita: 450, excentricidade: 0.0934 },
  jupiter: { objeto: jupiter, velTrans: 1 / 11.9, velRot: 2.4,raioOrbita: 700, excentricidade: 0.049 },
  saturno:{ objeto: saturno, velTrans: 1 / 29.41, velRot: 2.2,raioOrbita: 3000, excentricidade: 0.0565 },
  uranus:{ objeto: uranus, velTrans: 1 / 83.3,velRot: 1.38, raioOrbita: 1500, excentricidade: 0.046 },
  netuno:{ objeto: netuno, velTrans: 1 / 166.6, velRot: 1.49, raioOrbita: 1800, excentricidade: 0.0934 },
  pluto:{ objeto: pluto, velTrans: 1 / 250, velRot: 0.156, raioOrbita: 2100, excentricidade: 0.01 },
  luaT:{ objeto: luaT, velTrans: 13, velRot: 4,raioOrbita: 50 , excentricidade: 0.0549,raioCamera:35, objetoPai:terra},
  europa: { objeto: europa, velTrans: 1.76, velRot: 4, raioOrbita: 35.94 , excentricidade: 0.0094, raioCamera:39, objetoPai: jupiter},
  calisto:{ objeto: calisto, velTrans: 1/4.7, velRot: 4, raioOrbita: 81 ,  excentricidade: 0,raioCamera:87, objetoPai: jupiter},
  ganymede: { objeto: ganymede, velTrans: 1/2, velRot: 4, raioOrbita: 50.8 , excentricidade: 0.0013,raioCamera:56, objetoPai: jupiter},
  iO:{ objeto: iO, velTrans: 1, velRot: 4, raioOrbita: 26.66 , excentricidade: 0,raioCamera:32, objetoPai: jupiter},
  dione: { objeto: dione, velTrans: 0.31, velRot: 4, raioOrbita: 25 , excentricidade: 0.022,raioCamera:26, objetoPai: saturno},
  japeto: { objeto: japeto, velTrans: 11.39, velRot: 4, raioOrbita: 206 , excentricidade: 0.0281,raioCamera:208, objetoPai: saturno},
  tita:{ objeto: tita, velTrans: 0.05, velRot: 4, raioOrbita: 69.4 , excentricidade: 0,raioCamera:74, objetoPai: saturno},
  rhea:{ objeto: rhea, velTrans: 0.85, velRot: 4, raioOrbita: 30.46 ,  excentricidade: 0.0013, raioCamera:32, objetoPai: saturno},
};

function atualizarCameraParaAstro(astro) {
  const astroInfo = astros[astro];
  if (!astroInfo) return;

  const {objeto, velTrans, velRot, raioOrbita ,excentricidade, raioCamera, objetoPai } = astroInfo;

  if (raioCamera === undefined) {
  camera.lookAt(objeto.position);
  objeto.add(camera);


  } else  if (raioCamera !== undefined) {
    camera.lookAt(objetoPai.position);
    objetoPai.add(camera);
    const x = Math.cos(-tempo * velTrans) * raioOrbita*1.1 * tamanho * 0.2;
    const z = Math.sin(-tempo * velTrans) * raioOrbita*1.1 * tamanho * 0.2;


    camera.position.set(x, 0, z);
    }
}

function animate() {
//ROTACAO e TRANSLAÇÃO

 tempo += velocidadeTr*5;

  for (const astro in astros) {
    if (astros.hasOwnProperty(astro)) {
      const { objeto, velTrans, velRot, raioOrbita, excentricidade,raioCamera, objetoPai } = astros[astro];
      
      if (raioCamera === undefined) {
        const x = Math.cos(tempo * velTrans) * raioOrbita;
        const z = Math.sin(tempo * velTrans) * raioOrbita * Math.sqrt(1 - Math.pow(excentricidade, 2));
        objeto.position.set(x, 0, z);
      }

      else if (raioCamera !== undefined) {
        const x = Math.cos(-tempo * velTrans) * raioOrbita*tamanho*0.2;
        const z = Math.sin(-tempo * velTrans) * raioOrbita * tamanho * 0.2*Math.sqrt(1 - Math.pow(excentricidade, 2));;
        objeto.position.set(x, 0, z);
      }
      atualizarCameraParaAstro(objeto);
  
      objeto.rotateY(velocidadeRo * velRot);
    }
  }  
  atualizarCameraParaAstro(astro);

if (trajetoria.checked&&!ocultarTrajetoria.checked) {

for (let i = 0; i < linhasW.length; i++) {
  atualizarRastro(linhasW[i], planetasW[i]);
}

}else if(ocultarTrajetoria.checked){
  for (let i = 0; i < linhasW.length; i++) {
    ocultarRastro(linhasW[i], planetasW[i],trajetoria.checked);
  }  
}

atualizarCameraParaAstro(astro);
camera.updateProjectionMatrix();
renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight)

})










