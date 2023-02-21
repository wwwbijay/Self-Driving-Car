const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = window.innerHeight;

const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 300, 30, 50);

let lastTime = 0;
//animation loop
function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.7);
  car.update(road.borders);

  road.draw(ctx);
  car.draw(ctx);
  ctx.restore();

  requestAnimationFrame(animate);
}

animate(0);
