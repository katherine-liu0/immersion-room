// variable to hold a reference to our A-Frame world
let world;

// to handle multiple dynamic textures we can use a series of separate variables to hold
// a few off screen graphics buffers created using the 'createGraphics' function in p5
// let buffer1 = document.querySelector('canva')
let buffer1
let buffer2

let xRepeat=20
let yRepeat=10

let size= 1

let strokeSize = 5

let rotationValue = 0

let color="#FFFFFF"

let showCanvasInsteadOfInspiration = true

// we will also need three variables to hold the dynamic textures that will be created using
// these three buffers

function setup() {
	// no main canvas - we will just use our off screen graphics buffers to hold our dynamic textures




	buffer2 = createCanvas(300, 300);

	 // set the ID on the canvas element
	 buffer2.id("my_p5_canvas_element");

	 // set the parent of the canvas element to the element in the DOM with
	 // an ID of "left"
	 buffer2.parent("#container");

	  // erase the background
	 buffer2.background(0);
	 buffer2.stroke(255)
	 buffer2.stroke(5)
	 buffer2.rect(1,1,280,280)

	// construct the A-Frame world
	// this function requires a reference to the ID of the 'a-scene' tag in our HTML document
	world = new World('VRScene');

	world.setUserPosition(0,5,5);

	// set the background color of the world
	world.setBackground(0,0,0);

	// create our three off screen graphics buffers, making sure that each is set up with dimensions
	// that are a power of 2
	buffer1 = createGraphics(600, 600);
	buffer1.background(0);


	// set up these graphics buffers as dynamic textures
	texture1 = world.createDynamicTextureFromCreateGraphics( buffer1 );

	// create three planes that will be use these textures
	let plane1 = new Plane({
		x:0, y:10, z:0,
		width:40, height:20,
		asset: texture1,
		side: 'double',
		dynamicTexture: showCanvasInsteadOfInspiration,
		dynamicTextureWidth: 600,
		dynamicTextureHeight: 600,
		repeatX:xRepeat,
		repeatY:yRepeat,
	});

	let plane2 = new Plane({
		x:0, y:10, z:20,
		width:40, height:20,
		asset: texture1,
		side: 'double',
		dynamicTexture: true,
		dynamicTextureWidth: 600,
		dynamicTextureHeight: 600,
		repeatX:xRepeat,
		repeatY:yRepeat,
	});

	let plane3 = new Plane({
		x:10, y:10, z:10,
		width:40, height:20,
		rotationY:90,
		asset: texture1,
		side: 'double',
		dynamicTexture: true,
		dynamicTextureWidth: 600,
		dynamicTextureHeight: 600,
		repeatX:xRepeat,
		repeatY:yRepeat,
	});

	let plane4 = new Plane({
		x:-10, y:10, z:10,
		width:40, height:20,
		rotationY:90,
		asset: texture1,
		side: 'double',
		dynamicTexture: true,
		dynamicTextureWidth: 600,
		dynamicTextureHeight: 600,
		repeatX:xRepeat,
		repeatY:yRepeat,
	});


	// add the planes to our world
	world.add(plane1);
	world.add(plane2);
	world.add(plane3);
	world.add(plane4);

	// create a plane to serve as our "ground"
	let ground = new Plane({
		x:0, y:0, z:0,
		width:100, height:100,
		asset:'wood',
		repeatX: 20,
		repeatY: 20,
		rotationX:-90,
	});

	let ceiling = new Plane({
		x:0, y:12, z:0,
		width:100, height:100,
		red:201,
		green:150,
		blue:74,
		side: 'double',
		rotationX:-90,
	});

	// add the ground to our world
	world.add(ground);
	world.add(ceiling);
}


function draw() {
	// here we can manipulate our three separate off screen graphics buffers, which will translate
	// into changes in the three dynamic textures in our world

	// texture1 - random black and white squares
	if (mouseIsPressed){
		stroke(color)
		strokeWeight(strokeSize)
		buffer2.line(mouseX,mouseY,pmouseX,pmouseY)
	}

	// buffer1.background(0)
	buffer1.push()
	buffer1.translate(300,300)
	buffer1.rotate(radians(rotationValue))
	buffer1.scale(size)
	buffer1.image(buffer2,-300,-300)
	buffer1.image(buffer2,0,-600)
 	buffer1.image(buffer2, -600,0);
    buffer1.image(buffer2, 0,0);
    buffer1.pop()
}


function rotation(){
	rotationValue+=45
}

function changeSize(el){
	size = el.value 

}

function changeStroke(el){
	strokeSize = el.value 
}

function clearCanvas(){
	buffer1.background(0)
	buffer2.background(0)
}

function changeColor(el){
	color = el.value 
}

function show(){
	document.getElementById('show').style.display = 'block'
}

function hide(){
	document.getElementById('show').style.display = 'none'
}

