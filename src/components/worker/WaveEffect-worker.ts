import { randomRange, wrapNumber, clamp } from "./utils/MathUtils";

/**
 * A wave effect.
 */
export class MyWave {
    color: string = "#000";
    amount: number = 4;
    numberOfReverse: number = 2;
    waveHeight: number = 0.9;
    waveWidth: [number, number] = [4, 10];
    waveWidthInRelationToHeight: boolean = true;
    speed: [number, number] = [1 / 2 ** 4, 1 / 2 ** 2];
    opacity: number = 0.25;
    pointiness: number = 0.3;

    neon: boolean = false;
    neonEmpty: boolean = false;
    neonClipped: boolean = false;
    neonWidth: number = 4;

    canvas: OffscreenCanvas | null = null;
    width: number = 0;
    height: number = 0;

    animationFrame: number = 0;

    start() {
        requestAnimationFrame(this.doWaveThing.bind(this));
    }

    stop() {
        cancelAnimationFrame(this.animationFrame);
    }

    doWaveThing() {
        let _redraw = () => { };

        const canvas = this.canvas;
        if (canvas == null) {
            console.error("Canvas is null");
            return;
        }
        const ctx = canvas.getContext("2d")!;

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

        const wh = randomRange(this.waveHeight);

        const animateCanvas = () => {
            redraw();

            this.animationFrame = requestAnimationFrame(animateCanvas);
        };

        this.animationFrame = requestAnimationFrame(animateCanvas);

        function redraw() {
            _redraw(); // I'm lazy.
        }

        _redraw = () => {
            const date = Date.now();

            const width = this.width;
            const height = this.height;

            const neon = this.neon;

            ctx.clearRect(0, 0, width, height);

            ctx.save();

            const paths: Path2D[] = [];

            const inversePaths: Path2D[] = [];

            let fillStyle = this.color;

            if (!neon) {
                ctx.fillStyle = fillStyle;
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
                ctx.strokeStyle = fillStyle;
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

    setStuff(options: Partial<MyWave>) {
        Object.assign(this, options);

        if ("width" in options) {
            this.canvas!.width = options.width!;
        }

        if ("height" in options) {
            this.canvas!.height = options.height!;
        }
    }
}

function doStuff(e: { data: any; }, wave: MyWave) {
    switch (e.data.type) {
        case "init": {
            wave.canvas = e.data.canvas;
            break;
        }
        case "set": {
            wave.setStuff(e.data.options);
            break;
        }
        case "start": {
            wave.start();
            break;
        }
        case "stop": {
            wave.stop();
            break;
        }
    }
}

if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
    // A worker

    const wave = new MyWave();

    onmessage = (e) => {
        doStuff(e, wave);
    };
}

export class NotAWorker implements Worker {
    wave: MyWave = new MyWave();

    onmessage: (this: Worker, ev: MessageEvent<any>) => any;
    onmessageerror: (this: Worker, ev: MessageEvent<any>) => any;
    postMessage(message: any, transfer: Transferable[]): void;
    postMessage(message: any, options?: StructuredSerializeOptions): void;
    postMessage(message: unknown, options?: unknown): void {
        doStuff({ data: message }, this.wave);
    }

    terminate(): void {
        throw new Error("Method not implemented.");
    }

    addEventListener<K extends keyof WorkerEventMap>(type: K, listener: (this: Worker, ev: WorkerEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: unknown, listener: unknown, options?: unknown): void {
        throw new Error("Method not implemented.");
    }

    removeEventListener<K extends keyof WorkerEventMap>(type: K, listener: (this: Worker, ev: WorkerEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: unknown, listener: unknown, options?: unknown): void {
        throw new Error("Method not implemented.");
    }

    dispatchEvent(event: Event): boolean {
        throw new Error("Method not implemented.");
    }
    onerror: (this: AbstractWorker, ev: ErrorEvent) => any;
}