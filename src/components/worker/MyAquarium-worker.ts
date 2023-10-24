import { DEG_TO_RAD, randomRange, wrapNumber, wrapAngle, angleDistance, clamp, lerp, RAD_TO_DEG } from "./utils/MathUtils.js";
import { Point, Vec } from "./utils/VecUtils.js";

type DrawParams = {
    color: string;
    ctx: OffscreenCanvasRenderingContext2D;
    neon: boolean;
};

type PointerState = [
    pos: Point,
    clickState: PointerClickState
];

const FISH_SVG_PATH = new Path2D(`M12,20L12.76,17C9.5,16.79 6.59,15.4 5.75,13.58C5.66,14.06 5.53,14.5 5.33,14.83C4.67,16 3.33,16 2,16C3.1,16 3.5,14.43 3.5,12.5C3.5,10.57 3.1,9 2,9C3.33,9 4.67,9 5.33,10.17C5.53,10.5 5.66,10.94 5.75,11.42C6.4,10 8.32,8.85 10.66,8.32L9,5C11,5 13,5 14.33,5.67C15.46,6.23 16.11,7.27 16.69,8.38C19.61,9.08 22,10.66 22,12.5C22,14.38 19.5,16 16.5,16.66C15.67,17.76 14.86,18.78 14.17,19.33C13.33,20 12.67,20 12,20M17,11A1,1 0 0,0 16,12A1,1 0 0,0 17,13A1,1 0 0,0 18,12A1,1 0 0,0 17,11Z`);

enum PointerClickState {
    NONE,
    CLICKED,
    HELD
}

/**
 * An interface that can update and render
 */
interface UpdateAndRender {
    update(canvasSize: Point, delta: number, pointers: PointerState[]): void;
    draw(params: DrawParams): void;
}

/**
 * A base class for all fish.
 */
abstract class BaseFish implements UpdateAndRender {
    abstract getPosition(): Point;
    abstract getRotation(): number;
    abstract getSize(): number;

    /**
     * Updates the fish.
     * @param canvasSize The size of the canvas. 
     * @param delta The time since the last update in milliseconds.
     * @param pointers The pointers on the canvas and their click state.
     */
    abstract update(canvasSize: Point, delta: number, pointers: PointerState[]): void;

    /**
     * Draws the fish to the canvas.
     * @param ctx The canvas context to draw to.
     * @param element The element to get the color from (if 'color' is a variable)
     */
    draw(params: DrawParams) {
        const [x, y] = this.getPosition();
        const rotation = this.getRotation();
        const size = this.getSize();

        const { color, ctx, neon } = params;

        ctx.save();
        ctx.translate(x, y);
        ctx.scale(size, size);
        ctx.rotate(rotation * DEG_TO_RAD);
        ctx.translate(-12, -12);

        if (neon) {
            ctx.fillStyle = "#242424"; // TODO: Make this customizable.
            ctx.strokeStyle = color;
            ctx.lineWidth = 3 / size;

            ctx.fill(FISH_SVG_PATH);
            ctx.stroke(FISH_SVG_PATH);
        } else {
            ctx.fillStyle = color;
            ctx.fill(FISH_SVG_PATH);
        }
        ctx.restore();
    }
}


/**
 * Standard fish implementation.
 */
class Fish extends BaseFish {
    protected position: Vec = new Vec(0, 0);
    protected rotation: number = 0;
    protected size: number = 3;
    protected speed: number = 0.1;
    protected turnSpeed: number = 0;
    protected maxTurnSpeed: number = 30;
    protected turnAccel: number = 30;
    protected turnTo: number = 0;

    protected normalSpeed: number = 0.1;
    protected normalMaxTurnSpeed: number = 30;
    protected normalTurnAccel: number = 30;

    protected runAwayDistance: number = 300;
    protected runAwaySpeed: number = 0.3;
    protected runAwayMaxTurnSpeed: number = 360;
    protected runAwayTurnAccel: number = 1020;
    protected runAwayFrom: Vec = new Vec(0, 0);
    protected runAwayTime: number = 0;
    protected runAwayDuration: number = 5000;

    protected passedTurnTo: boolean = false;
    constructor(
        canvasSize: Point
    ) {
        super();
        this.position.x = randomRange(0, canvasSize[0]);
        this.position.y = randomRange(0, canvasSize[1]);
        this.turnSpeed = randomRange(-this.maxTurnSpeed, this.maxTurnSpeed);
    }

