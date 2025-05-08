import { useState, useEffect, Fragment } from "react";
import { boxesStore } from "./boxesStore";
import { createPortal } from "react-dom";
import { LineGenerator, type ScreenStuff } from "./lineGenerator";
import { Vector2 } from "../utils/vec";
import "./roundrectbox.css";
import useMounted from "../utils/useMounted";
import { useStore } from "@nanostores/react";

function LinePath({
  pos,
  size,
  radius,
  screen,
}: {
  pos: Vector2;
  size: Vector2;
  radius: number;
  screen: ScreenStuff;
}) {
  const [path, setPath] = useState("");
  const boxes = useStore(boxesStore);

  useEffect(() => {
    const pathStr = LineGenerator.fromRandom(
      {
        pos,
        size,
        radius,
      },
      ...boxes.map(([box]) => box)
    ).loopUntilHitScreen(screen);
    setPath(pathStr);
  }, [pos, size, radius, boxes]);

  return (
    <path
      d={path}
      className="anim-stronk"
      pathLength={100}
      stroke="#fff5"
      strokeWidth={2}
      fill="transparent"
    />
  );
}

export default function RectLineProvider() {
  const boxes = useStore(boxesStore);
  const [screen, setScreen] = useState<ScreenStuff>({
    l: 0,
    t: 0,
    w: 2,
    h: 2,
  });
  const mounted = useMounted();

  useEffect(() => {
    const handleResize = () => {
      setScreen({
        l: 0,
        t: 0,
        w: document.documentElement.scrollWidth,
        h: document.documentElement.scrollHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {mounted &&
        createPortal(
          <svg
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 9999,
            }}
            overflow="visible"
          >
            {boxes.map(([box, amount]) => (
              <Fragment key={JSON.stringify(box)}>
                {Array.from({ length: amount }, (_, i) => (
                  <LinePath
                    key={i}
                    pos={box.pos}
                    size={box.size}
                    radius={box.radius}
                    screen={screen}
                  />
                ))}
              </Fragment>
            ))}
          </svg>,
          document.body
        )}
    </>
  );
}
