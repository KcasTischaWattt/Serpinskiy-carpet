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

function restart() {
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setValuesToDefault();
}

function putPoint(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1);
}

function toggleAnimation() {
  const animateButton = document.getElementById('animateButton');
  const buttonText = animateButton.innerText;

  if (buttonText === 'Animate it') {
    if (pointsCount >= maxPoints - iterationCount) {
        restart()
    }
    startAnimation();
  } else {
    stopAnimation();
  }
}

function startAnimation() {
  const animateButton = document.getElementById('animateButton');
  animateButton.innerText = 'Stop';
  animateButton.style.backgroundColor = '#FF1D27';

  isAnimating = true;
  animate();
}

function stopAnimation() {
  const animateButton = document.getElementById('animateButton');
  animateButton.innerText = 'Animate it';
  animateButton.style.backgroundColor = '#007AFF';

  isAnimating = false;
  cancelAnimationFrame(animationId);
}

function animate() {
  if (pointsCount < maxPoints && isAnimating) {
    serpinsky(iterationCount);
    iterationCount *= multiplier;
    animationId = requestAnimationFrame(animate);
  } else {
    stopAnimation();
    console.log('animation stopped');
  }
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

  let newPoint = new ColorPoint(Math.random(), Math.random(), 'white');

  for (let i = 0; i < iterationCount; i++) {
    const targetPoint = refPoints[Math.floor(Math.random() * 8)];
    newPoint.x += (targetPoint.x - newPoint.x) * scaleFactor;
    newPoint.y += (targetPoint.y - newPoint.y) * scaleFactor;

    const canvasX = Math.round(newPoint.x * canvas.width);
    const canvasY = Math.round(newPoint.y * canvas.height);
    putPoint(ctx, canvasX, canvasY, targetPoint.color);
  }

  pointsCount += iterationCount;
}
