import { constrainAngle, constrainDistance, mod } from './mathutils';
import { Vec2 } from './vec2';

export class Chain {
    public joints: Array<Vec2>;
    /** Space between joints */
    public linkSize: number;

    // Only used in non-FABRIK resolution
    public angles: Array<number>;
    /** Max angle diff between two adjacent joints, higher = loose, lower = rigid */
    public angleConstraint: number;

    // For physics simulation
    public prevJoints: Array<Vec2>;

    constructor(origin: Vec2, jointCount: number, linkSize: number, angleConstraint: number = Math.PI * 2) {
        this.linkSize = linkSize;
        this.angleConstraint = angleConstraint;
        this.joints = []; // Assumed to be >= 2, otherwise it wouldn't be much of a chain
        this.angles = [];
        this.prevJoints = [];
        this.joints.push(origin.clone());
        this.angles.push(0);
        this.prevJoints.push(origin.clone());
        for (let i = 1; i < jointCount; i++) {
            this.joints.unshift(this.joints[0].add(new Vec2(0, -this.linkSize)));
            this.angles.push(0);
            this.prevJoints.unshift(this.joints[0].clone());
        }
    }

    addForce(i: number) {
        const DRAG = 0.6; // Amount of friction or drag to apply per frame
        const GRAVITY = -0.4; // Amount of gravity to apply per frame

        const vertex = this.joints[i];
        const prevVertex = this.prevJoints[i];

        const dx = (vertex.x - prevVertex.x) * DRAG; // get the speed and direction as a vector
        const dy = (vertex.y - prevVertex.y) * DRAG; // including drag
        this.prevJoints[i] = vertex; // set the last position to the current
        this.joints[i] = vertex.add(new Vec2(dx, dy + GRAVITY)); // add the drag to the speed
    }

    /**
     * Realistic physics simulation
     */
    physics(set: [number, Vec2][] = []) {
        for (let i = 0; i < this.joints.length - 1; i++) {
            this.addForce(i);
        }
        for (let i = 0; i < set.length; i++) {
            set[i][0] = mod(set[i][0], this.joints.length);
            this.joints[set[i][0]] = set[i][1];
        }
        for (let a = 0; a < 5; a++) {
            for (let i = 0; i < this.joints.length - 1; i++) {
                const p1 = this.joints[i]; // get first point
                const p2 = this.joints[i + 1]; // get second point
                // get the distance between the points
                let dx = p2.x - p1.x;
                let dy = p2.y - p1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                // get the fractional distance the points need to move toward or away from center of
                // line to make line length correct
                const fraction = (this.linkSize - distance) / distance / 2; // divide by 2 as each point moves half the distance to
                // correct the line length
                dx *= fraction; // convert that fraction to actual amount of movement needed
                dy *= fraction;
                // move first point to the position to correct the line length
                this.joints[i] = new Vec2(p1.x - dx, p1.y - dy);
                // move second point to the position to correct the line length
                this.joints[i + 1] = new Vec2(p2.x + dx, p2.y + dy);
            }
            for (let i = 0; i < set.length; i++) {
                this.joints[set[i][0]] = set[i][1];
            }
        }
    }

    resetAngles() {
        for (let i = 1; i < this.joints.length; i++) {
            this.angles[i] = this.joints[i - 1].sub(this.joints[i]).heading();
        }
        this.angles[0] = this.angles[1];
    }

    moveTowards(
        pos: Vec2,
        {
            speed = 4,
            accelDistance = 1,
            stopDist = 0,
            maxAngleDiff = this.angleConstraint,
            scale = 1,
        }: {
            speed?: number;
            accelDistance?: number;
            stopDist?: number;
            maxAngleDiff?: number;
            scale?: number;
        },
    ) {
        speed *= scale;
        accelDistance *= scale;
        stopDist *= scale;
        const distance = pos.distanceTo(this.joints[0]);

        if (distance < stopDist) {
            return;
        }

        const angle = constrainAngle(
            pos.sub(this.joints[0]).heading(),
            this.angles[0],
            maxAngleDiff * Math.min(distance / accelDistance, 1),
        );

        const targetPos = this.joints[0].add(Vec2.fromAngle(angle).setMag(Math.min(distance / accelDistance, speed)));

        this.resolve(targetPos);
    }

    resolve(pos: Vec2) {
        if (pos.equals(this.joints[0])) {
            return;
        }
        this.angles[0] = this.joints[0].angleTo(pos);
        this.joints[0] = pos.clone();
        this.propagateConstraints(0);
    }

    propagateConstraints(startI: number, angle: boolean = true) {
        startI = mod(startI, this.joints.length);
        for (let i = startI + 1; i < this.joints.length; i++) {
            const curAngle = this.joints[i - 1].sub(this.joints[i]).heading();
            this.angles[i] = angle ? constrainAngle(curAngle, this.angles[i - 1], this.angleConstraint) : curAngle;
            this.joints[i] = this.joints[i - 1].sub(Vec2.fromAngle(this.angles[i]).setMag(this.linkSize));
        }

        for (let i = startI - 1; i >= 0; i--) {
            const curAngle = this.joints[i + 1].sub(this.joints[i]).heading();
            this.angles[i] = angle ? constrainAngle(curAngle, this.angles[i + 1], this.angleConstraint) : curAngle;
            this.joints[i] = this.joints[i + 1].sub(Vec2.fromAngle(this.angles[i]).setMag(this.linkSize));
        }
    }

    fabrikResolve(pos: Vec2, anchor: Vec2) {
        // Forward pass
        this.joints[0] = pos;
        for (let i = 1; i < this.joints.length; i++) {
            this.joints[i] = constrainDistance(this.joints[i], this.joints[i - 1], this.linkSize);
        }

        // Backward pass
        this.joints[this.joints.length - 1] = anchor;
        for (let i = this.joints.length - 2; i >= 0; i--) {
            this.joints[i] = constrainDistance(this.joints[i], this.joints[i + 1], this.linkSize);
        }
    }

    display(ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = 8;
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        for (let i = 0; i < this.joints.length - 1; i++) {
            const startJoint = this.joints[i];
            const endJoint = this.joints[i + 1];
            ctx.beginPath();
            ctx.moveTo(startJoint.x, startJoint.y);
            ctx.lineTo(endJoint.x, endJoint.y);
            ctx.stroke();
        }

        ctx.fillStyle = 'rgb(255, 0, 0)';
        for (const joint of this.joints) {
            ctx.beginPath();
            ctx.arc(joint.x, joint.y, 8, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    getPos(i: number, angleOffset: number, bodyWidth: number): Vec2 {
        return new Vec2(
            this.joints[i].x + Math.cos(this.angles[i] + angleOffset) * bodyWidth,
            this.joints[i].y + Math.sin(this.angles[i] + angleOffset) * bodyWidth,
        );
    }
}
