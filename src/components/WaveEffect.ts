import { customElement, property } from 'lit/decorators.js';
import { LitElement, css } from "lit";
import { getCanvas } from '../utils/CanvasUtils';
import { getColor } from '../utils/ColorUtils';
import { isNeon } from '../theme';

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

    worker: Worker | null = null;

    async connectedCallback() { // TODO: despaghettify this
        super.connectedCallback();
        if (this.shadowRoot == null) {
            throw new Error("Shadow root is null");
        }

        let prevColor = getColor(this.color, this);
        let prevNeon = isNeon();

        this.canvas = document.createElement('canvas');

        this.shadowRoot.appendChild(this.canvas);

        const canvas = getCanvas(this.canvas);

        if (canvas instanceof HTMLCanvasElement) {
            const { NotAWorker } = await import('./worker/WaveEffect-worker.ts');
            this.worker = new NotAWorker();
        } else {
            this.worker = new Worker(new URL('./worker/WaveEffect-worker.ts', import.meta.url), {
                type: 'module',
            });
        }

        this.worker.postMessage({
            type: 'init',
            canvas,
        }, [canvas as any]); // as any because if it is an HTMLCanvasElement, the worker is fake and it doesn't matter

        this.worker.postMessage({
            type: 'set',
            options: {
                color: prevColor,
                amount: this.amount,
                numberOfReverse: this.numberOfReverse,
                waveHeight: this.waveHeight,
                waveWidth: this.waveWidth,
                waveWidthInRelationToHeight: this.waveWidthInRelationToHeight,
                speed: this.speed,
                opacity: this.opacity,
                pointiness: this.pointiness,
                neonEmpty: this.neonEmpty,
                neonClipped: this.neonClipped,
                neonWidth: this.neonWidth,
                neon: prevNeon,
            }
        });

        const setCanvasSize = () => {
            this.worker?.postMessage({
                type: 'set',
                options: {
                    width: this.canvas!.clientWidth,
                    height: this.canvas!.clientHeight,
                }
            });
        };

        setCanvasSize();

        new ResizeObserver(setCanvasSize).observe(this.canvas);

        this.worker.postMessage({
            type: 'start',
        });

        const updateStuff = () => {
            const color = getColor(this.color, this);
            
            if (color !== prevColor) {
                prevColor = color;
                this.worker?.postMessage({
                    type: 'set',
                    options: {
                        color,
                    }
                });
            }

            const neon = isNeon();
            if (neon !== prevNeon) {
                prevNeon = neon;
                this.worker?.postMessage({
                    type: 'set',
                    options: {
                        neon,
                    }
                });
            }

            this.animationFrame = requestAnimationFrame(updateStuff);
        };

        this.animationFrame = requestAnimationFrame(updateStuff);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.worker?.terminate();

        cancelAnimationFrame(this.animationFrame);
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
