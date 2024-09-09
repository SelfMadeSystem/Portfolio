import type { Animal } from './animal';
import { Seaweed } from './seaweed';
import './style.css';
import { Vec2 } from './vec2';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasSize = new Vec2(canvas.width, canvas.height);

window.addEventListener('resize', () => {
    canvasSize.x = canvas.width = window.innerWidth;
    canvasSize.y = canvas.height = window.innerHeight;
});

const mousePos = new Vec2(0, 0);

canvas.addEventListener('mousemove', e => {
    mousePos.x = e.offsetX;
    mousePos.y = e.offsetY;
});

// const animal = new Snake(new Vec2(canvas.width / 2, canvas.height / 2), 32);
// const animals: Animal[] = new Array(10)
//   .fill(0)
//   .map(
//     () =>
//       new Fish(new Vec2(canvas.width, canvas.height).mult(Vec2.random()), random(0.05, 0.5))
//   )
//   .sort((a, b) => a.eh - b.eh);
const animals: Animal[] = [];

const t = 30;

for (let i = 0; i <= 1; i += 1 / t) {
    animals.push(new Seaweed(new Vec2(canvas.width * (i * 0.5 + 0.25), canvas.height), 0.1));
}

const prevDeltas: number[] = [];
let prevTime = performance.now();
function averageDelta() {
    return prevDeltas.reduce((acc, curr) => acc + curr, 0) / prevDeltas.length;
}

function getFps() {
    const currentTime = performance.now();
    const dt = currentTime - prevTime;
    prevDeltas.push(dt);

    if (prevDeltas.length > 10) {
        prevDeltas.shift();
    }

    prevTime = currentTime;
    return [1000 / averageDelta(), dt];
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const [fps, sdt] = getFps();
    const dt = sdt / 1000;

    for (const animal of animals) {
        animal.resolve(mousePos, dt);
        animal.display(ctx);
        // animal.debugDisplay(ctx);
    }

    ctx.fillStyle = 'white';

    ctx.font = '24px sans-serif';

    ctx.fillText(`FPS: ${fps.toFixed(2)}`, 10, 30);

    requestAnimationFrame(update);
}

update();
