const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = window.innerHeight;

const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS");
const traffic = [new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)];

//animation loop
function animate() {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  car.update(road.borders, traffic);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  ctx.translate(0, -car.y + canvas.height * 0.7);

  road.draw(ctx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx, "SteelBlue");
  }
  car.draw(ctx, "SeaGreen");
  ctx.restore();

  requestAnimationFrame(animate);
}

animate();
