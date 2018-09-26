/*global THREE*/
//import THREE from 'three';

var camera, scene, renderer;
var material;
var ball;

function createBall(x,y,z) {
    'use strict';

    ball = new THREE.Object3D();
    ball.userData = { jumping: true, step: 0};

    var material = new THREE.MeshBasicMaterial({color:0xff0000, wireframe: true});
    var geometry = new THREE.SphereGeometry(4,10,10);
    var mesh = new THREE.Mesh(geometry,material);

    ball.add(mesh);
    ball.position.set(x,y,z);

    scene.add(ball);
}

function addTableTop(obj, x,y,z) {
    'use strict';
    var geometry = new THREE.CubeGeometry(70,3,40);
    var mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(x,y,z);
    
    obj.add(mesh);
}

function addTableLeg(obj, x,y,z) {
    'use strict';
    var geometry = new THREE.CylinderGeometry(2,2,20,10,10);
    var mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(x,y,z);
    
    obj.add(mesh);
}

function createTable(x,y,z) {
    'use strict';
    var table = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({color:0x00ff00, wireframe: true});
    
    addTableTop(table, 0,17.5,0);
    addTableLeg(table, -20,6,-15);
    addTableLeg(table, -20,6,15);
    addTableLeg(table, 20,6,15);
    addTableLeg(table, 20,6,-15);
    
    scene.add(table);

    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}




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
    var chair = new THREE.Object3D();
    
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
    //OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
    //camera = new THREE.OrthographicCamera(-window.innerWidth/10,window.innerWidth/10,window.innerHeight/10,-window.innerHeight/10,0.001,10000);
    camera.position.x = 50;
    camera.position.y = 50;
    camera.position.z = 50;
    camera.lookAt(scene.position);
}

function createScene() {
    'use strict';
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));
    createTable(0,0,0);
    createChair(0,0,20);
    createBall(0,0,15);
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
    case 65: //A
    case 97: //a
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe =  !node.material.wireframe;
            }
        });
        break;
    case 83: //S
    case 115: //s
        ball.userData.jumping = !ball.userData.jumping;
        break;
    }
    //render();
}

function animate() {
    'use strict';

    if (ball.userData.jumping) {
        ball.userData.step += 0.04;
        ball.position.y = Math.abs(30 * (Math.sin(ball.userData.step)));
        ball.position.z = 15 * (Math.cos(ball.userData.step));
    }
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

}