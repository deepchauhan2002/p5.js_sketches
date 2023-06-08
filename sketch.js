let song;
let amplitude;
let isPlaying = false;

function preload() {
  song = loadSound('/SoundHelix-Song-1.mp3', () => {
    // Create an amplitude object once the audio file is loaded
    amplitude = new p5.Amplitude();
  });
}

function setup() {
  createCanvas(400, 400);
  background(255); // Set background color to white

  // Register mouse click event
  canvas.addEventListener('click', toggleAudio);

  frameRate(10); // Set a lower frame rate to reduce the speed of generating figures
}

function draw() {
  background(255); // Refresh the white background

  if (isPlaying && amplitude) {
    let level = amplitude.getLevel(); // Get the current audio level

    // Use the audio level to control the randomness of graphic features
    let randomness = map(level, 0, 1, 0, 1);

    for (let i = 0; i < 10; i++) {
      // Generate random colors with enhanced variations
      let r = random(255 * randomness, 255);
      let g = random(255 * randomness, 255);
      let b = random(255 * randomness, 255);
      let alpha = random(50, 200);

      // Set the fill color
      fill(r, g, b, alpha);

      // Generate random shapes with audio influence
      let shapeType = random(1 - randomness);
      if (shapeType < 0.3) {
        // Draw a circle
        let x = random(width);
        let y = random(height);
        let circleSize = random(10, 100) * randomness;
        ellipse(x, y, circleSize, circleSize);
      } else if (shapeType < 0.6) {
        // Draw a rectangle
        let x = random(width);
        let y = random(height);
        let rectWidth = random(10, 100) * randomness;
        let rectHeight = random(10, 100) * randomness;
        rect(x, y, rectWidth, rectHeight);
      } else {
        // Draw a triangle
        let x1 = random(width);
        let y1 = random(height);
        let x2 = random(width);
        let y2 = random(height);
        let x3 = random(width);
        let y3 = random(height);
        triangle(x1, y1, x2, y2, x3, y3);
      }
    }
  }
}

function toggleAudio() {
  if (isPlaying) {
    song.pause(); // Pause the audio
  } else {
    song.play(); // Play the audio
  }
  isPlaying = !isPlaying; // Toggle the isPlaying flag
}
