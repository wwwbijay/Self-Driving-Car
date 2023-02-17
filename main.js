const canvas = document.getElementById('canvas');
canvas.width = 300;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

const car = new Car(100,100, 30, 50);



let lastTime = 0;
  //animation loop
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);    
    car.draw(ctx);
    car.update(deltaTime);
    requestAnimationFrame(animate);
  }

  animate(0);