    getPosition(): Point {
        return this.position;
    }

    getRotation(): number {
        return this.rotation;
    }

    getSize(): number {
        return this.size;
    }

    move(speed: number, canvasSize: Point) {
        this.position = this.position.add(Vec.fromAngle(this.rotation * DEG_TO_RAD, speed));

        this.position.x = wrapNumber(this.position.x, -this.size * 12, canvasSize[0] + this.size * 12);
        this.position.y = wrapNumber(this.position.y, -this.size * 12, canvasSize[1] + this.size * 12);
    }

    rotateTo(angle: number, speed: number) {
        const diff = wrapAngle(angle - this.rotation);
        const absDiff = Math.abs(diff);
        const sign = Math.sign(diff);
        const rotation = Math.min(absDiff, speed) * sign;
        this.rotation += rotation;
        this.rotation = wrapAngle(this.rotation);
    }

    rotate(angle: number) {
        this.rotation += angle;
        this.rotation = wrapAngle(this.rotation);
    }

    /**
     * Rotates the fish to the turnTo angle and moves it forward.
     * @param canvasSize Size of the canvas.
     * @param delta Time since the last update in milliseconds.
     */
    rotateAndMove(canvasSize: Point, delta: number) {
        const deltaSeconds = delta / 1000;

        // We want to rotate to the turnTo angle, but we want to do so in a
        // smooth way, like a sine wave.

        const diff = angleDistance(this.rotation, this.turnTo);

        if (diff > 0) {
            this.turnSpeed += this.turnAccel * deltaSeconds;
        } else {
            this.turnSpeed -= this.turnAccel * deltaSeconds;
        }

        this.turnSpeed = clamp(this.turnSpeed, -this.maxTurnSpeed, this.maxTurnSpeed);

        const sign = Math.sign(diff);

        this.rotate(this.turnSpeed * deltaSeconds);

        // If the previous sign is different from the current sign, we've passed
        // the turnTo angle.
        this.passedTurnTo = sign != Math.sign(angleDistance(this.rotation, this.turnTo));

        this.move(this.speed * delta, canvasSize);
    }

    update(canvasSize: Point, delta: number, pointers: PointerState[]): void {
        for (const pointer of pointers) {
            const [pointerPos, clickState] = pointer;
            // console.log(clickState);
            if (clickState == PointerClickState.CLICKED) {
                // See if the pointer is close enough to the fish to run away
                if (Vec.fromPoints(this.position, pointerPos).lengthSq() < this.runAwayDistance * this.runAwayDistance) {
                    this.runAwayFrom = new Vec(pointerPos);
                    this.runAwayTime = this.runAwayDuration;
                }
            }
        }

        // Run away
        if (this.runAwayTime > 0) {
            this.runAwayTime -= delta;
            this.speed = this.runAwaySpeed;
            this.maxTurnSpeed = this.runAwayMaxTurnSpeed;
            this.turnAccel = this.runAwayTurnAccel;

            if (this.runAwayTime < this.runAwayDuration / 2) {
                const t = Math.max(0, this.runAwayTime / this.runAwayDuration * 2);
                this.speed = lerp(this.normalSpeed, this.runAwaySpeed, t);
                this.maxTurnSpeed = lerp(this.normalMaxTurnSpeed, this.runAwayMaxTurnSpeed, t);
                this.turnAccel = lerp(this.normalTurnAccel, this.runAwayTurnAccel, t);
            }
        }

        this.rotateAndMove(canvasSize, delta);

        if (this.runAwayTime > 0) {
            this.turnTo = wrapAngle(this.position.angleTo(this.runAwayFrom) * RAD_TO_DEG + 180);
        }
    }

    // override draw(ctx: CanvasRenderingContext2D, element: HTMLElement): void {
    //     super.draw(ctx, element);

    //     if (this.runAwayTime > 0) {
    //         ctx.strokeStyle = "red";
    //         ctx.beginPath();
    //         ctx.moveTo(this.position.x, this.position.y);
    //         ctx.lineTo(this.runAwayFrom.x, this.runAwayFrom.y);
    //         ctx.stroke();
    //     }
    // }
}

/**
 * Basic fish that swims around and runs away if the mouse clicks on it.
 * Also randomly decides to run away for no apparent reason.
 * Loops around the canvas.
 */
class BasicFish extends Fish {
    protected normalTurnTo: number = 0;
    protected normalTurnToRange: number = 15;

