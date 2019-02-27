var scene = new THREE.Scene();

// Camera

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var camera_pivot = new THREE.Object3D()
var Y_AXIS = new THREE.Vector3( 0, 1, 0 );
scene.add( camera_pivot );
camera_pivot.add( camera );
camera.position.set( 0, 43, 140 );

// Render

var renderer = new THREE.WebGLRenderer( { canvas: document.getElementById('canv'), alpha: true, antialias: true } );
renderer.autoClear = false;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x345233 );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

// Light

hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.8 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 50, 0 );
scene.add( hemiLight );

var light = new THREE.PointLight( 0xffffff, 0.8, 10000 );
light.position.set( 100, 300, 200 );
light.rotation.set( 0,0,0 )
light.castShadow = true;
light.shadow.mapSize.width = 4096;
light.shadow.mapSize.height = 4096;
light.shadow.camera.near = 1;
light.shadow.camera.far = 1000;
light.radius = 1000;
scene.add( light );

// Models

addSun();
addPlatform();
addEarth();
addRocket();
for (i = 1; i <= 8; i++) {
    addClouds(i);
}

// Variables

var acceleration = 0.2,
    speed = 0,
    highspeed = 0,
    maxspeed = 8500,
    altitude = 0,
    bestalti = 0,
    maxalti = 70,
    score = 0,
    bestscore = 0,
    skychange,
    coursor,
    cpos,
    good,
    perfect,
    tooslow,
    launch = false,
    play = false,
    info = false,
    settings = false,
    gameOverCheck = false;

// Interface

setTimeout( function() { setDisplay("intro", "none") }, 6800 );

document.getElementById( "play" ).addEventListener( "click", function() {

    document.body.style.transitionProperty = "none";
    document.body.style.background = "#88adf6";
    skychange = setTimeout(function () {

        document.body.style.background = "#020c27";
        document.body.style.transition = "background 50s linear";

    }, Math.pow(10, 5));

    setDisplay("menu", "none");
    setDisplay("logo", "none");
    setDisplay("gameoverbox", "none");
    setDisplay("infobox", "none");
    setDisplay("settingsbox", "none");
    setDisplay("gamebuttons", "flex");
    setDisplay("scorediv", "block");
    play = true;
    if( gameOverCheck == true ){

        camera.position.set( 0, 43, 140 );
        rocket.position.y = 36;
        scene.add( rocket );
        gameOverCheck = false;

    }

} );

document.getElementById( "info" ).addEventListener( "click", function() {

    if( info == false ){

        setDisplay("infobox", "block");
        setDisplay("settingsbox", "none");
        setDisplay("gameoverbox", "none");
        info = true;
        settings = false;

    } else {

        setDisplay("infobox", "none");
        info = false;

    }

} );

document.getElementById( "settings" ).addEventListener( "click", function () {

    if ( settings == false ) {

        setDisplay("settingsbox", "block");
        setDisplay("infobox", "none");
        setDisplay("gameoverbox", "none");
        settings = true;
        info = false;

    } else {

        setDisplay("settingsbox", "none");
        settings = false;

    }

} );

document.getElementById( "clicker" ).addEventListener( "mousedown", function () {

    coursor = document.getElementById( "coursor" );
    cpos = coursor.offsetLeft + coursor.offsetWidth;
    good = document.getElementById( "good" ).offsetLeft;
    perfect = document.getElementById( "perfect" ).offsetLeft;
    tooslow = document.getElementById( "tooslow" ).offsetLeft;
    if( ( cpos >= good ) & ( cpos < perfect ) ) {

        addPoint(1);

    } else if( ( cpos >= perfect ) & ( cpos < tooslow ) ) {

        addPoint(2);

    } else if( cpos >= tooslow ) {

        gameOver(2);

    } else {

        gameOver(1);

    }

} );

function addPoint( type ) {

    if( type == 2 ){

        typeDisplay("green", "Perfect!");

    } else {

        typeDisplay("white", "Good");

    }
    score += Math.floor((Math.random() * 20) + 1) * type;
    document.getElementById( "score" ).innerHTML = score;
    coursor = document.getElementById( "coursor" );
    newone = coursor.cloneNode( true );
    coursor.parentNode.replaceChild( newone, coursor );
    launch = true;
    if( altitude == 0 ) {

        altitudeRefresh();
        speedRefresh();

    }

}

