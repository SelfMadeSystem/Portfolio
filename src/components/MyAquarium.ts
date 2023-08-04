import { DEG_TO_RAD, RAD_TO_DEG, angleDistance, clamp, lerp, randomRange, wrapAngle, wrapNumber } from "../utils/MathUtils.js";
import { customElement, property } from 'lit/decorators.js';
import { LitElement, css, html } from "lit";
import { getColor } from "../utils/ColorUtils.js";
import { Point, Vec } from "../utils/VecUtils.js";

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
    update(canvasSize: Point, delta: number, pointers: [Point, PointerClickState][]): void;
    draw(ctx: CanvasRenderingContext2D, element: HTMLElement): void;
}

/**
 * A base class for all fish.
 */
abstract class BaseFish implements UpdateAndRender {
    abstract getPosition(): Point;
    abstract getRotation(): number;
    abstract getSize(): number;
    abstract getColor(): string;

    /**
     * Updates the fish.
     * @param canvasSize The size of the canvas. 
     * @param delta The time since the last update in milliseconds.
     * @param pointers The pointers on the canvas and their click state.
     */
    abstract update(canvasSize: Point, delta: number, pointers: [Point, PointerClickState][]): void;

    /**
     * Draws the fish to the canvas.
     * @param ctx The canvas context to draw to.
     * @param element The element to get the color from (if 'color' is a variable)
     */
    draw(ctx: CanvasRenderingContext2D, element: HTMLElement) {
        const [x, y] = this.getPosition();
        const rotation = this.getRotation();
        const size = this.getSize();
        const color = this.getColor();

        ctx.save();
        ctx.translate(x, y);
        ctx.scale(size, size);
        ctx.rotate(rotation * DEG_TO_RAD);
        ctx.translate(-12, -12);
        ctx.fillStyle = getColor(color, element);
        ctx.fill(FISH_SVG_PATH);
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
    protected runAwayTurnAccel: number = 360;
    protected runAwayFrom: Vec = new Vec(0, 0);
    protected runAwayTime: number = 0;
    protected runAwayDuration: number = 5000;

    protected passedTurnTo: boolean = false;
    constructor(
        protected color: string,
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

    getColor(): string {
        return this.color;
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

    update(canvasSize: Point, delta: number, pointers: [Point, PointerClickState][]): void {
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
 * Loops around the canvas.
 */
class BasicFish extends Fish {
    protected normalTurnTo: number = 0;
    protected normalTurnToRange: number = 15;

    protected passedTurnTo: boolean = false;
    constructor(
        color: string,
        canvasSize: Point
    ) {
        super(color, canvasSize);
        this.normalTurnTo = Math.random() > 0.5 ? 0 : 180;
        this.rotation = wrapAngle(randomRange(-this.normalTurnToRange, this.normalTurnToRange) + this.normalTurnTo);
        this.turnTo = this.normalTurnTo + (Math.random() > 0.5 ? 1 : -1) * this.normalTurnToRange;
    }

    update(canvasSize: Point, delta: number, pointers: [Point, PointerClickState][]): void {
        super.update(canvasSize, delta, pointers);

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
        color: string,
        canvasSize: Point,
        public school: School,
    ) {
        super(color, canvasSize);
        this.size = 1;

        this.maxTurnSpeed = this.normalMaxTurnSpeed = 40;
        this.turnAccel = this.normalTurnAccel = 90;

        this.runAwaySpeed = 0.2;
        this.runAwayMaxTurnSpeed = 1500;
        this.runAwayTurnAccel = 1500;

        this.offset = Vec.random([200, 100]).sub([100, 50]);
        this.position = school.position.add(this.offset).sub([50, 0]);

        this.rotation = Math.random() * 40;
    }

    override update(canvasSize: Point, delta: number, pointers: [Point, PointerClickState][]): void {
        super.update(canvasSize, delta, pointers);

        if (this.runAwayTime <= 0) {
            // Determine if shortest path to the school is direct or wrapped around
            // the canvas

            const pos = this.school.position.add(this.offset);

            const dist = this.position.distSq(pos);

            if (dist > canvasSize[0] * canvasSize[0] / 4) {
                // Wrapped around the canvas
                this.turnTo = wrapAngle(this.position.angleTo(this.school.position) * RAD_TO_DEG + 180);
            } else {
                // Direct
                this.turnTo = wrapAngle(this.position.angleTo(pos) * RAD_TO_DEG);
            }

            // Set the speed based on how far away we are
            this.speed = clamp(
                lerp(this.closeSpeed, this.farSpeed, dist / (this.farDistance * this.farDistance)),
                this.closeSpeed,
                this.farSpeed,
            );

            console.log(this.speed);
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

    constructor(
        public size: number,
        color: string,
        canvasSize: Point,
    ) {
        this.position = Vec.random(canvasSize);

        for (let i = 0; i < size; i++) {
            this.fish.push(new MiniFish(color, canvasSize, this));
        }
    }

    draw(ctx: CanvasRenderingContext2D, element: HTMLElement): void {
        for (const fish of this.fish) {
            fish.draw(ctx, element);
        }
        
        // ctx.fillStyle = "red";
        // ctx.beginPath();
        // ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
        // ctx.fill();
    }

    update(canvasSize: Point, delta: number, pointers: [Point, PointerClickState][]): void {
        for (const fish of this.fish) {
            fish.update(canvasSize, delta, pointers);
        }

        this.position.x += this.speed * delta;
        this.position.x = wrapNumber(this.position.x, 0, canvasSize[0]);
    }
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

    animationFrame: number = 0;

    connectedCallback() {
        super.connectedCallback();
        requestAnimationFrame(this.startDraw.bind(this));
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        cancelAnimationFrame(this.animationFrame);
    }

    startDraw() {
        if (this.shadowRoot == null) {
            console.error("Shadow root is null");
            return;
        }

        const canvas = this.shadowRoot.querySelector("canvas")!;
        const ctx = canvas.getContext("2d")!;

        let width = (canvas.width = canvas.clientWidth);
        let height = (canvas.height = canvas.clientHeight);

        function setCanvasSize() {
            width = canvas.width = canvas.clientWidth;
            height = canvas.height = canvas.clientHeight;
        }

        setCanvasSize();

        new ResizeObserver(setCanvasSize).observe(canvas);

        const fishies: UpdateAndRender[] = [];

        for (let i = 0; i < 30; i++) {
            fishies.push(new BasicFish(this.color, [width, height]));
        }

        for (let i = 0; i < 3; i++) {
            fishies.push(new School(30, this.color, [width, height]));
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

            ctx.clearRect(0, 0, width, height);

            for (const fish of fishies) {
                fish.update([width, height], delta, [...pointerStates.values()]);
            }

            for (const fish of fishies) {
                fish.draw(ctx, this);
            }

            for (const [_, pointer] of pointerStates) {
                const [pos, clickState] = pointer;
                if (clickState == PointerClickState.CLICKED) {
                    pointer[1] = PointerClickState.HELD;
                }
                // TODO: Ripple effect ???
            }

            this.animationFrame = requestAnimationFrame(redraw);
        };
        redraw();

        const pointerToLocal = (e: PointerEvent): Point => {
            const rect = canvas.getBoundingClientRect();
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
    }

    render() {
        return html`
            <canvas></canvas>
        `;
    }

    static styles = css`
        :host {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
            min-height: 10rem;
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