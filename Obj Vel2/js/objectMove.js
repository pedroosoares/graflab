/*global THREE*/
//import THREE from 'three';

var camera, scene, renderer;
var material;
var chair;





function addChairBase(obj, x,y,z) {
    'use strict';
    var geometry = new THREE.CubeGeometry(10,1,10);
    var material = new THREE.MeshBasicMaterial({color:0x4f74af, wireframe: true});
    var mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(x,y,z);
    
    obj.add(mesh);
}

function addChairBack(obj, x,y,z) {
    'use strict';
    var geometry = new THREE.CubeGeometry(10,12,1);
    var material = new THREE.MeshBasicMaterial({color:0x4f74af, wireframe: true});
    var mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(x,y,z);
    
    obj.add(mesh);
}

function addChairPole(obj, x,y,z) {
    'use strict';
    var geometry = new THREE.CylinderGeometry( 1.2, 1.2, 8, 16 );
    var material = new THREE.MeshBasicMaterial({color:0xffc126, wireframe: true});
    var mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(x,y,z);
    
    obj.add(mesh);
}

function addChairHorizontal(obj, x,y,z, rot) {
    'use strict';
    //var geometry = new THREE.CubeGeometry( 10, 1.2, 1.2 );
    var geometry = new THREE.CylinderGeometry( 0.6, 0.6, 8, 16 );
    var material = new THREE.MeshBasicMaterial({color:0xffc126, wireframe: true});
    var mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(x,y,z);

    //var axis = new THREE.Vector3( x, y, z ).normalize(); // create once and reuse it
    //object.rotateOnAxis( axis, radians );
    
    //mesh.rotation.set(0,rot,0);
    mesh.rotateY( rot );
    mesh.rotateZ( Math.PI / 2 );

    obj.add(mesh);
}


function addChairWheel(obj, x,y,z) {
    'use strict';
    var geometry = new THREE.SphereGeometry( 1, 16, 16 );
    var material = new THREE.MeshBasicMaterial({color:0xff4800, wireframe: true});
    var mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(x,y,z);
    
    obj.add(mesh);
}


function createChair(x,y,z) {
    'use strict';
    chair = new THREE.Object3D();
    chair.userData = { speed: {x: 0, y: 0, z: 0}, moveKeys: {up:false, down:false, right: false, left: false}, step: 0};

    addChairWheel(chair, 4, -9.5, 0);
    addChairWheel(chair, -4, -9.5, 0);
    
    addChairWheel(chair, 2, -9.5, 2);
    addChairWheel(chair, -2, -9.5, 2);
    addChairWheel(chair, 2, -9.5, -2);
    addChairWheel(chair, -2, -9.5, -2);

    addChairHorizontal(chair, 0,-8,0, 2 * Math.PI / 3);
    addChairHorizontal(chair, 0,-8,0, -2 * Math.PI / 3);
    addChairHorizontal(chair, 0,-8,0, 0);
    
    addChairPole(chair, 0,-4,0);
    addChairBase(chair, 0,0,0);
    addChairBack(chair, 0,6,5);

    chair.position.x = x;
    chair.position.y = y;
    chair.position.z = z;

    scene.add(chair);
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

    createChair(0,0,20);
    //createchair(0,0,0);
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
        chair.userData.moveKeys.left = true;
        
        break;
    case 39: //right
        chair.userData.moveKeys.right = true;
        break;

    case 38: //up
        chair.userData.moveKeys.up = true;
        break;
    case 40: //down
        chair.userData.moveKeys.down = true;
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



function onKeyUp(e) {
    'use strict';

    switch(e.keyCode) {
    
    case 37: //left
        chair.userData.moveKeys.left = false;
        //chair.userData.speed.x = 0;
        break;
    case 39: //right
        chair.userData.moveKeys.right = false;
        //chair.userData.speed.x = 0;
        break;
    case 38: //up
        chair.userData.moveKeys.up = false;
        break;
    case 40: //down
        chair.userData.moveKeys.down = false;
        break;
    }
}

function animate() {
    'use strict';

    console.log(chair.userData.speed.x);
    if (chair.userData.moveKeys.right && chair.userData.speed.x < 0.14) {
        chair.userData.speed.x += 0.006;
    }
    if (chair.userData.moveKeys.left && chair.userData.speed.x > -0.14) {
        chair.userData.speed.x -= 0.006;
    }
    if (chair.userData.moveKeys.up && chair.userData.speed.z > -0.6) {
        chair.userData.speed.z -= 0.06;
    }
    if (chair.userData.moveKeys.down && chair.userData.speed.z < 0.6) {
        chair.userData.speed.z += 0.06;
    }

    if (chair.userData.speed.x != 0 && (chair.userData.moveKeys.left == false && chair.userData.moveKeys.right == false) ) {

        if (Math.abs(chair.userData.speed.x) > 0.01) {
            chair.userData.speed.x *= 0.9;
        }
        else {
            chair.userData.speed.x = 0;
        }
    }
    
    if (chair.userData.speed.z != 0 && (chair.userData.moveKeys.down == false && chair.userData.moveKeys.up == false) ) {
        if (Math.abs(chair.userData.speed.z) > 0.01) {
            chair.userData.speed.z *= 0.9;
        }
        else {
            chair.userData.speed.z = 0;
        }
    }
    
    
    //chair.position.x += chair.userData.speed.x ;
    //chair.position.z += chair.userData.speed.z ;
    chair.rotateY(-chair.userData.speed.x);
    chair.translateZ(chair.userData.speed.z);
    

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
    window.addEventListener("keyup",onKeyUp);

}