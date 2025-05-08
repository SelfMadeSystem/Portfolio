import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { RoundedBox } from "./lineGenerator";
import { Vector2 } from "../utils/vec";
import "./roundrectbox.css";
import { boxesStore } from "./boxesStore";
import useMounted from "../utils/useMounted";

function createRoundRectPath(
  width: number,
  height: number,
  radius: number,
  xO: number = 0,
  yO: number = 0
): string {
  const r = Math.min(radius, Math.min(width, height) / 2);
  const r2 = r * 2;
  return `M${xO + r},${yO}
    h${width - r2}
    a${r},${r} 0 0 1 ${r},${r}
    v${height - r2}
    a${r},${r} 0 0 1 -${r},${r}
    h${-width + r2}
    a${r},${r} 0 0 1 -${r},-${r}
    v${-height + r2}
    a${r},${r} 0 0 1 ${r},-${r}
    Z`.replace(/\s+/g, " ");
}

export default function RoundRectBox({
  children,
  lineWidth = 2,
  lineColor = "#fff",
  lines = 1,
  ...props
}: React.HTMLProps<HTMLDivElement> & {
  lineWidth?: number;
  lineColor?: string;
  lines?: number;
}) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [svg, setSvg] = useState<SVGSVGElement | null>(null);
  const [path, setPath] = useState<SVGPathElement | null>(null);
  const prevBoxRef = useRef<RoundedBox | null>(null);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const mounted = useMounted();

  useEffect(() => {
    if (!container || !path || !svg) return;
    const setPath = () => {
      if (!container || !path || !svg) return;

      const { width, height } = container.getBoundingClientRect();
      container.style.removeProperty("border");
      container.style.removeProperty("background-color");
      const style = getComputedStyle(container);
      const radius = parseFloat(style.borderRadius) || 0;
      const pathStr = createRoundRectPath(width, height, radius);
      path.setAttribute("d", pathStr);
      path.setAttribute("stroke", lineColor);
      path.setAttribute("fill", "none");
      path.setAttribute("stroke-width", `${lineWidth}`);

      // Get absolute position for the SVG
      const rect = container.getBoundingClientRect();
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      const newBox = {
        pos: new Vector2(rect.left + scrollLeft, rect.top + scrollTop),
        size: new Vector2(width, height),
        radius,
      };

      const prevBox = prevBoxRef.current;
      if (prevBox) {
        boxesStore.set([
          ...boxesStore.get().map((c) => {
            const box = c[0];
            if (
              box.pos.x === prevBox.pos.x &&
              box.pos.y === prevBox.pos.y &&
              box.size.x === prevBox.size.x &&
              box.size.y === prevBox.size.y &&
              box.radius === prevBox.radius
            ) {
              return [newBox, lines] as [RoundedBox, number];
            }
            return c;
          }),
        ]);
      } else {
        boxesStore.set([
          ...boxesStore.get(),
          [newBox, lines] as [RoundedBox, number],
        ]);
      }
      prevBoxRef.current = newBox;

      setPosition({
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
        width: rect.width,
        height: rect.height,
      });
    };

    const updatePosition = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      setPosition({
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft,
        width: rect.width,
        height: rect.height,
      });
    };

    setPath();

    const resizeObserver = new ResizeObserver(() => {
      setPath();
    });

    if (container) {
      resizeObserver.observe(container);
    }

    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return () => {
      if (container) {
        resizeObserver.unobserve(container);
      }
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [container, path, svg, lineWidth, lineColor]);

  return (
    <div
      ref={setContainer}
      {...props}
      style={{
        ...props.style,
        position: "relative",
      }}
    >
      {mounted &&
        createPortal(
          <svg
            ref={setSvg}
            style={{
              position: "absolute",
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${position.width}px`,
              height: `${position.height}px`,
              pointerEvents: "none",
              zIndex: 9999,
            }}
            overflow="visible"
          >
            <path ref={setPath} />
          </svg>,
          document.body
        )}
      {children}
    </div>
  );
}
