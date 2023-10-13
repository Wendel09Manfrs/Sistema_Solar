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

import nx from './texturess/cenario/nx.png';
import ny from './texturess/cenario/ny.png';
import nz from './texturess/cenario/nz.png';
import px from './texturess/cenario/px.png';
import py from './texturess/cenario/py.png';
import pz from './texturess/cenario/pz.png';


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

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500000);
camera.position.set(150,150,-600);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enablePan = true;  
orbit.enableRotate = true;
orbit.enableZoom = true; 
renderer.shadowMap.enabled = true;
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([px,nx,py,ny,pz,nz]);

const backgroundMaterial = new THREE.MeshBasicMaterial({ map: cubeTextureLoader });
backgroundMaterial.reflectivity = 0.1;

const textureLoader = new THREE.TextureLoader();
let tamanho =10;
const geometriaSol = new THREE.SphereGeometry(109.29, 32, 32); // 109 é a proporcao mais proxima da realidade, porém foi diminuido para melhor visualizacao
const materialSol = new THREE.MeshBasicMaterial({
    map:  textureLoader.load(solTextura),
    side: THREE.DoubleSide
});
const sol = new THREE.Mesh(geometriaSol, materialSol);
sol.position.set(0, 0, 0);
scene.add(sol);

function createPlanetLua(size, texture, position,inclinacao, ring) {
  const textureLoader = new THREE.TextureLoader();
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshStandardMaterial({
    map:  textureLoader.load(texture), 
    transparent: true,
    side: THREE.DoubleSide,
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
 
const inclinaRad = (inclinacao * Math.PI) / 180.0;

planeta.rotation.x = inclinaRad;
  return planeta;
}

const mercurio = createPlanetLua(4,mercurioTextura,100,0.034);
const venus = createPlanetLua(9.5, venusTextura,200,177.4);
const terra = createPlanetLua(10, terraTextura,300,23.44);
//const nuvens = createPlanetLua(tamanho*1.01, nuvensTextura,300);
const marte = createPlanetLua(5.5, marteTextura,450,25.19);
const jupiter = createPlanetLua(20, jupiterTextura, 700,3.12);
const saturno = createPlanetLua(19, saturnoTextura, 1200,26.73, {
  innerRadius: 24,
  outerRadius: 42,
  texture: anelSaturnoTextura
});
const uranus = createPlanetLua(8, uranoTextura, 1500,97.77, {
  innerRadius: 12,
  outerRadius: 15,
  texture: anelUranoTextura
});

const netuno = createPlanetLua(7.5, netunoTextura,1800,28.32);
const pluto = createPlanetLua(2, plutoTextura,2100,119.61);


const luaT = createPlanetLua(2.5, luaTextura,200,6.68);

const europa = createPlanetLua(2.3, europaTextura, 700,0.1 );
const calisto = createPlanetLua(3.7, calistoTextura , 700,0.192 );
const ganymede = createPlanetLua(4.1, ganymedeTextura, 700, 0.195 );
const iO = createPlanetLua(2.8, iOTextura, 700, 0.04 );

const dione = createPlanetLua(1, dioneTextura, 1200, 0.028);
const japeto = createPlanetLua(1.1, japetoTextura, 1200,0.2);
const rhea = createPlanetLua(1.2, rheaTextura,1200,0.345);
const tita = createPlanetLua(4, titaTextura, 1200,0.3);


const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);



const pointLight = new THREE.PointLight(0xFFFFFF, 3, 2500000, 0.0000001);

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
    size: 1 , 
  
  });
  let linha = new THREE.Points(linhaGeo, linhaMat);
  scene.add(linha);
  return { traco, linhaGeo, linha };
}


