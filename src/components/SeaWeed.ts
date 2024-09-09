import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { isNeon } from '../theme';
import { getColor } from '../utils/ColorUtils';
import type { Animal } from '../utils/anim/animal';
import { Seaweed } from '../utils/anim/seaweed';
import { Vec2 } from '../utils/anim/vec2';

/**
 * An animated sea weed using procedural animation.
 *
 * Based on https://github.com/SelfMadeSystem/procedural-animation
 *
 * Read more on that github repo if you want to know more.
 */
@customElement('sea-weed')
export class SeaWeed extends LitElement {
    @property({ type: String })
    color: string = 'blue';

    animationFrame: number = 0;

    connectedCallback() {
        super.connectedCallback();
        // Don't draw if disable animations is set
        if (localStorage.getItem('disable-animations') == 'true') {
            return;
        }

        requestAnimationFrame(() => {
            this.startDraw();
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        cancelAnimationFrame(this.animationFrame);
    }

    startDraw() {
        if (this.shadowRoot == null) {
            console.error('Shadow root is null');
            return;
        }

        const canvas = this.shadowRoot.querySelector('canvas')!;
        const ctx = canvas.getContext('2d')!;

        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        const canvasSize = new Vec2(canvas.width, canvas.height);

        new ResizeObserver(() => {
            canvasSize.x = canvas.width = canvas.clientWidth;
            canvasSize.y = canvas.height = canvas.clientHeight;
        }).observe(canvas);

        const mousePos = new Vec2(0, 0);

        window.addEventListener('mousemove', e => {
            mousePos.x = e.clientX;
            mousePos.y = e.clientY;
        });

        const t = 30;
        const animals: Animal[] = new Array(t)
            .fill(0)
            .map((_, i) => new Seaweed(new Vec2(canvas.width * ((i / t) * 0.9 + 0.05), canvas.height), 0.1));

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

        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const [_fps, sdt] = getFps();
            const dt = sdt / 1000;

            const neon = isNeon();
            const color = getColor(this.color, this);
            for (const animal of animals) {
                animal.resolve(mousePos, dt);
                animal.display(ctx, neon ? color : undefined, neon ? '#242424' : color);
            }
            // ctx.fillStyle = 'white';

            // ctx.font = '24px sans-serif';

            // ctx.fillText(`FPS: ${fps.toFixed(2)}`, 10, 30);

            this.animationFrame = requestAnimationFrame(update);
        };

        update();
    }

    render() {
        return html`<canvas></canvas>`;
    }

    static styles = css`
        :host {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            min-height: 10rem;
            isolation: isolate;
            pointer-events: none;
        }

        canvas {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'sea-weed': SeaWeed;
    }
}