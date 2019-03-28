// Rocket
var rocket;
function addRocket(){

    var loader = new THREE.GLTFLoader();
    loader.load( './assets/models/falcon.glb', handle_load );

    function handle_load( gltf ) {

        rocket = gltf.scene.children[0];
        rocket.castShadow = true;
        rocket.receiveShadow = true;
        rocket.scale.set( 7.7, 7.7, 7.7 );
        rocket.position.y = 109.5;
        scene.add( rocket );

    }

};

// Clouds
var cloud = new Array();

function addClouds(i) {

    var loader = new THREE.GLTFLoader();
    loader.load('./assets/models/clouds/Cloud_' + i + '.glb', handle_load);

    function handle_load(gltf) {

        cloud[i] = gltf.scene.children[0];
        cloud[i].castShadow = true;
        cloud[i].scale.set( 7, 7, 7 );
        cloud[i].rotation.y = THREE.Math.degToRad(90);
        cloud[i].position.set( Math.floor( ( Math.random() * 600 ) + -300 ), 100, Math.floor( ( Math.random() * -60 ) - 30 ) );
        scene.add(cloud[i]);

    }

}

// Tripod
var tripod;
function addTripod() {

    var loader = new THREE.GLTFLoader();
    loader.load( './assets/models/tripod.glb', handle_load );

    function handle_load( gltf ) {

        tripod = gltf.scene.children[0];
        tripod.material = new THREE.MeshPhongMaterial( { color: 0xdddddd } );
        tripod.material.flatShading = true;
        tripod.castShadow = true;
        tripod.receiveShadow = true;
        tripod.scale.set( 8, 4, 2.5 );
        tripod.position.set( 6, 5, 0 );
        tripod.rotation.set( 0, THREE.Math.degToRad(90), 0 );
        scene.add( tripod );

    }

};

// Platform
function addPlatform() {

    var geometry = new THREE.CylinderGeometry( 20, 35, 10 );
    var material = new THREE.MeshPhongMaterial( { color: 0x666666 } );
    var plafrom = new THREE.Mesh( geometry, material );

    plafrom.material.flatShading = true;
    plafrom.receiveShadow = true;
    plafrom.castShadow = true;

    scene.add( plafrom );

};

// Graund
function addEarth() {

    var geometry = new THREE.SphereGeometry(300, 50, 20);
    var material = new THREE.MeshPhongMaterial( { color: 0x70b430 } );
    var earth = new THREE.Mesh( geometry, material );

    earth.material.flatShading = true;
    earth.position.set( 0, -295, -20 );
    earth.rotation.z = THREE.Math.degToRad(-90);
    scene.add( earth );

};