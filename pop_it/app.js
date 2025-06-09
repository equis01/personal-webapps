if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}

const board = document.getElementById('popitBoard');
function createBubble() {
  const div = document.createElement('div');
  div.className = 'pop';
  div.addEventListener('click', () => {
    div.classList.toggle('popped');
  });
  board.appendChild(div);
}

// create an endless board
for (let i = 0; i < 100; i++) createBubble();

// Tab switching
const popitTab = document.getElementById('popitTab');
const paintTab = document.getElementById('paintTab');
const popitSection = document.getElementById('popitSection');
const paintSection = document.getElementById('paintSection');

popitTab.onclick = () => {
  popitSection.classList.add('active');
  paintSection.classList.remove('active');
};
paintTab.onclick = () => {
  paintSection.classList.add('active');
  popitSection.classList.remove('active');
};

// Coloring game
const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let color = '#000';

const palette = document.getElementById('palette');
['#000','#ff0000','#00ff00','#0000ff','#ffff00','#ff00ff','#00ffff'].forEach(c => {
  const btn = document.createElement('button');
  btn.style.background = c;
  btn.onclick = () => color = c;
  palette.appendChild(btn);
});

canvas.addEventListener('pointerdown', e => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});
canvas.addEventListener('pointermove', e => {
  if (drawing) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.stroke();
  }
});
canvas.addEventListener('pointerup', () => drawing = false);
canvas.addEventListener('pointerleave', () => drawing = false);

document.getElementById('clearCanvas').onclick = () => {
  ctx.clearRect(0,0,canvas.width,canvas.height);
};