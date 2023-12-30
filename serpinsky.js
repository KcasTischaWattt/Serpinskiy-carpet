let pointsCount;
let iterationCount;
let multiplier;
let animationId;
let isAnimating = false;
const maxPoints = 1500000;
const scaleFactor = 2 / 3;

function setValuesToDefault() {
  pointsCount = 0;
  multiplier = 1.01;
  iterationCount = 100;
}

function putPoint(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1);
}

function serpinsky(iterationCount) {
  const canvas = document.querySelector('#canvas');
  if (!canvas.getContext) {
    return;
  }
  const ctx = canvas.getContext('2d');
  const refPoints = [
    new ColorPoint(0, 0, '#FF1D27'),
    new ColorPoint(0.5, 0, '#3D9AFC'),
    new ColorPoint(1, 0, '#F1F2F2'),
    new ColorPoint(1, 0.5, 'pink'),
    new ColorPoint(1, 1, '#1EE3CF'),
    new ColorPoint(0.5, 1, '#01DC25'),
    new ColorPoint(0, 1, '#AE583D'),
    new ColorPoint(0, 0.5, '#6B48FF'),
  ];

  let newPoint = new ColorPoint(0, 0, 'white');

  for (let i = 0; i < iterationCount; i++) {
    const targetPoint = refPoints[Math.floor(Math.random() * 8)];
    newPoint.x += (targetPoint.x - newPoint.x) * scaleFactor;
    newPoint.y += (targetPoint.y - newPoint.y) * scaleFactor;

    const canvasX = Math.floor(newPoint.x * canvas.width);
    const canvasY = Math.floor(newPoint.y * canvas.height);
    putPoint(ctx, canvasX, canvasY, targetPoint.color);
  }

  pointsCount += iterationCount;
}
