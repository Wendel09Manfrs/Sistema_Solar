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


const scene = new THREE.Scene();


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 1000000);
camera.position.set(150,150,-600);

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
let tamanho =10;
const geometriaSol = new THREE.SphereGeometry(109.29/3, 32, 32); // 109 é a proporcao mais proxima da realidade, porém foi diminuido para melhor visualizacao
const materialSol = new THREE.MeshBasicMaterial({
    map:  textureLoader.load(solTextura),
    side: THREE.DoubleSide
});
const sol = new THREE.Mesh(geometriaSol, materialSol);
sol.position.set(0, 0, 0);
scene.add(sol);

function createPlanet(size, texture, position, ring) {
  const textureLoader = new THREE.TextureLoader();
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshBasicMaterial({
    map:  textureLoader.load(texture), 
    transparent: true,
    side: THREE.DoubleSide
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

/*

const nuvens = createPlanet(tamanho*1.01, nuvensTextura, tamanho*23481.4);
const mercurio = createPlanet(tamanho*0.383,mercurioTextura, tamanho*9088);
const venus = createPlanet(tamanho*0.95, venusTextura, tamanho*16983.2);
const terra = createPlanet(tamanho, terraTextura, tamanho*23481.4);
const lua = createPlanet(tamanho*0.273, luaTextura, tamanho*23481.4);
const marte = createPlanet(tamanho*0.532, marteTextura, tamanho*35771.46);
const jupiter = createPlanet(tamanho*11.2, jupiterTextura, tamanho*122162.92);

const saturno = createPlanet(tamanho*9.45, saturnoTextura, tamanho*224454.56, {
    innerRadius: tamanho*12.88,
    outerRadius: tamanho*18,
    texture: anelSaturnoTextura
});
const uranus = createPlanet(tamanho*3.98, uranoTextura, tamanho*450478.731, {
  innerRadius: tamanho*5.96,
  outerRadius: tamanho*7.69,
  texture: anelUranoTextura
});


const netuno = createPlanet(tamanho*3.85, netunoTextura, tamanho*704755);
const pluto = createPlanet(tamanho*0.19, plutoTextura, tamanho*927640.87);

const europa = createPlanet(tamanho*0.245, europaTextura, tamanho*122162.92);
const calisto = createPlanet(tamanho*0.378, calistoTextura , tamanho*122162.92);
const ganymede = createPlanet(tamanho*0.413, ganymedeTextura, tamanho*122162.92);
const iO = createPlanet(tamanho*0.286, iOTextura, tamanho*122162.92);


const dione = createPlanet(tamanho*0.088, dioneTextura, tamanho*224454.56);
const japeto = createPlanet(tamanho*0.115, japetoTextura, tamanho*224454.56);
const rhea = createPlanet(tamanho*0.12, rheaTextura,tamanho*224454.56);
const tita = createPlanet(tamanho*0.406, titaTextura, tamanho*224454.56);


*/

const mercurio = createPlanet(tamanho*0.383,mercurioTextura,100);
const venus = createPlanet(tamanho*0.95, venusTextura,200);
const terra = createPlanet(tamanho, terraTextura,300);
const nuvens = createPlanet(tamanho*1.01, nuvensTextura,300);
const marte = createPlanet(tamanho*0.532, marteTextura,450);
const jupiter = createPlanet((tamanho/5)*10.97, jupiterTextura, 700);
const saturno = createPlanet((tamanho/5)*10, saturnoTextura, 1200, {
  innerRadius: (tamanho/5)*12.88,
  outerRadius: (tamanho/5)*21.92,
  texture: anelSaturnoTextura
});
const uranus = createPlanet((tamanho/5)*3.98, uranoTextura, 1500, {
  innerRadius: (tamanho/5)*5.96,
  outerRadius: (tamanho/5)*7.69,
  texture: anelUranoTextura
});

const netuno = createPlanet((tamanho/5)*3.85, netunoTextura,1800);
const pluto = createPlanet(tamanho*0.19, plutoTextura,2100);


const lua = createPlanet(tamanho*0.273, luaTextura,200);

const europa = createPlanet(tamanho*0.245, europaTextura, 700);
const calisto = createPlanet(tamanho*0.378, calistoTextura , 700);
const ganymede = createPlanet(tamanho*0.413, ganymedeTextura, 700);
const iO = createPlanet(tamanho*0.286, iOTextura, 700);



const dione = createPlanet(tamanho*0.088, dioneTextura, 1200);
const japeto = createPlanet(tamanho*0.115, japetoTextura, 1200);
const rhea = createPlanet(tamanho*0.12, rheaTextura,1200);
const tita = createPlanet(tamanho*0.406, titaTextura, 1200);







terra.add(lua);
jupiter.add(europa);
jupiter.add(calisto);
jupiter.add(ganymede);
jupiter.add(iO);


saturno.add(dione);
saturno.add(japeto);
saturno.add(rhea);
saturno.add(tita);






const pointLight = new THREE.PointLight(0xFFFFFF, 5, 50000);
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




/*




  mercurio.position.set(Math.cos(tempo*4) * tamanho*9088, 0, Math.sin(tempo*4) *tamanho*9088);
  venus.position.set(Math.cos(tempo*1.6) * tamanho*16983.2, 0, Math.sin(tempo*1.6) * tamanho*16983.2);
  terra.position.set(Math.cos(tempo) * tamanho*23481.4, 0, Math.sin(tempo) *tamanho*23481.4);
  nuvens.position.set(Math.cos(tempo) * tamanho*23481.4, 0, Math.sin(tempo) * tamanho*23481.4);
  marte.position.set(Math.cos(tempo/1.87) *tamanho*35771.46, 0, Math.sin(tempo/1.87) *tamanho*35771.46);
  
   jupiter.position.set(Math.cos(tempo/11.9) * tamanho*122162.92, 0, Math.sin(tempo/11.9) *tamanho*122162.92);
  saturno.position.set(Math.cos(tempo/29.41) *tamanho*224454.56, 0, Math.sin(tempo/29.41) *tamanho*224454.56);

  uranus.position.set(Math.cos(tempo/83.3) *tamanho*450478.731, 0, Math.sin(tempo/83.3) *tamanho*450478.731 );
  netuno.position.set(Math.cos(tempo/166.6) *tamanho*704755, 0, Math.sin(tempo/166.6) *tamanho*704755 );
  pluto.position.set(Math.cos(tempo/250) *tamanho*927640.87, 0, Math.sin(tempo/250) *tamanho*927640.87 );

 


  //LUAS DOS PLANETAS TERRA E JÚPITER
//translada a terra na mesma rotação da terra
  lua.position.set(Math.cos(-tempo*13.5) * tamanho*7, 0, Math.sin(-tempo*13.5) * tamanho*7);

  //transladam no sentido de translação de rotação de jupiter
  europa.position.set(Math.cos(-tempo*1.76) * tamanho*35.94, 0, Math.sin(-tempo*1.76) *tamanho*35.94 );
  calisto.position.set(Math.cos(-tempo/4.7) * tamanho*81, 0, Math.sin(-tempo/4.7) * tamanho*81);
  ganymede.position.set(Math.cos(-tempo/2) *tamanho*50.8 , 0, Math.sin(-tempo/2) *tamanho* 50.8);
  iO.position.set(Math.cos(-tempo) * tamanho*26.66, 0, Math.sin(-tempo) *tamanho* 26.66);

  dione.position.set(Math.cos(-tempo* 37.8)*tamanho* 25 , 0, Math.sin(-tempo* 37.8) *tamanho* 25);
  japeto.position.set(Math.cos(-tempo*1.31) *tamanho* 206, 0, Math.sin(-tempo*1.31) *tamanho*206);
  tita.position.set(Math.cos(-tempo*6.5) *tamanho* 69.4, 0, Math.sin(-tempo*6.5) *tamanho*69.4);
  rhea.position.set(Math.cos(-tempo*23) *tamanho* 30.46, 0, Math.sin(-tempo*23) *tamanho*30.46);

 */

 







mercurio.position.set(Math.cos(tempo*4) * 100, 0, Math.sin(tempo*4) *100);
venus.position.set(Math.cos(tempo*1.6) * 200, 0, Math.sin(tempo*1.6) * 200);
terra.position.set(Math.cos(tempo) * 300, 0, Math.sin(tempo) *300);
nuvens.position.set(Math.cos(tempo) * 300, 0, Math.sin(tempo) * 300);
marte.position.set(Math.cos(tempo/1.87) *450, 0, Math.sin(tempo/1.87) *450);
jupiter.position.set(Math.cos(tempo/11.9) * 700, 0, Math.sin(tempo/11.9) *700);

saturno.position.set(Math.cos(tempo/29.41) *1200, 0, Math.sin(tempo/29.41) *1200);
uranus.position.set(Math.cos(tempo/83.3) *1500, 0, Math.sin(tempo/83.3) *1500 );
netuno.position.set(Math.cos(tempo/166.6) *1800, 0, Math.sin(tempo/166.6) *1800 );
pluto.position.set(Math.cos(tempo/250) *2100, 0, Math.sin(tempo/250) *2100 );


//LUAS DOS PLANETAS TERRA E JÚPITER
//translada a terra na mesma rotação da terra
lua.position.set(Math.cos(-tempo*13.5) * 30, 0, Math.sin(-tempo*13.5) * 30);

//transladam no sentido de translação de rotação de jupiter
europa.position.set(Math.cos(-tempo*1.76) * (tamanho/5)*35.94, 0, Math.sin(-tempo*1.76) *(tamanho/5)*35.94 );
calisto.position.set(Math.cos(-tempo/4.7) * (tamanho/5)*81, 0, Math.sin(-tempo/4.7) * (tamanho/5)*81);
ganymede.position.set(Math.cos(-tempo/2) *(tamanho/5)*50.8 , 0, Math.sin(-tempo/2) *(tamanho/5)* 50.8);
iO.position.set(Math.cos(-tempo) * (tamanho/5)*26.66, 0, Math.sin(-tempo) *(tamanho/5)* 26.66);

dione.position.set(Math.cos(-tempo* 37.8)*(tamanho/5)* 25 , 0, Math.sin(-tempo* 37.8) *(tamanho/5)* 25);
japeto.position.set(Math.cos(-tempo*1.31) *(tamanho/5)* 206, 0, Math.sin(-tempo*1.31) *(tamanho/5)*206);
tita.position.set(Math.cos(-tempo*6.5) *(tamanho/5)* 69.4, 0, Math.sin(-tempo*6.5) *(tamanho/5)*69.4);
rhea.position.set(Math.cos(-tempo*23) *(tamanho/5)* 30.46, 0, Math.sin(-tempo*23) *(tamanho/5)*30.46);

  switch (astro) {
    case "sol":
      if (camera.parent) {
          camera.parent.remove(camera);
      }
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
camera.updateProjectionMatrix();
renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight)

})










