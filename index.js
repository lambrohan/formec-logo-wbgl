// var three = require('three');

var scene = new THREE.Scene();
var mouse = new THREE.Vector3();
var logo;
var primaryMaterial = new THREE.MeshBasicMaterial({
	color:0x00ffff
})

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 50;

var renderer = new THREE.WebGLRenderer({antialise:true});

var canvas = renderer.domElement;

renderer.setClearColor("#000000");
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(canvas);

window.addEventListener("resize",()=>{
	renderer.setSize(window.innerWidth,window.innerHeight);
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
})


var grid = new THREE.GridHelper(50, 100, 0x666666, 0x444444)
grid.rotateY(Math.PI/2);
scene.add(grid);


var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', function() { renderer.render(scene, camera); } );



// Load 3D file
var manager = new THREE.LoadingManager();
var loader = new THREE.OBJLoader(manager);

loader.load('model.obj',function(model){
	logo = model;
	model.position.z = 1;
	model.traverse(function(child){
		if(child instanceof THREE.Mesh){
			child.materia = new THREE.MeshNormalMaterial({flatShading:true});
		}
	})
	scene.add(model);
})
// LIGHTS
var spotLight = new THREE.SpotLight( 0x00ffff, 7.04 );
spotLight.position.set( -0.759, 95, 50.800 );
spotLight.castShadow = true;
spotLight.distance = 124;
spotLight.decay = 1.00;
spotLight.angle = 0.3;
scene.add( spotLight );

var spotLightHelper = new THREE.SpotLightHelper( spotLight );
// scene.add( spotLightHelper );


// mouse hover
canvas.addEventListener('mousemove',function(){
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	//optput specs
	document.getElementById('mouseX').innerText = "MouseX : "+ mouse.x.toFixed(3);

	document.getElementById('mouseY').innerText = "MouseY : "+mouse.y.toFixed(3);
	
})

var axesHelper = new THREE.AxesHelper( 100 );
scene.add( axesHelper );


function rotateLogo(mouse){
	logo.rotation.y = mouse.x*0.5;
}

// //drawing lines
// var geometry = new THREE.Geometry();
// geometry.vertices.push(new THREE.Vector3( -15, 5, 0) );
// geometry.vertices.push(new THREE.Vector3( -20,5 , 0) );
// geometry.vertices.push(new THREE.Vector3( -20,8 , 0) );
// geometry.vertices.push(new THREE.Vector3( -35,8 , 0) );
// //create a blue LineBasicMaterial
// var material = new THREE.LineBasicMaterial( { color: 0x00ffff } );
// var line = new THREE.Line( geometry, material );
// scene.add( line );

// var circleGeo = new THREE.CircleGeometry( 1, 32 );
// var dot = new THREE.Mesh(circleGeo,primaryMaterial);
// dot.position.set(-15,5,0);
// scene.add(dot);

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	rotateLogo(mouse);
	renderer.render( scene, camera );
}
animate();