function luasLinha(objetoPai) {
  let traco = [];
  let linhaGeo = new THREE.BufferGeometry().setFromPoints(traco);
  let linhaMat = new THREE.PointsMaterial({
    color: corAleatoria(),
    size: 0.1,
  });
  let linha = new THREE.Points(linhaGeo, linhaMat);
  objetoPai.add(linha);
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
const linhaEur = luasLinha(jupiter);
const linhaCal = luasLinha(jupiter);
const linhaGan = luasLinha(jupiter);
const linhaiO = luasLinha(jupiter);
const linhaDio = luasLinha(saturno);
const linhaJap = luasLinha(saturno);
const linhaTit = luasLinha(saturno);
const linhaRhe = luasLinha(saturno);
const linhaLua = luasLinha(terra);



const linhasW = [linhaMer, linhaVen, linhaTer, linhaMar, linhaJup, linhaSat, linhaUr, linhaNet, linhaPlu];
const planetasW = [mercurio, venus, terra, marte, jupiter, saturno, uranus, netuno, pluto];
const linhasL = [linhaLua,linhaEur,linhaCal,linhaGan,linhaiO,linhaDio,linhaJap,linhaTit,linhaRhe ];
const luasL = [luaT, europa,calisto, ganymede, iO,dione, japeto, tita, rhea ];



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
  venus:{ objeto: venus, velTrans: 1.6, velRot: 0.004, raioOrbita: 200, excentricidade: 0.007 },
  terra:{ objeto: terra, velTrans: 1,velRot: 9.9, raioOrbita: 300, excentricidade: 0.017 },
 // nuvens:{ objeto: nuvens, velTrans: 1, velRot: 9.9,raioOrbita: 300, excentricidade: 0.017 },
  marte:{ objeto: marte, velTrans: 1 / 1.87, velRot: 1.03, raioOrbita: 450, excentricidade: 0.0934 },
  jupiter: { objeto: jupiter, velTrans: 1 / 11.9, velRot: 2.4,raioOrbita: 700, excentricidade: 0.049 },
  saturno:{ objeto: saturno, velTrans: 1 / 29.41, velRot: 2.2,raioOrbita: 1200, excentricidade: 0.0565 },
  uranus:{ objeto: uranus, velTrans: 1 / 83.3,velRot: 1.38, raioOrbita: 1500, excentricidade: 0.046 },
  netuno:{ objeto: netuno, velTrans: 1 / 166.6, velRot: 1.49, raioOrbita: 1800, excentricidade: 0.0934 },
  pluto:{ objeto: pluto, velTrans: 1 / 250, velRot: 0.156, raioOrbita: 2100, excentricidade: 0.01 },
  luaT:{ objeto: luaT, velTrans: 13, velRot: 4,raioOrbita: 40 , excentricidade: 0.0549,raioCamera:44, objetoPai:terra},
  europa: { objeto: europa, velTrans: 1.76, velRot: 4, raioOrbita: 35.94 , excentricidade: 0.0094, raioCamera:39, objetoPai: jupiter},
  calisto:{ objeto: calisto, velTrans: 1/4.7, velRot: 4, raioOrbita: 81 ,  excentricidade: 0,raioCamera:87, objetoPai: jupiter},
  ganymede: { objeto: ganymede, velTrans: 1/2, velRot: 4, raioOrbita: 50.8 , excentricidade: 0.0013,raioCamera:56, objetoPai: jupiter},
  iO:{ objeto: iO, velTrans: 1, velRot: 4, raioOrbita: 26.66 , excentricidade: 0,raioCamera:32, objetoPai: jupiter},
  dione: { objeto: dione, velTrans: 0.31, velRot: 4, raioOrbita: 25 , excentricidade: 0.022,raioCamera:26.3, objetoPai: saturno},
  japeto: { objeto: japeto, velTrans: 11.39, velRot: 4, raioOrbita: 206 , excentricidade: 0.0281,raioCamera:208, objetoPai: saturno},
  tita:{ objeto: tita, velTrans: 0.05, velRot: 4, raioOrbita: 69.4 , excentricidade: 0,raioCamera:74.5, objetoPai: saturno},
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
    const x = Math.cos(-tempo * velTrans) * (raioCamera) * tamanho*0.2 ;
    const z = Math.sin(-tempo * velTrans) * (raioCamera) * tamanho*0.2 *Math.sqrt(1 - Math.pow(excentricidade, 2));


    camera.position.set(x, 0, z);
    }
}

function animate() {
//ROTACAO e TRANSLAÇÃO

 tempo += velocidadeTr/5;

  for (const astro in astros) {
    if (astros.hasOwnProperty(astro)) {
      const { objeto, velTrans, velRot, raioOrbita, excentricidade,raioCamera, objetoPai, inclinacao} = astros[astro];
      
      if (raioCamera === undefined) {
        const x = Math.cos(tempo * velTrans) * raioOrbita*tamanho*0.2;
        const z = Math.sin(tempo * velTrans) * raioOrbita * Math.sqrt(1 - Math.pow(excentricidade, 2))*tamanho*0.2;
        objeto.position.set(x, 0, z);
       
      }
      else if (raioCamera !== undefined) {
        const x = Math.cos(-tempo * velTrans) * raioOrbita*tamanho*0.2;
        const z = Math.sin(-tempo * velTrans) * raioOrbita * tamanho*0.2*Math.sqrt(1 - Math.pow(excentricidade, 2));
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
for (let i = 0; i < linhasL.length; i++) {
  atualizarRastro(linhasL[i], luasL[i]);
}

}else if(ocultarTrajetoria.checked){
  for (let i = 0; i < linhasW.length; i++) {
    ocultarRastro(linhasW[i], planetasW[i],trajetoria.checked);
  } 
  
  for (let i = 0; i < linhasL.length; i++) {
    ocultarRastro(linhasL[i], luasL[i],trajetoria.checked );
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










