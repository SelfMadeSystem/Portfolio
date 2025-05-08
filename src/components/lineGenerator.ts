import {
  approxEquals,
  randomBool,
  randomInt,
  randomSign,
} from "../utils/mathUtils";
import { Vector2 } from "../utils/vec";

export type RoundedBox = {
  pos: Vector2;
  size: Vector2;
  radius: number;
};

export type ScreenStuff = {
  l: number;
  t: number;
  w: number;
  h: number;
};

type Collision = {
  distance: number;
  point: Vector2;
  box: RoundedBox;
};

enum Direction {
  UP = 0,
  DOWN = 1,
  LEFT = 2,
  RIGHT = 3,
}

function horizontal(): Direction {
  return randomBool() ? Direction.LEFT : Direction.RIGHT;
}
function vertical(): Direction {
  return randomBool() ? Direction.UP : Direction.DOWN;
}
function orth(direction: Direction): Direction {
  switch (direction) {
    case Direction.UP:
    case Direction.DOWN:
      return horizontal();
    case Direction.LEFT:
    case Direction.RIGHT:
      return vertical();
  }
}
function isHorizontal(direction: Direction): boolean {
  return direction === Direction.LEFT || direction === Direction.RIGHT;
}
function isVertical(direction: Direction): boolean {
  return direction === Direction.UP || direction === Direction.DOWN;
}

function toVec2(direction: Direction): Vector2 {
  switch (direction) {
    case Direction.UP:
      return new Vector2(0, -1);
    case Direction.DOWN:
      return new Vector2(0, 1);
    case Direction.LEFT:
      return new Vector2(-1, 0);
    case Direction.RIGHT:
      return new Vector2(1, 0);
  }
}

function checkCollision(
  start: Vector2,
  direction: Direction,
  box: RoundedBox
): Collision | null {
  const boxPos = box.pos;
  const boxSize = box.size;

  let point: Vector2 | null = null;

  switch (direction) {
    case Direction.UP:
      if (
        start.y > boxPos.y + boxSize.y &&
        start.x > boxPos.x &&
        start.x < boxPos.x + boxSize.x
      ) {
        point = new Vector2(start.x, boxPos.y + boxSize.y);
      }
      break;
    case Direction.DOWN:
      if (
        start.y < boxPos.y &&
        start.x > boxPos.x &&
        start.x < boxPos.x + boxSize.x
      ) {
        point = new Vector2(start.x, boxPos.y);
      }
      break;
    case Direction.LEFT:
      if (
        start.x > boxPos.x + boxSize.x &&
        start.y > boxPos.y &&
        start.y < boxPos.y + boxSize.y
      ) {
        point = new Vector2(boxPos.x + boxSize.x, start.y);
      }
      break;
    case Direction.RIGHT:
      if (
        start.x < boxPos.x &&
        start.y > boxPos.y &&
        start.y < boxPos.y + boxSize.y
      ) {
        point = new Vector2(boxPos.x, start.y);
      }
      break;
  }

  if (point) {
    const distance = start.dist(point);
    return { distance, point, box };
  }

  return null;
}

export class LineGenerator {
  private pos: Vector2;
  private direction: Direction;
  private readonly moveDirection: Direction;
  private get moveHorizontal(): boolean {
    return isHorizontal(this.moveDirection);
  }
  private path: string;
  private readonly startPos: Vector2;
  private prevPos: Vector2;
  private readonly boxes: RoundedBox[];

  constructor(start: Vector2, direction: Direction, boxes: RoundedBox[]) {
    this.pos = start;
    this.startPos = start;
    this.prevPos = start;
    this.direction = direction;
    this.path = `M${start.x},${start.y}`;
    this.boxes = boxes;
    this.moveDirection = direction;
  }

  static fromTop(box: RoundedBox, ...boxes: RoundedBox[]) {
    const start = new Vector2(box.pos.x + box.size.x / 2, box.pos.y);
    return new LineGenerator(start, horizontal(), [box, ...boxes]);
  }

  static fromBottom(box: RoundedBox, ...boxes: RoundedBox[]) {
    const start = new Vector2(
      box.pos.x + box.size.x / 2,
      box.pos.y + box.size.y
    );
    return new LineGenerator(start, horizontal(), [box, ...boxes]);
  }

  static fromLeft(box: RoundedBox, ...boxes: RoundedBox[]) {
    const start = new Vector2(box.pos.x, box.pos.y + box.size.y / 2);
    return new LineGenerator(start, vertical(), [box, ...boxes]);
  }

  static fromRight(box: RoundedBox, ...boxes: RoundedBox[]) {
    const start = new Vector2(
      box.pos.x + box.size.x,
      box.pos.y + box.size.y / 2
    );
    return new LineGenerator(start, vertical(), [box, ...boxes]);
  }

  static fromRandom(box: RoundedBox, ...boxes: RoundedBox[]) {
    if (randomBool()) {
      return randomBool()
        ? LineGenerator.fromTop(box, ...boxes)
        : LineGenerator.fromBottom(box, ...boxes);
    }
    return randomBool()
      ? LineGenerator.fromLeft(box, ...boxes)
      : LineGenerator.fromRight(box, ...boxes);
  }

  moveTo(pos: Vector2): void {
    this.prevPos = this.pos;
    this.pos = pos;
    if (this.prevPos.equals(this.pos)) return;
    if (this.prevPos.x === this.pos.x) {
      this.path += `V${this.pos.y}`;
    }
    if (this.prevPos.y === this.pos.y) {
      this.path += `H${this.pos.x}`;
    }
    this.path += `L${this.pos.x},${this.pos.y}`;
  }

