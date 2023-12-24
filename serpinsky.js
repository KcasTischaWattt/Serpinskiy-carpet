let pointsCount;
let iterationCount;
let multiplier;
const maxPoints = 1500000;

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
    const scaleFactor = 2 / 3;

    for (let i = 0; i < iterationCount; i++) {
        const targetPoint = refPoints[Math.floor(Math.random() * 8)];
        newPoint.x += (targetPoint.x - newPoint.x) * scaleFactor;
        newPoint.y += (targetPoint.y - newPoint.y) * scaleFactor;

        const canvasX = Math.round(newPoint.x * canvas.width);
        const canvasY = Math.round(newPoint.y * canvas.height);
        putPoint(ctx, canvasX, canvasY, targetPoint.color);
    }
}
