export class Vec2 {
    constructor(
        public x: number,
        public y: number,
    ) {}

    a(): [number, number] {
        return [this.x, this.y];
    }

    clone(): Vec2 {
        return new Vec2(this.x, this.y);
    }

    add(other: Vec2): Vec2 {
        return new Vec2(this.x + other.x, this.y + other.y);
    }

    sub(other: Vec2): Vec2 {
        return new Vec2(this.x - other.x, this.y - other.y);
    }

    mult(other: number | Vec2): Vec2 {
        if (typeof other === 'number') return new Vec2(this.x * other, this.y * other);
        return new Vec2(this.x * other.x, this.y * other.y);
    }

    div(other: number | Vec2): Vec2 {
        if (typeof other === 'number') return new Vec2(this.x / other, this.y / other);
        return new Vec2(this.x / other.x, this.y / other.y);
    }

    dot(other: Vec2): number {
        return this.x * other.x + this.y * other.y;
    }

    angleTo(other: Vec2): number {
        return Math.atan2(other.y - this.y, other.x - this.x);
    }

    distanceTo(other: Vec2): number {
        return Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2);
    }

    average(other: Vec2): Vec2 {
        return new Vec2((this.x + other.x) / 2, (this.y + other.y) / 2);
    }

    magnitude(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    normalize(): Vec2 {
        return this.div(this.magnitude());
    }

    heading(): number {
        return Math.atan2(this.y, this.x);
    }

    lerp(other: Vec2, t: number): Vec2 {
        return new Vec2(this.x + (other.x - this.x) * t, this.y + (other.y - this.y) * t);
    }

    // returns 1 / this
    inverse(): Vec2 {
        return new Vec2(1 / this.x, 1 / this.y);
    }

    setMag(length: number): Vec2 {
        return this.normalize().mult(length);
    }

    equals(other: Vec2): boolean {
        return this.x === other.x && this.y === other.y;
    }

    static fromAngle(angle: number, length: number = 1): Vec2 {
        return new Vec2(Math.cos(angle) * length, Math.sin(angle) * length);
    }

    /**
     * Returns a new Vec2 such that the angle formed between A, B (center) and the new Vec2 is `angle`.
     *
     * @param a The first point.
     * @param b The second (center) point.
     * @param theta The angle ∠ABX.
     * @param distance The distance from B to X.
     */
    static fromAngleBetween(a: Vec2, b: Vec2, theta: number, distance: number): Vec2 {
        const angle = Math.atan2(b.y - a.y, b.x - a.x);
        return new Vec2(a.x + distance * Math.cos(angle + theta), a.y + distance * Math.sin(angle + theta));
    }

    static random(): Vec2 {
        return new Vec2(Math.random(), Math.random());
    }
}
