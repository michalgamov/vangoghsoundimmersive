let t = 0; // Time variable for noise function
let colors = []; // Array of Starry Night colors
let palettes = []; // Array of Van Gogh palettes
let paletteNames = []; // Array of palette names
let currentPalette = 0; // Index of the current palette
let currentPaletteName = ''; // Name of the current palette
let font; // Variable to store the font
let imageObj; // Variable to store the image object
let timeImageObj; // Variable to store the time image object
let sound; // Variable to store the sound file

let rectX; // X-coordinate of the rectangle
let rectY; // Y-coordinate of the rectangle

function preload() {
  // Load the font file
  font = loadFont('SPACEGROTESK-LIGHT.TTF');

  // Load the image files
  imageObj = loadImage('main_typo_04.png');
  immersiveImageObj = loadImage('immersive_experience_01.png');
  timeImageObj = loadImage('TIME_01.png');

  // Load the sound file
  sound = loadSound('Van Gogh_Fever.mp3');
}

function setup() {
  createCanvas(350, 550);
  background(250, 50); // Add transparency to create a fading effect

  // Define Starry Night, 1889 color palette
  colors = [
    '#5b7e9c',
    '#0f1223',
    '#333a41',
    '#27629b',
    '#1f3565',
    '#d4c65b',
    '#b5a440',
    '#173f7f',
    '#c47113',
    '#dcae42'
  ];

  // Define Van Gogh palettes
  palettes = [
    colors, // Starry Night, 1889 palette
    [
      '#d4c778',
      '#1d231b',
      '#2d301e',
      '#38462a',
      '#202f22',
      '#686b40'
    ], // Potato Eaters, 1885
    [
      '#a9892a',
      '#a7552d',
      '#91a1c3',
      '#c8c9bc',
      '#b09e25',
      '#877564',
      '#5f74a2'
    ], // Bedroom in Arles, 1888
    [
      '#d3b753',
      '#a08350',
      '#845938',
      '#8a8949',
      '#264868'
    ], // Wheatfield with Crows, 1890
    [
      '#566c4a',
      '#DBA248',
      '#683921',
      '#696A26',
      '#D3AB49',
      '#D1A22E',
      '#9C6420',
      '#A2B7A8',
      '#B1812D',
      '#C1C9B3'
    ], // Sunflowers, 1889
    [
      '#b77420',
      '#b65317',
      '#cac18a',
      '#9b4d33',
      '#bd5534',
      '#bda03c',
      '#baa77f',
      '#3a5557',
      '#837453',
      '#385e69'
    ] // Self-Portrait, 1889
  ];

  // Define palette names
  paletteNames = [
    'Starry Night, 1889',
    'Potato Eaters, 1885',
    'Bedroom in Arles, 1888',
    'Wheatfield with Crows, 1890',
    'Sunflowers, 1889',
    'Self-Portrait, 1889'
  ];

  // Set the default palette to Starry Night, 1889
  currentPalette = 0;
  currentPaletteName = paletteNames[currentPalette];

  // Initialize the rectangle position at the center of the canvas
  rectX = width / 2;
  rectY = height / 2;

  // Play the sound file
  sound.play();
}

function draw() {
  // Clear the canvas
  background(250, 50);

  // Update the rectangle position based on the mouse
  rectX = mouseX;
  rectY = mouseY;

  // Draw the image
  image(imageObj, 50, 104, 244, 280); // Adjust the position and size as needed

  // Define the rectangle region
  let rectWidth = width - 2 * rectX;
  let rectHeight = height - 4 * rectY;

  // Loop through the rectangle region and draw lines
  for (let x = rectX; x <= rectX + rectWidth; x += 5) {
    for (let y = rectY; y <= rectY + rectHeight; y += 5) {
      // Calculate noise values to determine line positions
      let nx = noise(x / 50, y / 50, t);
      let ny = noise(x / 20, y / 20, t + 5);

      // Calculate line endpoints based on noise values
      let x1 = x + map(nx, 0, 1, -20, 20);
      let y1 = y + map(ny, 0, 1, -20, 20);
      let x2 = x + map(nx, 0, 1, -10, 10);
      let y2 = y + map(ny, 0, 1, -10, 10);

      // Choose a random color from the current palette
      let colorIndex = floor(random(palettes[currentPalette].length));
      let lineColor = palettes[currentPalette][colorIndex];

      // Set stroke color and weight
      stroke(lineColor);
      strokeWeight(2);

      // Draw the line
      line(x1, y1, x2, y2);
    }
  }

  // Increment the time variable for animation (slower speed)
  t += 0.5;

  // Display the palette name
  displayPaletteName();

  // Display the text "IMMERSIVE EXPERIENCE"
  let textX = width / 2;
  let textY = 480;
  let fontSize = 32;
  fill(0); // Set text color to black
  textAlign(CENTER, CENTER);
  textSize(16);
  textFont(font);
  text("IMMERSIVE EXPERIENCE EXHIBITION", 175, 420);
}

function displayPaletteName() {
  // Display the current palette name on the canvas
  fill(0); // Set text color to black
  textAlign(CENTER, CENTER);
  textSize(10);
  noStroke();
  textFont(font);
  text(currentPaletteName, 90, 30);
}

function changePalette() {
  // Increment the currentPalette index
  currentPalette = (currentPalette + 1) % palettes.length;
  currentPaletteName = paletteNames[currentPalette];
}

setInterval(changePalette, 5000);
