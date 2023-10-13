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

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 6000000);
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



//const nuvens = createPlanetLua(1.001, nuvensTextura, 46921);
const mercurio = createPlanetLua(0.383,mercurioTextura,  18226,0.034);
const venus = createPlanetLua(0.95, venusTextura, 33945,177.4);

const terra = createPlanetLua(1, terraTextura, 46921,23.44);
const luaT = createPlanetLua(0.273, luaTextura, 46921,6.68);

const marte = createPlanetLua(0.532, marteTextura, 71455,25.19);
const jupiter = createPlanetLua(11.2, jupiterTextura, 244235,3.12 );

const saturno = createPlanetLua(9.45, saturnoTextura, 445398,26.73, {
    innerRadius: 12.88,
    outerRadius: 21,
    texture: anelSaturnoTextura
});
const uranus = createPlanetLua(3.98, uranoTextura, 899097,97.77, {
  innerRadius: 5.96,
  outerRadius: 7.29,
  texture: anelUranoTextura
});


const netuno = createPlanetLua(3.85, netunoTextura, 1412490,28.32 );
const pluto = createPlanetLua(0.19, plutoTextura, 1848981,119.61);

const europa = createPlanetLua(0.245, europaTextura, 244235,0.1 );
const calisto = createPlanetLua(0.378, calistoTextura , 244235,0.192 );
const ganymede = createPlanetLua(0.413, ganymedeTextura, 244235, 0.195 );
const iO = createPlanetLua(0.286, iOTextura, 244235, 0.04 );


const dione = createPlanetLua(0.088, dioneTextura, 445398, 0.028);
const japeto = createPlanetLua(0.115, japetoTextura, 445398,0.2);
const rhea = createPlanetLua(0.12, rheaTextura,445398,0.345);
const tita = createPlanetLua(0.406, titaTextura, 445398,0.3);

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
  sol: { objeto: sol, velTrans: 0, velRot: 0.03, raioOrbita: 0, excentricidade: 0},
  mercurio: { objeto: mercurio, velTrans: 4, velRot: 0.017, raioOrbita:  18226, excentricidade: 0.2  },
  venus:{ objeto: venus, velTrans: 1.6, velRot: 4, raioOrbita: 33945, excentricidade: 0.007  },
  terra:{ objeto: terra, velTrans: 1,velRot: 9.9, raioOrbita: 46921, excentricidade: 0.017  },
  //nuvens:{ objeto: nuvens, velTrans: 1, velRot: 9.9,raioOrbita: 46921, excentricidade: 0.017 },
  marte:{ objeto: marte, velTrans: 1 / 1.87, velRot: 1.03, raioOrbita: 71455, excentricidade: 0.0934  },
  jupiter: { objeto: jupiter, velTrans: 1 / 11.9, velRot: 2.4,raioOrbita: 244235, excentricidade: 0.049  },
  saturno:{ objeto: saturno, velTrans: 1 / 29.41, velRot: 2.2,raioOrbita: 445398, excentricidade: 0.0565  },
  uranus:{ objeto: uranus, velTrans: 1 / 83.3,velRot: 1.38, raioOrbita: 899097, excentricidade: 0.046  },
  netuno:{ objeto: netuno, velTrans: 1 / 166.6, velRot: 1.49, raioOrbita: 1412490, excentricidade: 0.0934 },
  pluto:{ objeto: pluto, velTrans: 1 / 250, velRot: 0.156, raioOrbita: 1848981, excentricidade: 0.01  },
  luaT:{ objeto: luaT, velTrans: 13, velRot: 4,raioOrbita: 60.335 , excentricidade: 0.0549,raioCamera:61.2, objetoPai:terra},
  europa: { objeto: europa, velTrans: 1.76, velRot: 4, raioOrbita:  105.4 , excentricidade: 0.0094, raioCamera:106.2, objetoPai: jupiter},
  calisto:{ objeto: calisto, velTrans: 1/4.7, velRot: 4, raioOrbita: 295.95 ,  excentricidade: 0,raioCamera:297.2, objetoPai: jupiter},
  ganymede: { objeto: ganymede, velTrans: 1/2, velRot: 4, raioOrbita: 168.48 , excentricidade: 0.0013,raioCamera:169.7, objetoPai: jupiter},
  iO:{ objeto: iO, velTrans: 1, velRot: 4, raioOrbita: 66.23  , excentricidade: 0,raioCamera:67.2, objetoPai: jupiter},
  dione: { objeto: dione, velTrans: 0.31, velRot: 4, raioOrbita: 59.31 , excentricidade: 0.022,raioCamera:59.8, objetoPai: saturno},
  japeto: { objeto: japeto, velTrans: 11.39, velRot: 4, raioOrbita: 559.43 , excentricidade: 0.0281,raioCamera:559.9, objetoPai: saturno},
  tita:{ objeto: tita, velTrans: 0.05, velRot: 4, raioOrbita: 192.05 , excentricidade: 0,raioCamera:193, objetoPai: saturno},
  rhea:{ objeto: rhea, velTrans: 0.85, velRot: 4, raioOrbita: 82.86 ,  excentricidade: 0.0013, raioCamera:83.4, objetoPai: saturno},
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
    const x = Math.cos(-tempo * velTrans) * (raioCamera)  ;
    const z = Math.sin(-tempo * velTrans) * (raioCamera) *Math.sqrt(1 - Math.pow(excentricidade, 2));


    camera.position.set(x, 0, z);
    }
}

function animate() {
//ROTACAO e TRANSLAÇÃO

 tempo += velocidadeTr;

  for (const astro in astros) {
    if (astros.hasOwnProperty(astro)) {
      const { objeto, velTrans, velRot, raioOrbita, excentricidade,raioCamera, objetoPai, inclinacao} = astros[astro];
      
      if (raioCamera === undefined) {
        const x = Math.cos(tempo * velTrans) * raioOrbita;
        const z = Math.sin(tempo * velTrans) * raioOrbita * Math.sqrt(1 - Math.pow(excentricidade, 2));
        objeto.position.set(x, 0, z);
       
      }
      else if (raioCamera !== undefined) {
        const x = Math.cos(-tempo * velTrans) * raioOrbita;
        const z = Math.sin(-tempo * velTrans) * raioOrbita*Math.sqrt(1 - Math.pow(excentricidade, 2));
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










