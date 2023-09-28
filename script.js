// inspirado em https://smallworld.metronomy.co.uk/
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    30, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000);

// Reposicionamento da câmera em Z
camera.position.set(0, 0, 4)

// Inicializa o renderer
const renderer = new THREE.WebGLRenderer({
alpha: true, //assume transparência
antialias: true
})

// Configura dimensão do renderer
renderer.setSize(window.innerWidth, window.innerHeight)

// Anexa renderer ao body do front
document.body.appendChild(renderer.domElement)

// Inicializa controles de órbita
// recomendo usar com mjs e npm, seguindo:
// https://threejs.org/docs/index.html#manual/en/introduction/Installation

//const controls = new OrbitControls(camera, renderer.domElement)


// Terra
// ----------

const textureLoader = new THREE.TextureLoader();
const texturaTerra = textureLoader.load("https://assets.codepen.io/141041/small-world.jpg");

// Inicializa geometria da Terra
const geometriaTerra = new THREE.SphereGeometry(1, 32, 32);

// Inicializa material da Terra
const materialTerra = new THREE.MeshBasicMaterial({
map: texturaTerra
})

// Inicializa objeto Terra
const terra = new THREE.Mesh(geometriaTerra, materialTerra)

// Adiciona Terra na cena
scene.add(terra)

// Nuvens
// ----------

// Carrega textura das nuvens
const texturaNuvens = new THREE.TextureLoader().load("https://assets.codepen.io/141041/small-world-clouds.png")


// Inicializa geometria de nuvens
const geometriaNuvens = new THREE.SphereGeometry(1.05, 40, 40) // recomenda dimensão um pouco maior que a da Terra

// Inicializa material de nuvens
const materialNuvens = new THREE.MeshBasicMaterial({
map: texturaNuvens,
transparent: true //torna fundo transparente
})

// Inicializa nuvens
const nuvens = new THREE.Mesh(geometriaNuvens, materialNuvens)

// Adiciona nuvens na cena
scene.add(nuvens)

// Animação
// ----------      

// Prepara loop de animação
function animate() {

// Requisita quadros de animação
requestAnimationFrame(animate)

// Rotaciona Terra
terra.rotation.y += 0.0005

// Rotaciona nuvens
nuvens.rotation.y -= 0.001

// Renderiza cena
renderer.render(scene, camera)
}

// chamada da função animate
animate()

// Redimensiona janela
// ----------

// Listener para redimensionamento da janela
window.addEventListener('resize', () => {
// Atualiza proporção (aspect) da câmera
camera.aspect = window.innerWidth / window.innerHeight

// Atualiza matriz de projeção da câmera
camera.updateProjectionMatrix()

// Redimensiona o renderer
renderer.setSize(window.innerWidth, window.innerHeight)

})