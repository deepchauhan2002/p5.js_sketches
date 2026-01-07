class Mover{
  constructor(){
    this.position = createVector(0,0);
    this.velocity = createVector(0,0);
    this.acceleration = createVector();
    this.topSpeed = 8;
  }

  update(){
    // var dir = createVector(mouseX, mouseY);
    // dir.sub(this.position);
    // dir.mult(-1);
    // dir.setMag(0.5);
    // this.acceleration = dir;
    this.velocity.add(this.acceleration);
    // this.velocity.limit(this.topSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  show() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    circle(this.position.x, this.position.y, 48);
  }

  addAcceleration(force){
    this.acceleration.add(force);
  }
  checkEdges() {
    if (this.position.x > width) {
      this.velocity.x = this.velocity.x*-1;
    } else if (this.position.x < 0) {
      this.velocity.x = this.velocity.x*-1;
    }

    if (this.position.y > height) {
      this.velocity.y = this.velocity.y*-1;
    } else if (this.position.y < 0) {
      this.velocity.y = this.velocity.y*-1;
    }
  }
}

  function setup(){
    createCanvas(640, 240)
    mover = new Mover();
  }

  function draw(){
    background(220);
    gravity = createVector(0, 0.01);
    mover.addAcceleration(gravity);
    wind = createVector(0.01, 0);
    mover.addAcceleration(wind);
    mover.show()
    mover.update()
    mover.checkEdges()
  }