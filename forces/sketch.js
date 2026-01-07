class Mover{
  constructor(){
    this.position = createVector(random(width), random(height));
    this.velocity = createVector();
    this.acceleration = createVector();
    this.topSpeed = 8;
  }

  update(){
    var dir = createVector(mouseX, mouseY);
    dir.sub(this.position);
    dir.mult(-1);
    dir.setMag(0.5);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.position.add(this.velocity);
  }
  show() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    circle(this.position.x, this.position.y, 48);
  }

  checkEdges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }
}

  function setup(){
    createCanvas(640, 240)
    mover = new Mover();
  }

  function draw(){
    background(220);
    mover.show()
    mover.update()
    mover.checkEdges()
  }