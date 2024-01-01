let pointsCount;
let iterationCount;
let animationId;
let multiplier = 1.001;
let isAnimating = false;
let maxPoints = 2500000;
const scaleFactor = 2 / 3;

function setValuesToDefault() {
  pointsCount = 0;
  iterationCount = 100;
  console.log('Points count: ', 0);
}

function toggleAccordion() {
  var accordionBtn = document.querySelector('.accordion');
  accordionBtn.addEventListener('click', function() {
      var panel = document.querySelector('.panel');
      panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
  });
}

function initialize() {
    setValuesToDefault();
    toggleAccordion();
}