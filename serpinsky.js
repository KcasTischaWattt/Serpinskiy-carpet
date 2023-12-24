function putPoint(ctx, x, y, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}

function serpinsky(){
    const canvas = document.querySelector('#canvas');
    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');
    let refPoints = [  { x: 0,     y: 0,   color: "red"},
                    { x: 0.5,   y: 0,   color: "blue"},
                    { x: 1,     y: 0,   color: "grey"},
                    { x: 1,     y: 0.5, color: "pink"},
                    { x: 1,     y: 1,   color: "cyan"},
                    { x: 0.5,   y: 1,   color: "green"},
                    { x: 0,     y: 1,   color: "orange"},
                    { x: 0,     y: 0.5, color: "black"}];
    var newx = Math.random();
    var newy = Math.random();
    for (i = 0; i < 100000; i++){
        targetPoint = refPoints[Math.round((Math.random()*7))];
        newx += (targetPoint.x - newx)*2/3;
        newy += (targetPoint.y - newy)*2/3;
        putPoint(ctx, Math.round(newx*canvas.width), Math.round(newy*canvas.height), targetPoint.color);
    }   
}