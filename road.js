class Road{
    constructor(x, width, laneCount = 3){
        this.infinity = 10000;
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;
        this.left = x - width/2 + 2;
        this.right = x + width/2 - 2 ;
        this.top = this.infinity;
        this.bottom = -this.infinity;
    }

    draw(ctx){
        
        // ctx.beginPath();
        // ctx.moveTo(10, 20);
        // ctx.lineTo(100, 20);
        // ctx.strokeStyle = "black";
        // ctx.lineWidth = 5;
        // ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.left,  this.top);
        ctx.lineTo(this.left, this.bottom);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(this.right, this.top);
        ctx.lineTo(this.right, this.bottom);
        ctx.stroke();
    }
}