let font;
let points = [];
let bounds = [];

let sizeH = 3;
let sizeW = 3;

let fontsize = 130;

let colorValue = 9;
let brightness = 0;
let saturation = 255;

let fillColor = {
  H: 255,
  S: 0,
  B: 255,
  Alpha: 0.5,
};

let grayScale = true;
let autoControl = false;
let showUItext = true;

let distance = 5;
let brushSize = 5;
let brushTime = 1;

let string = "word";
const stringList = [
  "한글",
  "소년",
  "구름",
  "글자",
  "바다",
  "산",
  "섬",
  "원",
  "설명",
  "표",
  "숲",
  "Φ",
  "!",
  "&",
  "あ",
  "æ",
];
let mouseTarget = null;

function preload() {
  font = loadFont("NotoSansKR-Thin.otf");
  userStartAudio();
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 255, 255, 255, 1);
  createStringBody();
  setInterval(changeWords, 650);
  setInterval(playSynth, 650);
  cursor(CROSS);
  noLoop();
  noiseSetting();
  sliderUI();
}

let frame = 0;
let framelength = 5;

function draw() {
  if (frame === 0) {
    frame--;
    textAlign(CENTER);
    textSize(50);
    fill(0, 0, 50, 0.3);
    text("click on the screen", width / 2, height / 2);
    textAlign(LEFT);
    return;
  }
  frame--;
  autoControl && autoVariablefont(frame);
  background(255, 0, 255, 0.15);

  push();
  translate(
    -bounds.x * sizeW - (bounds.w / 2) * sizeW + windowWidth / 2,
    -bounds.y * sizeH + 185 + windowHeight / 5
  );
  drawPoint(points);
  pop();
  if (frame % 1 === 0) playZiggle();
  showUItext && drawTextUI();
}
//stringBody.js
function createStringBody() {
  points = font.textToPoints(string, 100, 100, fontsize, {
    sampleFactor: 0.2,
    simplifyThreshold: 0,
  });
  bounds = font.textBounds(string, 100, 100, fontsize);
}
//sound.js
let monoSynth;
let monoSynth2;

let pitches = ["A", "B", "C", "D", "E", "F", "G"];
let signature = ["b", "", "#"];
let octaves = [7, 7, 6, 5, 4, 4];

function noiseSetting() {
  monoSynth = new p5.PolySynth();
  monoSynth2 = new p5.PolySynth();
}

function playSynth() {
  if(isLooping()){
    let note = random(pitches) + random([5, 4]);
    let velocity = random(0.5, 0.8);
    let time = 0;
    let dur = 1 / 125;
    monoSynth.play(note, velocity, time, dur);
  }
}

let octaveStart;
let octaveScope;

function playZiggle() {
  octaveStart = int(map(brushSize, 0, 16, 0, 5)); // 0~5
  octaveScope = int(map(distance, 0, 16, 1, 6 - octaveStart));

  let octave = octaves.slice(octaveStart, octaveStart + octaveScope);
  let note = random(pitches) + random(signature) + random(octave);
  let velocity = random(0.05, 0.1 + (0.2 * distance) / 16);
  let time = 0;
  let dur = 1 / 525;

  monoSynth2.play(note, velocity, time, dur);
}

let oldestNote = [];

//interaction.js
function mousePressed() {
  loop();
}

function mouseMoved() {
  if (!autoControl) {
    distance = mouseX / 50;
    brushSize = mouseY / 50;
    slider1 && slider1.value(distance);
    slider2 && slider2.value(brushSize);
  }
}

function keyPressed() {
  if (keyCode > 48 && keyCode <= 57) {
    // 1~9
    brightness = 255 - (keyCode - 48 - 1) * 28;
    saturation = 255 - (keyCode - 48 - 1) * 28;
    colorValue = keyCode - 48;
  } else if (keyCode == 72) {
    // h
    showUItext = !showUItext;
    if (showUItext) {
      slider1.style("visibility", "visible");
      slider2.style("visibility", "visible");
    } else {
      slider1.style("visibility", "hidden");
      slider2.style("visibility", "hidden");
    }
  } else if (keyCode >= 60 && keyCode <= 95) {
    //a~z
    changeWords();
  } else if (keyCode == 32) {
    // space
    grayScale = !grayScale;
  } else if (keyCode == 13) {
    // enter
    autoControl = !autoControl;
  }
}

