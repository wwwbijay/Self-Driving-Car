class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = 3;
    this.friction = 0.05;

    this.angle = 0;
    this.controls = new Controls();
  }
  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(-this.angle);

    context.beginPath();
    context.fillStyle = "orange";
    context.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    context.fill();
    context.restore();
  }
  update() {
    this.#move();
  }

  #move() {
    if (this.controls.forward) this.speed += this.acceleration;
    else if (this.controls.reverse) this.speed -= this.acceleration;

    if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;

    if (this.speed < -this.maxSpeed / 2) this.speed = -this.maxSpeed / 2;

    if (this.speed > 0) this.speed -= this.friction;
    if (this.speed < 0) this.speed += this.friction;

    /* 
        This code was added because car was moving forward 
        with small speed when no key was pressed.
        */
    if (Math.abs(this.speed) < this.friction) this.speed = 0;

    if (this.speed != 0) {
      const backFlip = this.speed > 0 ? 1 : -1;

      if (this.controls.left) this.angle += 0.03 * backFlip;
      else if (this.controls.right) this.angle -= 0.03 * backFlip;
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }
}