    protected randomRunAwayDuration: number = 5000;
    protected randomRunAwayTime: number = 0; // time until next random run away
    protected randomRunAwayInterval: number = 120000; // time between random run aways
    protected randomRunAwayIntervalRange: number = 60000; // range of time between random run aways

    protected passedTurnTo: boolean = false;
    constructor(
        canvasSize: Point
    ) {
        super(canvasSize);
        this.normalTurnTo = Math.random() * 360 - 180;
        this.rotation = Math.random() * 360 - 180;
        this.turnTo = this.normalTurnTo + (Math.random() > 0.5 ? 1 : -1) * this.normalTurnToRange;

        this.randomRunAwayTime = Math.random() * this.randomRunAwayInterval;
    }

    update(canvasSize: Point, delta: number, pointers: PointerState[]): void {
        super.update(canvasSize, delta, pointers);

        if (this.runAwayTime <= 0) {
            this.randomRunAwayTime -= delta;
        }
        if (this.randomRunAwayTime < 0) {
            this.runAwayTime = this.randomRunAwayDuration;
            this.runAwayFrom = new Vec(this.position);

            this.randomRunAwayTime = this.randomRunAwayInterval + Math.random() * this.randomRunAwayIntervalRange;
        }

        if (this.passedTurnTo) {
            // If we're not running away, rotate to the normal turnTo angle
            const dist = angleDistance(this.rotation, this.turnTo);

            if (dist < 0) {
                this.turnTo = this.normalTurnTo + this.normalTurnToRange;
            } else {
                this.turnTo = this.normalTurnTo - this.normalTurnToRange;
            }
        }
    }
}

/**
 * Mini fish that is part of a school.
 */
class MiniFish extends Fish {
    protected offset: Vec;
    protected farSpeed = 0.15;
    protected closeSpeed = 0.07;
    protected farDistance = 750;
    protected closeDistance = 50;
    constructor(
        canvasSize: Point,
        public school: School,
    ) {
        super(canvasSize);
        this.size = 1;

        this.maxTurnSpeed = this.normalMaxTurnSpeed = 40;
        this.turnAccel = this.normalTurnAccel = 90;

        this.runAwaySpeed = 0.2;
        this.runAwayMaxTurnSpeed = 500;
        this.runAwayTurnAccel = 3000;

        this.offset = Vec.fromAngle(Math.random() * 360 * DEG_TO_RAD).mul(Math.random() * 70 + 35);
        this.position = school.position.add(this.offset).sub(Vec.fromAngle(school.rotation * DEG_TO_RAD).mul(100));

        this.rotation = wrapAngle(school.rotation + Math.random() * 60 - 30);
    }

    override update(canvasSize: Point, delta: number, pointers: PointerState[]): void {
        super.update(canvasSize, delta, pointers);

        if (this.runAwayTime <= 0) {
            // Determine which is the shortest path to the school

            let pos = this.school.position.add(this.offset);

            let target = pos;
            let targetDist = this.position.distSq(target);

            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    const test = pos.add([x * canvasSize[0], y * canvasSize[1]]);

                    const dist = this.position.distSq(test);

                    if (dist < targetDist) {
                        target = test;
                        targetDist = dist;
                    }
                }
            }

            this.turnTo = wrapAngle(this.position.angleTo(target) * RAD_TO_DEG);

            const dist = this.position.distSq(target);

            // Set the speed based on how far away we are
            this.speed = clamp(
                lerp(this.closeSpeed, this.farSpeed, dist / (this.farDistance * this.farDistance)),
                this.closeSpeed,
                this.farSpeed,
            );
        }
    }

    // override draw(ctx: CanvasRenderingContext2D, element: HTMLElement): void {
    //     super.draw(ctx, element);

    //     const pos = this.school.position.add(this.offset);

    //     ctx.fillStyle = "green";
    //     ctx.beginPath();
    //     ctx.arc(pos.x, pos.y, 3, 0, Math.PI * 2);
    //     ctx.fill();
    // }
}

/**
 * A school of fish.
 */
class School implements UpdateAndRender {
    public fish: MiniFish[] = [];
    public speed: number = 0.07;
    public position: Vec;
    public rotation: number = 0;
    public rotationChange: number = 30;

    constructor(
        public size: number,
        canvasSize: Point,
    ) {
        this.position = Vec.random(canvasSize);
        this.rotation = Math.random() * 360 - 180;
        this.rotationChange = (Math.random() - 0.5) ** 3 * 50;

        for (let i = 0; i < size; i++) {
            this.fish.push(new MiniFish(canvasSize, this));
        }
    }

