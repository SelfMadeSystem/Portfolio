import { wrapNumber, randomRange, clamp } from "../utils/MathUtils.js";
import { customElement, property } from 'lit/decorators.js';
import { LitElement, css, html } from "lit";
import { getColor } from "../utils/ColorUtils.js";
import { isNeon } from "../theme.js";

/**
 * A wave effect.
 */
@customElement('my-wave')
export class MyWave extends LitElement {
    @property({ type: String })
    color: string = "#000";

    @property({ type: Number })
    amount: number = 4;

    @property({ type: Number })
    numberOfReverse: number = 2;

    @property({ type: Number })
    waveHeight: number = 0.9;

    @property({ type: Array })
    waveWidth: [number, number] = [4, 10];

    @property({ type: Boolean })
    waveWidthInRelationToHeight: boolean = true;

    @property({ type: Array })
    speed: [number, number] = [1 / 2 ** 4, 1 / 2 ** 2];

    @property({ type: Number })
    opacity: number = 0.25;

    @property({ type: Number })
    pointiness: number = 0.3;

    @property({ type: Boolean })
    neonEmpty: boolean = false;

    @property({ type: Boolean })
    neonClipped: boolean = false;

    @property({ type: Number })
    neonWidth: number = 4;

    canvas: HTMLCanvasElement | null = null;

    animationFrame: number = 0;

    connectedCallback() {
        super.connectedCallback();
        requestAnimationFrame(this.doWaveThing.bind(this));
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        cancelAnimationFrame(this.animationFrame);
    }

    doWaveThing() {
        if (this.shadowRoot == null) {
            console.error("Shadow root is null");
            return;
        }
        let _redraw = () => { };

        const canvas = this.canvas = this.shadowRoot.querySelector("canvas")!;
        const ctx = canvas.getContext("2d")!;

        let width = (canvas.width = canvas.clientWidth);
        let height = (canvas.height = canvas.clientHeight);

        let fillStyle = this.color;

        function setCanvasSize() {
            width = canvas.width = canvas.clientWidth;
            height = canvas.height = canvas.clientHeight;
            redraw();
        }

        setCanvasSize();

        new ResizeObserver(setCanvasSize).observe(canvas);

        const waves = new Array(this.amount)
            .fill(0)
            .map((_, i) => {
                const width = randomRange(this.waveWidth);
                return {
                    offset: Math.random() * width,
                    speed:
                        randomRange(this.speed) * (i < this.numberOfReverse ? -1 : 1),
                    width,
                    height: i / (this.amount - 1) || 0,
                };
            });

        function isOnScreen() {
            // return true;
            const rect = canvas.getBoundingClientRect();
            return (
                rect.top < window.innerHeight &&
                rect.bottom > 0 &&
                rect.left < window.innerWidth &&
                rect.right > 0
            );
        }

        const wh = randomRange(this.waveHeight);

        const animateCanvas = () => {
            if (!isOnScreen()) {
                setTimeout(() => {
                    requestAnimationFrame(animateCanvas);
                }, 60);
                return;
            }

            redraw();

            this.animationFrame = requestAnimationFrame(animateCanvas);
        };

        this.animationFrame = requestAnimationFrame(animateCanvas);

        function redraw() {
            _redraw(); // I'm lazy.
        }

        _redraw = () => {
            const date = Date.now();

            const neon = isNeon();

            ctx.clearRect(0, 0, width, height);

            ctx.save();

            const paths: Path2D[] = [];

            const inversePaths: Path2D[] = [];

            if (!neon) {
                ctx.fillStyle = getColor(fillStyle, this);
                ctx.globalAlpha = this.opacity;
            } else {
                ctx.fillStyle = "#242424";
            }

            for (const wave of waves) { // FIXME: With neon, one pixel on the top and the bottom is clipped.
                const { width: ww } = wave;
                const w = (this.waveWidthInRelationToHeight ? height : width) * ww;
                const w1 = w * this.pointiness;

                const h = height * wh;

                const path = new Path2D();

                const inversePath = new Path2D();

                const heightOffset = wave.height * (height - h);
                let o =
                    wrapNumber((date / 1000) * wave.speed * w, 0, w * 2) -
                    w * 2 -
                    w * wave.offset;

                path.moveTo(o, height);
                path.lineTo(o, height - heightOffset);

                if (neon && this.neonClipped) {
                    inversePath.moveTo(o, 0);
                    inversePath.lineTo(o, height - heightOffset);
                }

                // I could properly make the waves smaller when neon is enabled,
                // but it looks fine as it is.
                const optClamp = neon ? this.neonWidth * 0.5 : 0;

                while (o < width) {
                    const a: [number, number, number, number, number, number] = [
                        w1 + o,
                        height - heightOffset,
                        w - w1 + o,
                        height - h - heightOffset,
                        w + o,
                        clamp(height - h - heightOffset, optClamp, height - optClamp)
                    ];

                    const b: [number, number, number, number, number, number] = [
                        w + w1 + o,
                        height - h - heightOffset,
                        2 * w - w1 + o,
                        height - heightOffset,
                        2 * w + o,
                        clamp(height - heightOffset, optClamp, height - optClamp)
                    ];

                    path.bezierCurveTo(
                        ...a
                    );
                    path.bezierCurveTo(
                        ...b
                    );

                    if (this.neonClipped) {
                        inversePath.bezierCurveTo(
                            ...a
                        );
                        inversePath.bezierCurveTo(
                            ...b
                        );
                    }

                    o += w * 2;
                }

                path.lineTo(o, height);

                if (neon && this.neonClipped) {
                    inversePath.lineTo(o, 0);
                    inversePaths.push(inversePath);
                }
                if (!neon) {
                    ctx.fill(path);
                }

                paths.push(path);
            }

            if (!neon || !this.neonClipped) {
                paths.forEach((p) => ctx.clip(p));

                ctx.globalAlpha = 1;
                ctx.fillRect(0, 0, width, height);
                ctx.restore();
            }

            if (neon) {
                ctx.save();

                ctx.fillStyle = "#242424"; // TODO: Make this customizable.
                ctx.strokeStyle = getColor(fillStyle, this);
                ctx.lineWidth = this.neonWidth;

                for (let i = 0; i < paths.length; i++) {
                    const p = paths[i];
                    const ip = inversePaths[i];

                    if (!this.neonEmpty || (this.neonClipped && i === 0)) {
                        ctx.fill(p);
                    }
                    ctx.stroke(p);

                    if (this.neonClipped) {
                        ctx.clip(ip);
                    }
                }

                ctx.restore();
            }
        };
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
            pointer-events: none;
        }

        canvas {
            position: absolute;
            width: 100%;
            height: 100%;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'my-wave': MyWave;
    }
}
