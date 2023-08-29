import { customElement, property } from 'lit/decorators.js';
import { LitElement, css } from "lit";
import { getColor } from "../utils/ColorUtils.js";
import { Point } from "../utils/VecUtils.js";
import { isNeon } from "../theme.js";
import { getCanvas } from "../utils/CanvasUtils.js";
import { NotAWorker } from "./worker/WaveEffect-worker";

enum PointerClickState {
    NONE,
    CLICKED,
    HELD
}

type PointerState = [
    pos: Point,
    clickState: PointerClickState
];

/**
 * The aquarium that contains all the fish.
 */
@customElement('my-aquarium')
export class MyAquarium extends LitElement {
    @property({ type: String })
    color: string = "blue";

    @property({ type: String })
    maskId: string | null = null;

    @property({ type: Boolean })
    maskTop: boolean = false;

    @property({ type: Boolean })
    maskInverse: boolean = false;

    @property({ type: Boolean })
    flipMaskX: boolean = false;

    @property({ type: Boolean })
    flipMaskY: boolean = false;

    animationFrame: number = 0;

    worker: Worker | null = null;

    async connectedCallback() {
        super.connectedCallback();

        const canvasEl = document.createElement("canvas");
        this.shadowRoot!.append(canvasEl);

        const canvas = getCanvas(canvasEl); // canvas to pass to worker

        if (canvas instanceof HTMLCanvasElement) {
            this.worker = new NotAWorker();
        } else {
            this.worker = new Worker(new URL("./worker/MyAquarium-worker.ts", import.meta.url), {
                type: "module"
            });
        }

        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

        let prevColor = getColor(this.color, this);
        let prevNeon = isNeon();
        let canvasSize = [canvasEl.clientWidth, canvasEl.clientHeight];

        canvas.width = canvasSize[0];
        canvas.height = canvasSize[1];

        this.worker.postMessage({
            type: "init",
            canvas,
            canvasSize,
        }, [canvas as any]);

        this.worker.postMessage({
            type: "set",
            options: {
                color: prevColor,
                neon: prevNeon,
            }
        });

        const updateThings = () => {
            const color = getColor(this.color, this);
            const neon = isNeon();
            if (color != prevColor || neon != prevNeon) {
                prevColor = color;
                prevNeon = neon;
                this.worker?.postMessage({
                    type: "set",
                    options: {
                        color,
                        neon,
                    }
                });
            }
            
            const size = [canvasEl.clientWidth, canvasEl.clientHeight];

            if (size[0] != canvasSize[0] || size[1] != canvasSize[1]) {
                canvasSize = size;
                this.worker?.postMessage({
                    type: "set",
                    options: {
                        canvasSize,
                    }
                });
            }

            requestAnimationFrame(updateThings);
        };

        updateThings();


        const pointerStates: Map<number, PointerState> = new Map();

        const setPointerState = (e: PointerEvent, state: PointerClickState) => {
            pointerStates.set(e.pointerId, [pointerToLocal(e), state]);
            this.worker?.postMessage({
                type: "set",
                options: {
                    pointerStates: [...pointerStates.values()]
                }
            });
        };

        const pointerToLocal = (e: PointerEvent): Point => {
            const rect = canvasEl.getBoundingClientRect();
            return [e.clientX - rect.left, e.clientY - rect.top];
        };

        const pointerDown = (e: PointerEvent) => {
            setPointerState(e, PointerClickState.CLICKED);
        };

        // const pointerMove = (e: PointerEvent) => {
        //     const current = pointerStates.get(e.pointerId);
        //     if (current != null) {
        //         setPointerState(e, current[1]);
        //     } else {
        //         setPointerState(e, PointerClickState.NONE);
        //     }
        // };

        const pointerUp = (e: PointerEvent) => {
            setPointerState(e, PointerClickState.NONE);
        };

        window.addEventListener("pointerdown", pointerDown);
        // window.addEventListener("pointermove", pointerMove); // upon careful consideration, this is not needed
        window.addEventListener("pointerup", pointerUp);

        this.worker.postMessage({
            type: "start",
        });
    };

    // disconnectedCallback() {
    //     super.disconnectedCallback();
    //     cancelAnimationFrame(this.animationFrame);
    // }