function gameOver( type ) {

    if( type == 2 ) {
        typeDisplay("#5d0b12", "Too slow!");
    } else {
        typeDisplay("#5d0b12", "Too fast!");
    }
    clearTimeout(skychange);
    setDisplay("gamebuttons", "none");
    scene.remove(rocket);
    launch = false;
    gameOverCheck = true;
    innerHtmlUpdate( "showscore", score );
    if( score > bestscore ) {
        bestscore = score;
    }
    innerHtmlUpdate( "showbestscore", bestscore );
    innerHtmlUpdate( "showalti", altitude + " km" );
    if( altitude > bestalti ) {
        bestalti = altitude;
    }
    innerHtmlUpdate( "showbestalti", bestalti + " km");
    innerHtmlUpdate( "showspeed", speed + " km/h" );
    if( speed > highspeed ) {
        highspeed = speed;
    }
    innerHtmlUpdate( "showhighspeed", highspeed + " km/h")
    setTimeout(function () {
        setDisplay("gameoverbox", "block");
        setDisplay("menu", "block");
        setDisplay("logo", "block");
        setDisplay("scorediv", "none");
        document.getElementById("score").innerHTML = "0";
        altivalueRefresh(0);
        speedvalueRefresh(0);
        score = 0;
        speed = 0;
        altitude = 0;
    }, 2000);

}

var frame = 1;

// Animate
function animate() {

    requestAnimationFrame( animate );

    frame++;

    if( frame > 3 ) {

        for( i=1; i<=8; i++) {

            cloud[i].position.x += 0.2;

            if( cloud[i].position.x >= 340) {
                cloud[i].position.x = -340;
            }

        }

    }

    if( play == true ){

        if ( camera.position.z > 120 ) {

            camera.position.z -= 1;
            cloud[1].position.x += 1;

        }
        if( gameOverCheck == false ) {

            coursor = document.getElementById( "coursor" );
            cpos = coursor.offsetLeft + coursor.offsetWidth;
            eventBar = document.getElementById( "eventbar" );
            endBar = eventBar.offsetWidth;
            if ( cpos >= endBar ) {

                gameOver(2);

            }

        }

        if( launch === true ) {

            rocket.position.y += 0.1;
            camera.position.y += 0.1;

        }

    }

    renderer.render( scene, camera );

}
animate();

function altitudeRefresh() {

    if( launch == true ) {

        altitude = Math.round( ( altitude + 0.1 ) * 10 ) / 10;
        altivalueRefresh( altitude );
        setTimeout(altitudeRefresh, 500);

    }

}

function altivalueRefresh( altitude ) {

    document.getElementById( "altitudevalue" ).innerHTML = altitude;
    document.getElementById( "altitudepointer" ).style.width = ( altitude / 70 * 100 ) + "%";

}

function speedRefresh() {

    speed = Math.round( ( speed * acceleration ) * 10 ) / 10;
    speedvalueRefresh( speed );
    setTimeout(speedRefresh, 500);

}

function speedvalueRefresh( speed ) {

    document.getElementById( "speedvalue" ).innerHTML = speed;
    document.getElementById( "speedpointer" ).style.width = ( speed / 8500 * 100 ) + "%";

}

window.addEventListener( "resize", function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );

}, false);

/* View in fullscreen */
var urlParams = new URLSearchParams( window.location.search );
var pwaCheck = urlParams.get( 'utm_source' );
if ( pwaCheck != "homescreen" ) {

    var fullscreen = false;
    function fullscreenSwitch() {
        if (fullscreen == false) {
            openFullscreen();
            fullscreen = true;
        } else {
            closeFullscreen();
            fullscreen = false;
        }
    }

    var elem = document.documentElement;
    function openFullscreen() {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }

    /* Close fullscreen */
    function closeFullscreen() {
        fullscreen = false;
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }

} else {

    setDisplay("fullscreen", "none");

}

function setDisplay( id, display ) {

    document.getElementById( id ).style.display = display;

}

function innerHtmlUpdate( id, value ) {
    document.getElementById( id ).innerHTML = value;
}

function typeDisplay( color, text ) {

    var typedoc = document.getElementById( "type" );
    typedoc.style.display = "block";
    typedoc.style.color = color;
    typedoc.innerHTML = text;
    setTimeout(function () { typedoc.style.display = "none" }, 2000);

}