let pointsCount;
let iterationCount;
let multiplier;
const maxPoints = 1500000;
const scaleFactor = 2 / 3;

class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Rectangle{
    constructor(leftTop, rightBottom){
        this.leftTop = leftTop;
        this.rightBottom = rightBottom;
    }
    width(){
        return this.rightBottom.x - this.leftTop.x;
    }
    height(){
        return this.rightBottom.y - this.leftTop.y;
    }
    getLeftBottom(){
        return new Point(this.leftTop.x, this.rightBottom.y);
    }
    getRightTop(){
        return new Point(this.rightBottom.x, this.leftTop.y);
    }
}

function setValuesToDefault() {
    pointsCount = 0;
    multiplier = 1.01;
    iterationCount = 100;
}

function restart() {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setValuesToDefault()
}

function putPoint(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}

function getRandomPoint() {
    return {
        x: Math.random(),
        y: Math.random(),
    };
}

function animation() {
    if (pointsCount < maxPoints) {
        serpinsky(iterationCount);
        iterationCount*=multiplier;
        pointsCount+=iterationCount;
        requestAnimationFrame(animation);
    } else {
        console.log("stopped");
    }
}

function serpinsky(iterationCount) {
    const canvas = document.querySelector('#canvas');
    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');
    const refPoints = [
        { x: 0, y: 0, color: "#FF1D27" },
        { x: 0.5, y: 0, color: "#3D9AFC" },
        { x: 1, y: 0, color: "#F1F2F2" },
        { x: 1, y: 0.5, color: "pink" },
        { x: 1, y: 1, color: "#1EE3CF" },
        { x: 0.5, y: 1, color: "#01DC25" },
        { x: 0, y: 1, color: "#AE583D" },
        { x: 0, y: 0.5, color: "#6B48FF" }
    ];

    let newPoint = getRandomPoint();

    for (let i = 0; i < iterationCount; i++) {
        const targetPoint = refPoints[Math.floor(Math.random() * 8)];
        newPoint.x += (targetPoint.x - newPoint.x) * scaleFactor;
        newPoint.y += (targetPoint.y - newPoint.y) * scaleFactor;

        const canvasX = Math.round(newPoint.x * canvas.width);
        const canvasY = Math.round(newPoint.y * canvas.height);
        putPoint(ctx, canvasX, canvasY, targetPoint.color);
    }
}

function serpinskyRecursive(){
    restart()
    const canvas = document.querySelector('#canvas');
    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    function deleteCentralRect(inRect){
        const centralLeftTop = new Point(inRect.leftTop.x + inRect.width()/3,
                                         inRect.leftTop.y + inRect.height()/3);
        const centralRightBottom = new Point(inRect.leftTop.x + inRect.width()*2/3,
                                             inRect.leftTop.y + inRect.height()*2/3);
        const centralRect = new Rectangle(centralLeftTop, centralRightBottom);
        ctx.clearRect(centralRect.leftTop.x * canvas.width,
                      centralRect.leftTop.y * canvas.height,
                      centralRect.width() * canvas.width,
                      centralRect.height() * canvas.height);
        if(centralRect.width() * canvas.width > 4){ 
            var rects = new Array();
            rects[0] = new Rectangle(inRect.leftTop, centralRect.leftTop);
            rects[1] = new Rectangle(rects[0].getRightTop(), centralRect.getRightTop())
            rects[2] = new Rectangle(centralRect.rightBottom, inRect.rightBottom);
            rects[3] = new Rectangle(centralRect.getRightTop(), rects[2].getRightTop());
            rects[4] = new Rectangle(rects[1].getRightTop(), rects[3].getRightTop());
            rects[5] = new Rectangle(centralRect.getLeftBottom(), rects[2].getLeftBottom());
            rects[6] = new Rectangle(rects[0].getLeftBottom(), centralRect.getLeftBottom());
            rects[7] = new Rectangle(rects[6].getLeftBottom(), rects[5].getLeftBottom());

            for(let i=0; i<8; i++){
                deleteCentralRect(rects[i]);
            }
        }
    }
    deleteCentralRect(new Rectangle(new Point(0, 0), new Point(1, 1)));
}