  isOnBox(box: RoundedBox, checkDirection: boolean = true): boolean {
    const boxPos = box.pos;
    const boxSize = box.size;

    const isWithinBounds =
      this.pos.x >= boxPos.x &&
      this.pos.x <= boxPos.x + boxSize.x &&
      this.pos.y >= boxPos.y &&
      this.pos.y <= boxPos.y + boxSize.y;

    if (!isWithinBounds) return false;
    if (!checkDirection) return true;

    // If we're on the edge of the box moving away from it, we're not considered "on" the box
    switch (this.direction) {
      case Direction.UP:
        return this.pos.y > boxPos.y;
      case Direction.DOWN:
        return this.pos.y < boxPos.y + boxSize.y;
      case Direction.LEFT:
        return this.pos.x > boxPos.x;
      case Direction.RIGHT:
        return this.pos.x < boxPos.x + boxSize.x;
    }
  }

  getBoxMoveLimit(box: RoundedBox): Vector2 {
    const boxPos = box.pos;
    const boxSize = box.size;

    switch (this.direction) {
      case Direction.UP:
        return new Vector2(this.pos.x, boxPos.y);
      case Direction.DOWN:
        return new Vector2(this.pos.x, boxPos.y + boxSize.y);
      case Direction.LEFT:
        return new Vector2(boxPos.x, this.pos.y);
      case Direction.RIGHT:
        return new Vector2(boxPos.x + boxSize.x, this.pos.y);
    }
  }

  getBoxNormal(box: RoundedBox): Direction {
    const boxPos = box.pos;
    const boxSize = box.size;

    switch (this.direction) {
      case Direction.UP:
      case Direction.DOWN:
        if (this.pos.x < boxPos.x + boxSize.x / 2) {
          return Direction.LEFT;
        }
        return Direction.RIGHT;
      case Direction.LEFT:
      case Direction.RIGHT:
        if (this.pos.y < boxPos.y + boxSize.y / 2) {
          return Direction.UP;
        }
        return Direction.DOWN;
    }
  }

  getNextBoxDirection(box: RoundedBox): Direction {
    const boxPos = box.pos;
    const boxSize = box.size;

    switch (this.direction) {
      case Direction.UP:
      case Direction.DOWN:
        if (this.pos.x < boxPos.x + boxSize.x / 2) {
          return Direction.RIGHT;
        }
        return Direction.LEFT;
      case Direction.LEFT:
      case Direction.RIGHT:
        if (this.pos.y < boxPos.y + boxSize.y / 2) {
          return Direction.DOWN;
        }
        return Direction.UP;
    }
  }

  moveAlongBox(box: RoundedBox, distance: number, start = true, max = 3): void {
    const moveLimit = this.getBoxMoveLimit(box);
    const moveDistance = this.pos.dist(moveLimit);

    if (approxEquals(moveDistance, 0)) {
      throw new Error("Already at the box limit");
    }

    const diff = start ? 1 : distance - moveDistance + box.radius;

    if (diff > 0 && max > 0) {
      this.moveTo(moveLimit);
      this.direction = this.getNextBoxDirection(box);
      this.moveAlongBox(box, (start ? 50 : diff) + box.radius, false, max - 1);
      return;
    }

    const newPos = this.pos.add(toVec2(this.direction).mult(distance));

    this.moveTo(newPos);
    this.direction = this.getBoxNormal(box);
  }

  getNextBox(distance: number): Collision | null {
    let closestCollision: Collision | null = null;

    for (const box of this.boxes) {
      if (this.isOnBox(box, false)) continue;

      const collision = checkCollision(this.pos, this.direction, box);

      if (
        collision &&
        (!closestCollision || collision.distance < closestCollision.distance)
      ) {
        closestCollision = collision;
      }
    }

    if (closestCollision && closestCollision.distance < distance) {
      return closestCollision;
    }
    return null;
  }

  getOnBox(): RoundedBox | null {
    for (const box of this.boxes) {
      if (this.isOnBox(box)) {
        return box;
      }
    }
    return null;
  }

  move(distance: number): void {
    const onBox = this.getOnBox();
    if (onBox) {
      this.moveAlongBox(onBox, distance);
      return;
    }

    const collision = this.getNextBox(distance);
    if (collision) {
      this.moveTo(collision.point);
      this.direction = this.getNextRandomDirection();
      return;
    }

    const newPos = this.pos.add(toVec2(this.direction).mult(distance));
    this.moveTo(newPos);
    this.direction = this.getNextRandomDirection();
  }

  getNextRandomDirection(): Direction {
    if (isHorizontal(this.direction) === this.moveHorizontal) {
      return orth(this.direction);
    }
    return this.moveDirection;
  }

  getRandomDistance(): number {
    if (this.startPos.equals(this.pos)) {
      return randomInt(200, 350);
    }
    if (isHorizontal(this.direction) === this.moveHorizontal) {
      return randomInt(50, 200);
    }
    return randomInt(20, 50);
  }

  loopUntilHitScreen(screen: ScreenStuff): string {
    const { l, t, w, h } = screen;
    const r = l + w;
    const b = t + h;
    const distance = this.getRandomDistance();
    const onBox = this.getOnBox();
    if (onBox) {
      this.moveAlongBox(onBox, distance, true, 2);
    }
    while (
      this.pos.x > l &&
      this.pos.x < r &&
      this.pos.y > t &&
      this.pos.y < b
    ) {
      try {
        const distance = this.getRandomDistance();
        this.move(distance);
      } catch (e) {
        console.error("Error in loopUntilHitScreen:", e);
        break;
      }
    }

    return this.path;
  }
}