function autoVariablefont(frame) {
  let speed = 100;
  let circleSize = 20;

  distance = (sin(frame / speed) * 400 + 400) / 50;
  brushSize = (cos(frame / speed) * 400 + 400) / 50;

  slider1.value(distance);
  slider2.value(brushSize);

  framelength = distance;
}

function changeWords() {
  string = stringList[int(random(0, stringList.length - 1))];
  createStringBody();
}

//drawing.js
function brush(x, y) {
  if(grayScale) {
     fillColor.S = 0;
     fillColor.B = brightness;
   }else{
     fillColor.H = int(random(0,255));
     fillColor.S = saturation;
     fillColor.B = 255;
   }
   const { H, S, B, Alpha } = fillColor;
   fill(H, S, B, Alpha);
   stroke(H, S, 30, Alpha);
   
   for (let i = 0; i < brushTime; i++) {
     let posX = randomGaussian(0, distance);
     let posY = randomGaussian(0, distance);
     let size = randomGaussian(5, brushSize);
     ellipse(x + posX, y + posY, size, size);
   }
 }
 
 function showString(points) {
   push();
   points.forEach((point) => {
     circle(point.x * sizeW, point.y * sizeH, 5);
     fill(10);
   });
   pop();
 }
 
 function drawPoint(points) {
   if (points) {
     for (let i = 0; i < points.length; i++) {
       brush(points[i].x * sizeW, points[i].y * sizeH);
     }
   }
 }

 //drawUI.js
 let slider1;
let slider2;

function sliderUI() {
  sliderWidth = 100;
  sliderYtop = 1000;
  sliderYdistance = 25;
  slider1 = createSlider(0, 16, distance, 0);
  slider1.position(windowWidth / 2 - sliderWidth / 2, sliderYtop);
  slider1.style("width", sliderWidth + "px");
  slider1.addClass("slider");

  slider2 = createSlider(0, 16, brushSize, 0);
  slider2.position(
    windowWidth / 2 - sliderWidth / 2,
    sliderYtop + sliderYdistance
  );
  slider2.addClass("slider");
  slider2.style("width", sliderWidth + "px");
  slider2.style("width", sliderWidth + "px");
}

const ydistanceUI = 18;
function drawTextUI() {
  push();
  textSize(15);
  fill(0, 0, 50, 0.3);
  text(
    autoControl ? "Control Mode : Auto" : "Control Mode : Mouse",
    5,
    ydistanceUI * 1
  );
  fill(0, 0, 50, 0.1);
  text("Press 'Enter' to change", 5, ydistanceUI * 2);
  fill(0, 0, 50, 0.3);
  text(
    grayScale ? "Color Mode : Mono" : "Color Mode : Color",
    5,
    ydistanceUI * 4
  );
  fill(0, 0, 50, 0.1);
  text("Press 'Space' to change", 5, ydistanceUI * 5);

  fill(0, 0, 50, 0.3);
  text("Color Value : " + colorValue, 5, ydistanceUI * 7);
  fill(0, 0, 50, 0.1);
  text("Press '1~9' keyborad to change", 5, ydistanceUI * 8);
  
  text("You can hide the description by pressing the 'H' key.", 5, ydistanceUI * 10);
  // text("distance : " + int(distance), 5, 15);
  // text("brushSize : " + int(brushSize), 5, 30);
  // text("brightness : " + int(brightness), 5, 45);
  // text("frame : " + int(frame), 5, 60);
  // text("octaveStart : " + octaveStart, 5, 75);
  // text("octaveScope : " + octaveScope, 5, 90);
  pop();
}

//colorControl.js
function changeColor() {
  fillColor.H = random(255);
}

function changeGrayscale() {
  fillColor.S = fillColor.S === 0 ? 255 : 0;
  isGrayscale = !isGrayscale;
  if (!isGrayscale) {
    fillColor.B = 255;
  } else {
    fillColor.B = 50;
  }
}

function filpBrightness() {
  fillColor.B = fillColor.B === 50 ? 255 : 50;
}

