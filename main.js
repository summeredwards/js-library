import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	75, 
	window.innerWidth / window.innerHeight, 
	0.1, 
	1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 3;

// planet
const geometry = new THREE.SphereGeometry(0.5, 50, 50);
const material = new THREE.MeshStandardMaterial({
	color: 0xED7117,
	flatShading: true, 
	metalness: 0, 
	roughness: 7
});
const planet = new THREE.Mesh(geometry, material);

scene.add(planet);


// stars
const galaxy = new THREE.Object3D();
const geometry3 = new THREE.OctahedronGeometry(2, 0);

const material3 = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
});

// inspo: https://codepen.io/tr13ze/pen/pbjWwg
for (let i = 0; i < 1000; i++) {
    let stars = new THREE.Mesh(geometry3, material3);
    stars.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    stars.position.multiplyScalar(100 + (Math.random() * 800));
    stars.rotation.set(Math.random(), Math.random(), Math.random());
    galaxy.add(stars);
}

galaxy.position.z = -150;

scene.add(galaxy);


// lights
const ambient = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambient);

const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(25, 50, 25);
scene.add(pointLight);


// make canvas responsive 
window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
})


// animate loop
function animate() {
	requestAnimationFrame(animate);
	planet.rotation.y -= 0.01;
	galaxy.rotation.x += 0.0010;
  	galaxy.rotation.y += 0.0030;
	renderer.render(scene, camera);
}
animate();





















