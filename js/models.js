// Rocket
var rocket;
function addRocket(){

    var loader = new THREE.GLTFLoader();
    loader.load('./assets/models/falcon.glb', handle_load);

    function handle_load(gltf) {

        rocket = gltf.scene.children[0];
        rocket.material.flatShading = true;
        rocket.castShadow = true;
        rocket.receiveShadow = true;
        rocket.scale.set(2, 2, 2);
        rocket.position.y = 36;
        scene.add(rocket);

    }

}
// Platform
function addPlatform() {

    var geometry = new THREE.CylinderGeometry( 20, 40, 10 );
    var material = new THREE.MeshPhongMaterial({ color: 0x666666 });
    var plafrom = new THREE.Mesh(geometry, material);

    plafrom.material.flatShading = true;
    plafrom.receiveShadow = true;
    plafrom.castShadow = true;

    scene.add(plafrom);

};
// Sun
function addSun() {

    var geometry = new THREE.SphereGeometry(6, 6, 6);
    var material = new THREE.MeshPhongMaterial({ color: 0xf9d71c });
    var sun = new THREE.Mesh(geometry, material);

    sun.position.set(100, 300, 200);
    sun.material.flatShading = true;

    scene.add(sun);

};

// Graund
function addPlate() {

    var grasstexture = new THREE.TextureLoader().load("./assets/textures/grass.jpg");
    var geometry = new THREE.BoxGeometry(100, 1, 100);
    var material = new THREE.MeshPhongMaterial({ map: grasstexture });
    var plate = new THREE.Mesh(geometry, material);

    plate.receiveShadow = true;

    scene.add(plate);

};