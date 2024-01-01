function restart() {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setValuesToDefault();
  }

function updateSpeed(value){
  multiplier = 0.991 + 0.01*value;
  document.getElementById("speedValue").textContent = value;
}

function updateDensity(value){
  maxPoints = 500000*value;
  document.getElementById("densityValue").textContent = value;
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
    }
  }