    draw(params: DrawParams): void {
        for (const fish of this.fish) {
            fish.draw(params);
        }

        // ctx.fillStyle = "red";
        // ctx.beginPath();
        // ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
        // ctx.fill();
    }

    update(canvasSize: Point, delta: number, pointers: PointerState[]): void {
        const deltaSeconds = delta / 1000;

        for (const fish of this.fish) {
            fish.update(canvasSize, delta, pointers);
        }

        this.position = this.position.add(Vec.fromAngle(this.rotation * DEG_TO_RAD).mul(this.speed * delta));
        this.position.x = wrapNumber(this.position.x, 0, canvasSize[0]);
        this.position.y = wrapNumber(this.position.y, 0, canvasSize[1]);

        // Update the rotation
        this.rotation += this.rotationChange * deltaSeconds;
        this.rotation = wrapAngle(this.rotation);

        if (Math.abs(this.rotationChange) > 0.5) {
            this.rotationChange -= this.rotationChange * 0.1 * deltaSeconds;
        } else {
            this.rotationChange = (Math.random() - 0.5) * 50;
        }
        // console.log(this.rotationChange);
    }
}

class Aquarium {
    public fish: Fish[] = [];
    public schools: School[] = [];
    public neon: boolean = false;
    public color: string = "#000000";
    public ctx: OffscreenCanvasRenderingContext2D | null = null;
    public pointerStates: PointerState[] = [];
    constructor(
        public canvasSize: Point,
    ) {
        for (let i = 0; i < 10; i++) {
            this.fish.push(new BasicFish(canvasSize));
        }

        for (let i = 0; i < 3; i++) {
            this.schools.push(new School(10, canvasSize));
        }
    }

    draw(): void {
        if (this.ctx == null) {
            console.error("Canvas is null");
            return;
        }

        const params: DrawParams = {
            color: this.color,
            ctx: this.ctx,
            neon: this.neon,
        };

        for (const fish of this.fish) {
            fish.draw(params);
        }

        for (const school of this.schools) {
            school.draw(params);
        }
    }

    update(delta: number): void {
        for (const fish of this.fish) {
            fish.update(this.canvasSize, delta, this.pointerStates);
        }

        for (const school of this.schools) {
            school.update(this.canvasSize, delta, this.pointerStates);
        }
    }

    start() {
        let lastTime = performance.now();

        const update = () => {
            const now = performance.now();
            const delta = now - lastTime;
            lastTime = now;

            this.ctx?.clearRect(0, 0, this.canvasSize[0], this.canvasSize[1]);

            this.update(delta);
            this.draw();

            for (const pointer of this.pointerStates) {
                const [_, clickState] = pointer;
                if (clickState == PointerClickState.CLICKED) {
                    pointer[1] = PointerClickState.HELD;
                }
            }

            requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    }

    setStuff(stuff: Partial<Aquarium>) {
        Object.assign(this, stuff);

        if ("canvasSize" in stuff && this.ctx != null) {
            this.ctx.canvas.width = this.canvasSize[0];
            this.ctx.canvas.height = this.canvasSize[1];
        }
    }
}


function doStuff(e: { data: any; }, aquarium: Aquarium) {
    switch (e.data.type) {
        case "init":
            aquarium.ctx = e.data.canvas.getContext("2d")!;
            break;
        case "set":
            aquarium.setStuff(e.data.options);
            break;
        case "start":
            aquarium.start();
            break;
    }
}

if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
    // A worker

    let aquarium: Aquarium | null = null;

    onmessage = (e) => {
        if (e.data.type == "init") {
            aquarium = new Aquarium(e.data.canvasSize);
        }

        doStuff(e, aquarium);
    };
}

export class NotAWorker implements Worker {
    aquarium: Aquarium | null = null;

    onmessage: (this: Worker, ev: MessageEvent<any>) => any;
    onmessageerror: (this: Worker, ev: MessageEvent<any>) => any;
    postMessage(message: any, transfer: Transferable[]): void;
    postMessage(message: any, options?: StructuredSerializeOptions): void;
    postMessage(message: any, options?: unknown): void {
        if (message.type == "init") {
            this.aquarium = new Aquarium(message.canvasSize);
        }

        doStuff({ data: message }, this.aquarium);
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