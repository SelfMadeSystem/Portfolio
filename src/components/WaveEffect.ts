import { loop, randomRange } from "../utils/MathUtils.js";
import { customElement, property } from 'lit/decorators.js';
import { LitElement, css, html } from "lit";
import { getColor } from "../utils/ColorUtils.js";

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
        let _redraw = () => {};

        const canvas = this.shadowRoot.querySelector("canvas")!;
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

            ctx.clearRect(0, 0, width, height);

            ctx.save();

            const paths = [];

            ctx.fillStyle = getColor(fillStyle, this);
            ctx.globalAlpha = this.opacity;

            for (const wave of waves) {
                const { width: ww } = wave;
                const w = (this.waveWidthInRelationToHeight ? height : width) * ww;
                const w1 = w * this.pointiness;

                const h = height * wh;

                const path = new Path2D();
                const heightOffset = wave.height * (height - h);
                let o =
                    loop(0, w * 2, (date / 1000) * wave.speed * w) -
                    w * 2 -
                    w * wave.offset;

                path.moveTo(o, height);

                path.lineTo(o, height - heightOffset);

                while (o < width) {
                    path.bezierCurveTo(
                        w1 + o,
                        height - heightOffset,
                        w - w1 + o,
                        height - h - heightOffset,
                        w + o,
                        height - h - heightOffset
                    );
                    path.bezierCurveTo(
                        w + w1 + o,
                        height - h - heightOffset,
                        2 * w - w1 + o,
                        height - heightOffset,
                        2 * w + o,
                        height - heightOffset
                    );
                    o += w * 2;
                }

                path.lineTo(o, height);

                ctx.fill(path);

                paths.push(path);
            }

            paths.forEach((p) => ctx.clip(p));

            ctx.globalAlpha = 1;
            ctx.fillRect(0, 0, width, height);

            ctx.restore();
        }
    }

    render() {
        return html`<canvas></canvas>`;
    }

    static styles = css`
        :host {
            display: flex;
            width: 100%;
            height: 100%;
        }

        canvas {
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
