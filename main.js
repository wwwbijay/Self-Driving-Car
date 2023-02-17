const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = window.innerHeight;

const car = new Car(100,100, 30, 50);
const road = new Road(canvas.width/2, canvas.width);

let lastTime = 0;
  //animation loop
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);   
    road.draw(ctx);

    car.draw(ctx);
    car.update(deltaTime);
    requestAnimationFrame(animate);
  }

  animate(0);