class Car {
  constructor(x, y, width, height, controlType, maxSpeed = 3) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = maxSpeed;
    this.friction = 0.05;

    this.angle = 0;
    this.damaged = false;
    if (controlType != "DUMMY") {
      this.sensor = new Sensor(this);
    }

    this.controls = new Controls(controlType);
  }

  draw(ctx, color) {
    if (this.damaged) {
      ctx.fillStyle = "Crimson";
    } else {
      ctx.fillStyle = color;
    }
    ctx.beginPath();
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);

    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    ctx.fill();

    // context.save();
    // context.translate(this.x, this.y);
    // context.rotate(-this.angle);

    // context.beginPath();
    // context.fillStyle = "red";
    // context.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    // context.fill();
    // context.restore();
    if (this.sensor) {
      this.sensor.draw(ctx);
    }
  }

  update(roadBorders, traffic) {
    if (!this.damaged) {
      this.polygon = this.#createPolygon();
      this.damaged = this.#accessDamage(roadBorders, traffic);
      this.#move();
    }

    if (this.sensor) {
      this.sensor.update(roadBorders, traffic);
    }
  }

  #accessDamage(roadBorders, traffic) {
    for (let i = 0; i < roadBorders.length; i++) {
      if (polysIntersect(this.polygon, roadBorders[i])) {
        return true;
      }
    }

    for (let i = 0; i < traffic.length; i++) {
      console.log(this.polygon, traffic[i].polygon);

      if (polysIntersect(this.polygon, traffic[i].polygon)) {
        return true;
      }
    }

    return false;
  }

  #createPolygon() {
    const points = [];
    const rad = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);

    points.push({
      x: this.x - Math.sin(this.angle - alpha) * rad,
      y: this.y - Math.cos(this.angle - alpha) * rad,
    });

    points.push({
      x: this.x - Math.sin(this.angle + alpha) * rad,
      y: this.y - Math.cos(this.angle + alpha) * rad,
    });

    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
    });

    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
    });

    return points;
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
