export type Point = {
    [0]: number;
    [1]: number;
    [Symbol.iterator]: () => IterableIterator<number>;
};

export class Vec implements Point {
    public [0]: number;
    public [1]: number;

    public get x(): number {
        return this[0];
    }

    public set x(x: number) {
        this[0] = x;
    }

    public get y(): number {
        return this[1];
    }

    public set y(y: number) {
        this[1] = y;
    }

    [Symbol.iterator]() {
        return [this[0], this[1]][Symbol.iterator]();
    }

    constructor(...args: [number, number] | [Point | { x: number; y: number }]) {
        if (args.length === 1) {
            if ('x' in args[0]) {
                this[0] = args[0].x;
                this[1] = args[0].y;
            } else {
                this[0] = args[0][0];
                this[1] = args[0][1];
            }
        } else {
            this[0] = args[0];
            this[1] = args[1];
        }
    }

    public add(vec: Vec): Vec {
        return new Vec(this[0] + vec[0], this[1] + vec[1]);
    }

    public sub(vec: Vec): Vec {
        return new Vec(this[0] - vec[0], this[1] - vec[1]);
    }

    public mul(val: Vec | number): Vec {
        if (typeof val === "number") {
            return new Vec(this[0] * val, this[1] * val);
        }
        return new Vec(this[0] * val[0], this[1] * val[1]);
    }

    public div(val: Vec | number): Vec {
        if (typeof val === "number") {
            return new Vec(this[0] / val, this[1] / val);
        }
        return new Vec(this[0] / val[0], this[1] / val[1]);
    }

    public length(): number {
        return Math.sqrt(this.lengthSq());
    }

    public lengthSq(): number {
        return this[0] ** 2 + this[1] ** 2;
    }

    public normalize(): Vec {
        return this.div(this.length());
    }

    public limit(max: number): Vec {
        if (this.lengthSq() > max ** 2) {
            return this.normalize().mul(max);
        }
        return this;
    }

    public angle(): number {
        return Math.atan2(this[1], this[0]);
    }

    public rotate(angle: number): Vec {
        const newHeading = this.angle() + angle;
        const mag = this.length();
        return new Vec(Math.cos(newHeading) * mag, Math.sin(newHeading) * mag);
    }

    public lerp(vec: Vec, amount: number): Vec {
        return new Vec(this[0] + (vec[0] - this[0]) * amount, this[1] + (vec[1] - this[1]) * amount);
    }

    public dist(vec: Vec): number {
        return Math.sqrt(this.distSq(vec));
    }

    public distSq(vec: Vec): number {
        return (this[0] - vec[0]) ** 2 + (this[1] - vec[1]) ** 2;
    }

    public dot(vec: Vec): number {
        return this[0] * vec[0] + this[1] * vec[1];
    }

    public angleTo(vec: Vec): number {
        return this.sub(vec).angle();
    }

    public copy(): Vec {
        return new Vec(this[0], this[1]);
    }

    public equals(vec: Vec): boolean {
        return this[0] === vec[0] && this[1] === vec[1];
    }

    public static fromAngle(angle: number, length: number = 1): Vec {
        return new Vec(Math.cos(angle) * length, Math.sin(angle) * length);
    }

    public static fromPoints(p1: Point, p2: Point): Vec {
        return new Vec(p2[0] - p1[0], p2[1] - p1[1]);
    }
}