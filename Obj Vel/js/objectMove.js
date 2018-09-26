/*global THREE*/
//import THREE from 'three';

var camera, scene, renderer;
var material;
var ball;

function createBall(x,y,z) {
    'use strict';

    ball = new THREE.Object3D();
    ball.userData = { moving: {x:false,y:false,z:false}, speed: {x: 0, y: 0, z: 0}, moveKeys: {up:false, down:false, right: false, left: false}, step: 0};

    var material = new THREE.MeshBasicMaterial({color:0xff0000, wireframe: true});

                        /* SphereGeometry (radius : Float, widthSegments : Integer, heightSegments : Integer,
                        phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float) */
    var geometry = new THREE.SphereGeometry(4,10,10);
    var mesh = new THREE.Mesh(geometry,material);

    ball.add(mesh);
    ball.position.set(x,y,z);

    scene.add(ball);
}



function createCamera() {
    'use strict';
                    // PerspectiveCamera(fov, ratio, near clipping plane, far clipping plane)
    camera = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 50;
    camera.lookAt(scene.position);
}

function createScene() {
    'use strict';
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));

    createBall(0,0,0);
}


function render() {
    'use strict';
    renderer.render(scene,camera);
}

function onResize () {
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = renderer.getSize().width / renderer.getSize().height;
        camera.updateProjectionMatrix();    // fazer update da camera
    }

    //render();
}

function onKeyDown(e) {
    'use strict';

    switch(e.keyCode) {

        case 37: //left
        ball.userData.moving.x = true;
        ball.userData.moveKeys.left = true;
        
        break;
    case 39: //right
        ball.userData.moving.x = true;
        ball.userData.moveKeys.right = true;
        break;

    case 38: //up
        ball.userData.moving.z = true;
        ball.userData.moveKeys.up = true;
        break;
    case 40: //down
        ball.userData.moving.z = true;
        ball.userData.moveKeys.down = true;
        break;


    case 65: //A
    case 97: //a
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe =  !node.material.wireframe;
            }
        });
        break;


    }
    //render();
}


function onKeyPress(e) {
    'use strict';

     /* keys (ASCII)
    left = 37
    up = 38
    right = 39
    down = 40
    */

    switch(e.keyCode) {
    /*
    case 37: //left
        ball.userData.moving.x = true;
        if (ball.userData.speed.x > -0.4) {
            ball.userData.speed.x -= 0.06;
        }
        break;
    case 39: //right
        ball.userData.moving.x = true;
        if (ball.userData.speed.x < 0.4) {
            ball.userData.speed.x += 0.06;
        }
        break;
    

    case 38: //up
        ball.userData.moving.z = true;
        if (ball.userData.speed.z > -0.4) {
            ball.userData.speed.z -= 0.06;
        }
        break;
    case 40: //down
        ball.userData.moving.z = true;
        if (ball.userData.speed.z < 0.4) {
            ball.userData.speed.z += 0.06;
        }
        break;
        */
    }
    
   
}

function onKeyUp(e) {
    'use strict';

    switch(e.keyCode) {
    
    case 37: //left
        ball.userData.moving.x = false;
        ball.userData.moveKeys.left = false;
        //ball.userData.speed.x = 0;
        break;
    case 39: //right
        ball.userData.moving.x = false;
        ball.userData.moveKeys.right = false;
        //ball.userData.speed.x = 0;
        break;
    case 38: //up
        ball.userData.moving.z = false;
        ball.userData.moveKeys.up = false;
        break;
    case 40: //down
        ball.userData.moving.z = false;
        ball.userData.moveKeys.down = false;
        break;
    }
}

function animate() {
    'use strict';

    console.log(ball.userData.speed.x);
    if (ball.userData.moveKeys.right) {
        ball.userData.speed.x += 0.03;
    }
    if (ball.userData.moveKeys.left) {
        ball.userData.speed.x -= 0.03;
    }
    if (ball.userData.moveKeys.up) {
        ball.userData.speed.z -= 0.03;
    }
    if (ball.userData.moveKeys.down) {
        ball.userData.speed.z += 0.03;
    }

    if (ball.userData.speed.x != 0 && ball.userData.moving.x == false) {

        if (Math.abs(ball.userData.speed.x) > 0.01) {
            ball.userData.speed.x *= 0.9;
        }
        else {
            ball.userData.speed.x = 0;
        }
    }
    
    if (ball.userData.speed.z != 0 && ball.userData.moving.z == false) {
        if (Math.abs(ball.userData.speed.z) > 0.01) {
            ball.userData.speed.z *= 0.9;
        }
        else {
            ball.userData.speed.z = 0;
        }
    }
    /*ball.userData.step += 0.04;
    ball.position.y = Math.abs(30 * (Math.sin(ball.userData.step)));
    ball.position.z = 15 * (Math.cos(ball.userData.step));
    */
    ball.position.x += ball.userData.speed.x ;
    ball.position.z += ball.userData.speed.z ;
    

    render();
    requestAnimationFrame(animate);
}


function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCamera();
    render();

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown",onKeyDown);
    window.addEventListener("keypress",onKeyPress);
    window.addEventListener("keyup",onKeyUp);

}