    /* startDraw() {
        if (this.shadowRoot == null) {
            console.error("Shadow root is null");
            return;
        }

        const canvasEl = this.shadowRoot.querySelector("canvas")!;
        const canvas = getCanvas(canvasEl);
        const ctx = canvas.getContext("2d")!;

        const tempCanvas = createCanvas();
        const tempCtx = tempCanvas.getContext("2d")!;

        let width = 0;
        let height = 0;

        function setCanvasSize() {
            width = tempCanvas.width = canvas.width = canvasEl.clientWidth;
            height = tempCanvas.height = canvas.height = canvasEl.clientHeight;
        }

        setCanvasSize();

        new ResizeObserver(setCanvasSize).observe(canvasEl);

        const mask: HTMLCanvasElement | null = (() => {
            // return null;
            const mask = document.getElementById(this.maskId ?? "") as HTMLCanvasElement | MyWave | null;

            if (mask == null) {
                return null;
            }

            if (mask instanceof MyWave) {
                return mask.canvas;
            }

            return mask;
        })();

        const ctxToUse = mask == null ? ctx : tempCtx;

        const fishies: UpdateAndRender[] = [];

        for (let i = 0; i < 5; i++) {
            fishies.push(new School(15, this.color, [width, height]));
        }

        for (let i = 0; i < 20; i++) {
            fishies.push(new BasicFish(this.color, [width, height]));
        }

        const pointerStates: Map<number, PointerState> = new Map();

        let lastTime = performance.now();

        const redraw = () => {
            const now = performance.now();
            let delta = now - lastTime;

            if (delta > 32) {
                delta = 32; // Cap delta at 32ms. This prevents the fish from moving too fast when the tab is in the background.
            }
            lastTime = now;

            ctxToUse.clearRect(0, 0, width, height);

            for (const fish of fishies) {
                fish.update([width, height], delta, [...pointerStates.values()]);
            }


            for (const fish of fishies) {
                fish.draw(ctxToUse, this);
            }

            for (const [_, pointer] of pointerStates) {
                const [_pos, clickState] = pointer;
                if (clickState == PointerClickState.CLICKED) {
                    pointer[1] = PointerClickState.HELD;
                }
                // TODO: Ripple effect ???
            }

            if (mask != null) {
                ctx.clearRect(0, 0, width, height);

                ctx.save();

                if (this.maskTop) {
                    // todo
                } else { // Bottom
                    ctx.save();
                    ctx.translate(0, height - mask.height);
                    if (this.flipMaskX) {
                        ctx.translate(width, 0);
                        ctx.scale(-1, 1);
                    }
                    if (this.flipMaskY) {
                        ctx.translate(0, mask.height);
                        ctx.scale(1, -1);
                    }
                    ctx.drawImage(mask, 0, 0);
                    ctx.restore();

                    if (!this.maskInverse) { // paint the rest of the screen
                        ctx.fillStyle = "white";
                        if (this.maskTop) {
                            ctx.fillRect(0, mask.height, width, height - mask.height);
                        } else {
                            ctx.fillRect(0, 0, width, height - mask.height);
                        }
                    }
                }

                ctx.globalCompositeOperation = this.maskInverse ? "source-out" : "source-in";
                ctx.drawImage(tempCanvas, 0, 0, width, height);
                ctx.restore();
            }

            // For now, just have a gradient at the bottom of the screen
            // so that the fish don't just disappear.
            // const gradient = ctx.createLinearGradient(0, height - 100, 0, height);
            // gradient.addColorStop(0, "#fff0");
            // gradient.addColorStop(1, getColor(this.bgColor, canvas));
            // ctx.fillStyle = gradient;
            // ctx.fillRect(0, height - 100, width, 100);

            this.animationFrame = requestAnimationFrame(redraw);
        };
        redraw();

        const pointerToLocal = (e: PointerEvent): Point => {
            const rect = canvasEl.getBoundingClientRect();
            return [e.clientX - rect.left, e.clientY - rect.top];
        };

        const pointerDown = (e: PointerEvent) => {
            pointerStates.set(e.pointerId, [pointerToLocal(e), PointerClickState.CLICKED]);
        };

        const pointerMove = (e: PointerEvent) => {
            const current = pointerStates.get(e.pointerId);
            if (current != null) {
                current[0] = pointerToLocal(e);
            } else {
                pointerStates.set(e.pointerId, [pointerToLocal(e), PointerClickState.NONE]);
            }
        };

        const pointerUp = (e: PointerEvent) => {
            pointerStates.set(e.pointerId, [pointerToLocal(e), PointerClickState.NONE]);
        };

        window.addEventListener("pointerdown", pointerDown);
        window.addEventListener("pointermove", pointerMove);
        window.addEventListener("pointerup", pointerUp);
    } */

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
        'my-aquarium': MyAquarium;
    }
}