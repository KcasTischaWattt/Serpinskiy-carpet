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

function serpinsky() {
    const canvas = document.querySelector('#canvas');
    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');
    const refPoints = [
        { x: 0, y: 0, color: "red" },
        { x: 0.5, y: 0, color: "blue" },
        { x: 1, y: 0, color: "grey" },
        { x: 1, y: 0.5, color: "pink" },
        { x: 1, y: 1, color: "cyan" },
        { x: 0.5, y: 1, color: "green" },
        { x: 0, y: 1, color: "orange" },
        { x: 0, y: 0.5, color: "black" }
    ];

    let newPoint = getRandomPoint();
    const scaleFactor = 2 / 3;

    for (let i = 0; i < 100000; i++) {
        const targetPoint = refPoints[Math.floor(Math.random() * 8)];
        newPoint.x += (targetPoint.x - newPoint.x) * scaleFactor;
        newPoint.y += (targetPoint.y - newPoint.y) * scaleFactor;

        const canvasX = Math.round(newPoint.x * canvas.width);
        const canvasY = Math.round(newPoint.y * canvas.height);
        putPoint(ctx, canvasX, canvasY, targetPoint.color);
    }
}
